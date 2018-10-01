import React, { Component } from 'react';
import G6 from '@antv/g6';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dom from '../../utils/dom';
import ToolBar from '../../components/ToolBar';
import PanelBar from '../../components/PanelBar';
import cFetch from '../../utils/Cfetch';
import cloneDeep from "lodash.clonedeep";
import { message } from 'antd';
import './index.css';

class LineControl extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()

    this.shapes = {"rect":"companies", "rhombus":"dependencies", "customCurve":"edge"};
    this.dataGrapg = {
      "source": {
        "nodes": [],
        "edges": []
      }
    }

    message.config({
      top: 20,
      maxCount: 3,
    });
    G6.track(false);
    this.state = {
      height: window.innerHeight,
      open: false,
      data: {},
      counter: -1,
    }
  }


  static defaultProps = {
    nodeLabelFill: '#0B73B3',
    nodeShapeStroke: '#00B7ED',
    groupLabelFill: '#DA7639',
    groupShapeStroke: '#FABE9C',
    edgeStroke: '#008000'
  }

  static propTypes = {
    isMobile: PropTypes.bool
  };

  convertDataToG6 = (res) => {
    if (res) {
      res.companies.forEach(element => {
        this.dataGrapg.source.nodes.push({shape: "rect", ...element});
      });
      res.dependences.forEach(element => {
        this.dataGrapg.source.nodes.push({ shape: "rhombus", ...element });
      });
      res.edges.forEach(element => {
        var edge = { "shape": "smooth", ...element };
        this.dataGrapg.source.edges.push(edge);
      });

      this.setState({ isData: false })
      return true;

    }
    else {
      this.setState({ isData: true })
      return false;
    }
  }

  fecthApi = (path, body, httpMethod) => {
    console.log(body)
    let method = (httpMethod) ? httpMethod.toUpperCase() : "POST";
    var base = {
      headers: {
        "Content-Type": "application/json",

      },
      method,
    }
    var params = Object.assign({},base,{body})
    cFetch(`http://192.168.0.220:80/${path}`, params).then((res) => {
      (res.result)? message.success(res.result):message.error("ups algo no salio bien")
    }).catch(err => console.log("err", err));
  }

  deleteNodeCDE = (ev) => {
    let item = cloneDeep(ev.item["_attrs"].model)
    var node = {}
    var nodeDel = {id:item.id}
    node[this.shapes[item.shape]] = [nodeDel];
    this.fecthApi("control_line",node, "DELETE");
    this.setState({open:false});

  }

  createtNodeCDE = (ev) => {
    if (this.state.isData) {
      let item = cloneDeep(ev.model)
      if (item.shape !== "customCurve") {
        delete item.shape;
        var node =  {};
        node[this.shapes[ev.model.shape]] = [item];
        this.fecthApi("control_line", node,"post");
      }
    }
  }

  updateNodeCDE =(ev) =>{
      if (!ev.shape) {
        this.setState({
          open: false,
        })
        if (this.state.item && this.state.fieldsUpdate !== null) {
          const model = this.state.item.item.getModel();
          let body = {};
          const update = this.state.fieldsUpdate;
          body[this.shapes[model.shape]] = [{id:model.id,...update}]
          this.fecthApi("control_line", body, "PUT");
        }
        this.setState({
          item: null,
          fieldsUpdate: null
        })

      }
  }
  afterDrawEdge = (cfg, group, keyShape) => {
    if (cfg.model.source !== cfg.model.target) {
      let edge = cfg.model;
      delete edge.shape;
      edge["controlPoints"] = group["__cfg"].controlPoints;
      this.fecthApi("control_line", {"edges":[edge]}, "POST")
    }
  }

  _renderG6Graph() {
    const container = this.container.current
    const { height } = this.state
    const data = this.dataGrapg
    const fnt = this.afterDrawEdge;
    const createtNodeCDE = this.createtNodeCDE;
    const deleteNodeCDE = this.deleteNodeCDE;
    const updateNodeCDE = this.updateNodeCDE;
    const { edgeStroke, groupShapeStroke, nodeShapeStroke } = this.props

    if (this.net) {
      this.net.context.destroy()
    }

    G6.registEdge('customCurve', {
      afterDraw: function (cfg, group, keyShape) {
        return fnt(cfg, group, keyShape);
      }
    }, 'smoothArrow');

    // init
    const net = new G6.Net({
      container,
      height,
      rollback: true,
      grid: {
        forceAlign: true,
        cell: 20
      },
      mode: "edit",
    })



    net.removeBehaviour(['clickAddNode'])
    net.addBehaviour(['mouseupAddNode'])

    //net.tooltip(true);
    //net.node().shape('rhombus').tooltip('city');
    net.edge().style({
      lineWidth: 2,
      stroke: edgeStroke
    })

    net.node()
      .label('name')
      .style({
        lineWidth: 3,
        stroke: nodeShapeStroke
      })

    // add edge
    let dragging = false
    net.on('dragstart', function (ev) {
      dragging = true
    })
    net.on('dragend', function (ev) {
      dragging = false
    })
    net.on('mouseenter', function (ev) {
      const shape = ev.shape;
      if (shape && shape.hasClass('anchor-point') && !dragging) {
        net.beginAdd('edge', {
          shape: 'customCurve'
        })
      }
    })
    net.on('mouseleave', function (ev) {
      const shape = ev.shape;
      if (shape && shape.hasClass('anchor-point') && !dragging) {
        net.changeMode('edit')
      }
    })

    // change node
    net.on('itemclick', ev => {
      console.log("evennn",ev)
      if (ev.itemType !== "edge") {
        this.setState({
          open: true,
          item: ev
        })
      }
    })

    net.on('click', ev => { updateNodeCDE(ev) })

    net.on('itemadd', function (ev) { createtNodeCDE(ev) });

    net.on('itemremove', function(ev){deleteNodeCDE(ev)});
    console.log("me ejecuto data",data)
    net.read(data);
    net.render()

    this.net = net
    this.setState({isData:true})
  }


  componentWillMount() {
    const { nodeLabelFill } = this.props
    G6.Global.nodeLabelStyle.fill = nodeLabelFill
  }

  componentDidMount() {
    // add resize event
    this.windowListener = dom.addListener(window, 'resize', () => {
      this.setState({
        height: window.innerHeight
      })
    })

    //renderizar grafico por defecto
    this._renderG6Graph();

     //linea de mando to graphics
    //this.convertDataToG6(res)

    /* deshabilitado hasta finalziar tarea #35 back
    cFetch("http://192.168.10.189:5000/control_line").then(res => {

      this.convertDataToG6(res)
      this._renderG6Graph()
      console.log("renderg6",res)
    })
      .catch(err => {
        this._renderG6Graph();
        console.log("cuando el error",err)

      });
      console.log("salgo del fecth")*/
  }

  componentWillUnmount() {
    // remove resize event
    this.windowListener.remove()
  }

  objectToUpdate = (element) => {
    this.setState((prevState) => {
      const itemsToupdate = Object.assign({}, prevState.fieldsUpdate, { ...element });
      return { fieldsUpdate: itemsToupdate };
    });

  }

  addNodeHandler = (shape, name, nodeModel) => {
    name = name + this.state.counter
    this.net.beginAdd('node', {
      shape,
      name,
      ...nodeModel,
    })
    this.setState((prevState) => {
      return { counter: prevState.counter + 1 }
    });
  }

  addEdgeHandler = (shape) => {
    this.net.beginAdd('edge', {
      shape
    })
  }

  updateNodeHandler = (item, value) => {
    this.net.update(item, value)
    this.net.refresh()
  }

  saveDataHandler = () => {
    let net = this.net.save();
    let organigrama = {"companies":[],"dependences":[]};
    net.source.nodes.forEach(element => {
      var difer = Object.assign({} ,element);
      delete difer["shape"];
      (element.shape === "rect")? organigrama.companies.push(difer):organigrama.dependences.push(difer)
    });
    organigrama["edges"] = net.source.edges
    console.log("org",organigrama);
  }

  ZoomHandler = () => {
    this.net.autoZoom()
  }

  resetZoomHandler = () => {
    this.net.resetZoom()
  }

  changeModeHadler = (mode) => {
    if (this.state.mode === "edit") {
      this.net.changeMode(mode)
      this.setState({ mode })
    }
    else {
      this.net.changeMode("edit")
      this.setState({ mode: "edit" })
    }
  }

  removeItemHandler = () => {
    if(this.state.item){
      this.setState({ open: false })
      this.net.remove(this.state.item.item)
    }
  }

  rollBackHandler = () => {
    this.net.updo()
  }

  reMakeHandlre = () => {
    this.net.redo()
  }

  render() {
    const { isMobile } = this.props;
    console.log("store g6",isMobile)
    return (
      <React.Fragment>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {this.state.open && <PanelBar item={this.state.item} updateNode={this.updateNodeHandler} updateObj={this.objectToUpdate} />}
          <ToolBar net={this.net}  className={'toolBar'}
            addNode={this.addNodeHandler}
            addEdge={this.addEdgeHandler}
            saveData={this.saveDataHandler}
            autoZoom={this.ZoomHandler}
            resetZoom={this.resetZoomHandler}
            changeMode={this.changeModeHadler}
            removeItem={this.removeItemHandler}
            rollBack={this.rollBackHandler}
            reMake={this.reMakeHandlre}>
          </ToolBar>
          <div className="graph-container" ref={this.container}></div>
        </div>
      </React.Fragment>

    );
  }
}

export default connect(store => ({
  isMobile: store.isMobile
}), null)(LineControl);
