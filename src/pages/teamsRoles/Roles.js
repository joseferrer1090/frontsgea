import React from 'react';
import { Select, Spin } from 'antd';
//import debounce from 'lodash/debounce';

const Option = Select.Option;

class Rol extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
  }

  state = {
    datas: [],
    value: [],
    fetching: false,
  }

  fetchUser = (value) => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  }

  handleChange = (value) => {
      console.log("valueeeree",value)
    this.setState({
      value,
      datas: [],
      fetching: false,
    });
  }

  render() {
    const data = [{
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
    const { fetching, value } = this.state;
    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.id}>{d.title}</Option>)}
      </Select>
    );
  }
}

export default Rol;