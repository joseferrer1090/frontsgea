import React from 'react';
import { Radio, Row, Col } from 'antd';
import Teams from './Teams';
import Rol from './Roles';
import { connect } from 'react-redux';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class TeamsRoles extends React.PureComponent {
    state = {
      mode: true,
    };

    handlerOnChange = (e) =>{
    const target = e.target.value === "team"? true:false;
    this.setState({mode:target})

    }
    render() {
      const { match, location } = this.props;
      const  isMobile = this.props.isMobile || null;
      const rolorteam = this.state.mode;
      console.log("path", location.pathname, match.url)
      return (
        <div>
          <Row type="flex" justify="center">
            <Col>
              <RadioGroup defaultValue="team" size="large" onChange={this.handlerOnChange}>
                <RadioButton value="team">Teams</RadioButton>
                <RadioButton value="rol">Roles</RadioButton>
              </RadioGroup>
            </Col>
          </Row>
          {rolorteam?<Teams mobile={isMobile}/>:<Rol/>}
        </div>
      );
    }
  }
  
  export default connect(store =>({ 
    isMobile: store.isMobile,
    dispatch:store.dispatch
}))(TeamsRoles);
  