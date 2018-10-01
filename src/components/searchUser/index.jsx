import React from 'react';
import {Form, Card, Cascader, Input, Button, } from 'antd';
import NoticeList from '../NotificationIcon/Notices.list';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
class SearchUser extends React.PureComponent{

  static proptypes = {
    onUserList: PropTypes.func.isRequired,
    userList: PropTypes.object,
    cascaderOptions: PropTypes.object,
    onChangeCascader: PropTypes.object
  }

  static defaultProps = {
    locale: {
      emptyText: 'empty!',
      clear: 'see all',
    },
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
    onsubmit: (values)=>{}
  }

  hasErrors =(fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form searchUser: ', values);
        onsubmit(values)
      }
    });
  }


  render(){
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { layout, cascaderOptions, onChangeCascader,loadData, onUserList, userList} = this.props;
    return(
      <Card title={'Buscar usuario'} >
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...layout}
          label="Dependencia"
        >
          {getFieldDecorator('factorymap', {
            initialValue: ['companyA'],
            rules: [{ type: 'array', message: 'Please select one dependence!' }],
          })(
            <Cascader
              options={cascaderOptions}
              loadData={loadData}
              onChange={onChangeCascader}
              changeOnSelect
            />
          )}
        </FormItem>
        <FormItem
          {...layout}
          label="Nombre"
        >
          {getFieldDecorator('UserName', {
            rules: [{
              message: 'The input is not valid!',
            }, {
              required: false, message: 'Please input name of user!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem>
      <Button
        type="primary"
        htmlType="submit"
        disabled={this.hasErrors(getFieldsError())}
      >
        buscar
    </Button>
    </FormItem>
        <NoticeList
          data={userList?userList:[]}
          onClick={onUserList}
          onClear={() => { }}
          title={"search"}
          locale={this.props.locale}
          emptyText={"not found user"}
          showClear={false}
        />
      </Form>
      </Card>
    )
  }
}

const DynamicForm = Form.create()(SearchUser);

export { DynamicForm as default };
