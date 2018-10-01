import React, { Component } from 'react'
import './index.css'
import { Button } from 'antd'


const modelCom = {
  nit: null,
  adress: "",
  phone: null,
  city: "",
  state: true
}

export default class ToolBar extends Component {
  render() {
    const { addNode, addEdge, saveData, resetZoom, autoZoom, changeMode, removeItem, rollBack, reMake} = this.props
    return (
      <div
        className="toolBar"
      > 
        <Button onMouseDown={rollBack.bind(null)} shape="circle" icon="rollback"/>
        <Button className="rot180" onMouseDown={reMake.bind(null)} shape="circle" icon="enter"/>
        <Button 
          onMouseDown={addNode.bind(null, 'rect', 'empresa',modelCom)} shape="circle"
          className="graph-tool-iconfont">
          <i  className="anticon icon-square"></i>
        </Button>
        <Button
          onMouseDown={addNode.bind(null, 'rhombus', 'dependencia',{state:true})} shape="circle"
          className="graph-tool-iconfont" >
          <i className="anticon icon-rhombus"></i>
        </Button>
        <Button 
          onMouseDown={addEdge.bind(null,'customCurve')}  
          shape="circle"
          className="graph-tool-iconfont">
          <i  className="anticon icon-arrow"></i>
        </Button>
        <Button onMouseDown={removeItem.bind(null)} shape="circle" icon="delete"></Button>
        <Button onMouseDown={resetZoom.bind(null)}  shape="circle" icon="shrink"></Button>
        <Button onMouseDown={autoZoom.bind(null)}  shape="circle" icon="arrows-alt"></Button>
        <Button 
          onMouseDown={changeMode.bind(null,"drag")} shape="circle"
          className="graph-tool-iconfont" >
          <i className="anticon icon-move"></i>
        </Button>
        <Button  onClick={saveData} shape="circle" icon="save"></Button>
      </div>
    )
  }
}
