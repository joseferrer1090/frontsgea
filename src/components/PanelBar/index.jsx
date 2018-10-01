import React, { Component } from 'react'
import './index.css'
import { Form, Input, Switch, Icon } from 'antd'
const FormItem = Form.Item;

export default class PanelBar extends Component {
  constructor(props) {
    super(props)

    const itemModel = props.item.item.getModel()
    this.state = {
      name: itemModel.name,
      nit: itemModel.nit,
      adress: itemModel.adress,
      phone: itemModel.phone,
      city: itemModel.city,
      state: itemModel.state,
      posX: props.item.domX,
      posY: props.item.domY,
      shape: itemModel.shape
    }
  }
  /*
    @param e => la ostia
  */
  onBlur = (e) => {
    let obj = {}
    obj[e.target.id] = e.target.value
    this.props.updateObj(obj)
  } 

  onChange = (e) => {
    const value = e.target.value
    var key = e.target.id
    var obj = {}
    obj[key] = value
    this.setState(obj)

    this.props.updateNode(this.props.item.item, obj)
  }

  oncheked = (e) => {
    var obj = {state:e}
    this.props.updateNode(this.props.item.item, obj)
    this.props.updateObj(obj)
  this.setState(obj)
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      style: { marginBottom: 5 }
    };
    const isCheked = this.state.state;
    return (
      <div className='panelBar' style={{ left: this.state.posX + 28, top: this.state.posY }}>
        <Form layout="horizontal">

          <FormItem label="Nom:"
              {...formItemLayout}
            >
              <Input value={this.state.name}
                id="name"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </FormItem>
        {(this.state.shape === "rect"? true:false) &&
          (
          <div>
            <FormItem label="Nit:"
              {...formItemLayout}
            >
              <Input value={this.state.nit}
                id="nit"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </FormItem>

            <FormItem label="Dir:"
              {...formItemLayout}
            >
              <Input value={this.state.adress}
                id="adress"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </FormItem>

            <FormItem label="Tel:"
              {...formItemLayout}
            >
              <Input value={this.state.phone}
                id="phone"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </FormItem>

            <FormItem label="Ciu:"
              {...formItemLayout}
            >
              <Input value={this.state.city}
                id="city"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </FormItem>
          </div>)   
        }
        <FormItem label="Est:"
              {...formItemLayout}
            >
              <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} checked={isCheked} onChange={this.oncheked}/>
            </FormItem>
        </Form>
      </div>
    )
  }
}
