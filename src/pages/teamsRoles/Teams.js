import React from 'react';
import { Radio, Form, Icon, Input, Button, Tooltip, Row, Col, Select} from 'antd';
import SearchUser from '../../components/searchUser';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const lineControl = {
  companies: [
    {
      value: 'companyA',
      label: 'companyA',
      isLeaf: false,
    },
    {
      value: 'companyB',
      label: 'companyB',
      isLeaf: false,
    }],
  sudsidiary: {
    companyA: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        isLeaf: false,
      }, {
        value: 'texas',
        label: 'texas',
        isLeaf: false,
      }
    ]
  },
  dependences: {
    hangzhou: [
      {
        value: 'lasvegas',
        label: 'las vegas',
      }, {
        value: 'bogota',
        label: 'bogota',
      }
    ]
  }
};
const users = [{
  "id": "000000009",
  "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRigtA5XHvjLT10vExmcroFoEX0oQMkhMtw0qR0eKo_io0iTGh3_Q",
  "title": "Diana de Temiscira",
  "description": "Lexco/Logistica",
  "extra": "Importaciones y Logistica",
  "status": "processing",
},
{
  "id": "000000010",
  "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlISThMexK0sjWMawgcK3eXNI4hnVYf6aFSScjTpZzwFUQGnob",
  "title": "Bruce wayne",
  "description": "Lexco/ I+D",
  "extra": "Director Investigacion",
  "status": "todo",
},
{
  "id": "000000011",
  "avatar": "",
  "title": "Antoy stark ",
  "description": "Lexco/Servicio Tecnico",
  "extra": "Gerencia de Servicio Técnico",
  "status": "f",
},
{
  "id": "000000012",
  "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSlQFZQUeCQ-HZkcz79kli47Ys-RPHgG5AhP10IUiUcmfUKrgO4g",
  "title": "stephen strange",
  "description": "Lexco/Financiera",
  "extra": "Dirección Financiera",
  "status": "f",
},
{
  "id": "000000013",
  "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEnHxfjKFrEvBrXbYPF6YSgWRuAy_hLhjkGTYohw1dyn3HWvG",
  "title": "Bruce Banner",
  "description": "Lexco/Comercial",
  "extra": "Ventas",
  "status": "f",
},
{
  "id": "000000014",
  "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3VTLSx9a87vVcu1oPPrZg1g5Mds8bIEwtIVdHGuMbl9-Wr2Zy",
  "title": "natasha romanoff",
  "description": "Lexco/Gestion Humana.",
  "extra": "Coordinación de Gestión Humana",
  "status": "f",
}];

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Teams extends React.PureComponent {

  static defaultProps = {
    onItemClick: () => { },
    onPopupVisibleChange: () => { },
    onTabChange: () => { },
    onClear: () => { },
    loading: false,
    locale: {
      emptyText: 'empty!',
      clear: 'see all',
    },
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  }

  state = {
    cascaderOptions: [...lineControl.companies],
    addUser: false,
    isMobile: '90%',
    value: [],
    userlist: users
  };

  componentDidMount() {
    const btnAddUserWidth = this.props.mobile ? '90%' : '68%';
    console.log("didMount", btnAddUserWidth, this.props.mobile)
    this.setState({ isMobile: btnAddUserWidth })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  onChangeCascader = (value, selectedOptions) => {
    console.log("onchange", value, selectedOptions);
  }

  addUserHandler = () => {
    this.setState({ addUser: !this.state.addUser })
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = selectedOptions.length > 1 ? lineControl.dependences[targetOption.value] : lineControl.sudsidiary[targetOption.value];
      this.setState({
        cascaderOptions: [...this.state.cascaderOptions],
      });
    }, 1000);
  }

  hadleSelectUser = (user) => {
    const item = this.state.value.concat({ key: user.id, label: user.title })
    const newsuser = this.state.userlist.filter(element => element.id !== user.id)
    this.setState({ value: item, userlist: newsuser })
  }

  handleChange = (value) => {
    console.log("valueeeree", value)
    this.setState({
      value,
    });
  }
 
  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const user = this.state.addUser;
    const mobile = this.props.mobile ? '90%' : '68%';
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    const formLayout = {
      xs: { span: 24 },
      sm: { span: 14 }
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 11, offset: 7 },
      },
    };

    const layoutSearchUser = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5, offset: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    


    const { value, userlist } = this.state;
    return (
      <div>
        <Row>
          <Col {...formLayout}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                label={'TeamName'}
                {...formItemLayout}
                hasFeedback
              >
                {getFieldDecorator('teamName', {
                  rules: [{ required: true, pattern: '^[a-zA-Z_áéíóúñ]*$', message: 'Please input your TeamName!' }]
                })(
                  <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Teamname" />
                )}
              </FormItem>
              {value.length > 0 ? <Select
                mode="multiple"
                labelInValue
                value={value}
                onChange={this.handleChange}
                style={{ width: '100%', paddingBottom: '10px' }}
              /> : null
              }


              <FormItem {...formItemLayoutWithOutLabel} >
                <Button type="dashed" onClick={this.addUserHandler} style={{ width: mobile, paddingRight: "10px" }}>
                  <Icon type="user-add" /> Add User
              </Button>
                <Tooltip title="Agrega usuarios o solo crea un equipo por nombre">
                  <Icon type="question-circle-o" style={{ paddingLeft: '5px' }} />
                </Tooltip>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  create
              </Button>
              </FormItem>
            </Form>
              {user? <SearchUser            
              layout={layoutSearchUser}
              cascaderOptions={this.state.cascaderOptions}
              onChangeCascader={this.onChangeCascader}
              loadData={this.loadData}
              onUserList={this.hadleSelectUser} 
              userList={userlist}
              />: null
              }
             
          </Col>

          <Col xs={24} sm={8}>
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <RadioButton value={1}>Buscar</RadioButton>
              <RadioButton value={2}>Actualizar</RadioButton>
              <RadioButton value={3}>eliminar</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create()(Teams);

export { WrappedDynamicRule as default };

