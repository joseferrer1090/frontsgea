import React from 'react';
//import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { Layout, message, Affix, Button } from 'antd';
import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';
//import { RoutesList } from '../common/Router';
import logo from './logo-lexco.svg';
//import styles from './index.module.less';
import notices from '../utils/mocks/notices';
import { connect } from 'react-redux';
//componets
import Dashboard from '../pages/Dashboard';
import TeamsRoles from '../pages/teamsRoles';
import LineControl from "../pages/lineControl";
import Archivo from '../pages/archivo';

const { Header, Content, Footer } = Layout;
let isMobile;

/*const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};*/
enquireScreen(b => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {

  state = {
    isMobile,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.enquireHandler = enquireScreen(mobile => {
      dispatch({
        type: 'IS_MOBILE',
        payload: mobile,
      });
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  handleSiderCollapse = (collapsed) => {
    const { dispatch } = this.props;
    console.log(collapsed);
    dispatch({
      type: 'CHANGE_LAYOUT_COLLAPSED',
      payload: collapsed,
    });
    //this.setState({ collapsed });
  }

  handlebuttonfix = () => {
    this.handleSiderCollapse(!!this.props.siderCollapse);
  }

  handleNoticeClear = type => {
    message.success(`limpio ${type}`);
    console.log("heee", type)
  };

  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      console.log("dispatch")
      return;
    }
    if (key === 'logout') {
      //this.props.dispatch({
      //type: 'login/logout',
      //});
      console.log("dispatch logout")
    }
  };
  render() {

    const { collapsedSider, location, isMobile } = this.props;
    console.log("movileeee layout",isMobile)
    const currentUser = {
      name: "camilo caviedes",
      avatar: "https://avatars3.githubusercontent.com/u/14255055?s=400&v=4",
      notifyCount: 10,
      newMessageCount: 5,
      userid: "00000001"
    };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu
          collapsed={collapsedSider}
          isMobile={isMobile}
          location={location}
          onCollapse={this.handleSiderCollapse}
          logo={logo}
        />
        <Layout style={{ paddingLeft: isMobile ? null : '80px' }}>
          <Header style={{ background: '#fff', padding: 0 }} >
            <GlobalHeader
              currentUser={currentUser}
              notices={notices}
              isMobile={isMobile}
              logo={logo}
              onNoticeClear={this.handleNoticeClear}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
          </Header>
          <Content style={{ margin: '12px' }}>
            <div style={{ padding: 12, background: '#fff', height: '100%' }}>
              <Switch>
                <Route exact path="/home/dashboard" component={Dashboard} />
                <Route path="/settings/teams" component={TeamsRoles} />
                <Route path="/settings/linecontrol" component={LineControl} />
                <Route path="/archivo" component={Archivo} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
          <Affix style={{ position: 'fixed', left: '10px', bottom:'10px' }}>
            <Button
              shape="circle"
              type="primary"
              icon="rocket"
              size={"large"}
              onClick={this.handlebuttonfix }
              style={{width:'50px',height:'50px'}}
            />
          </Affix>
        </Layout>
      </Layout>
    );
  }
}

export default connect(store => ({
  collapsedSider: store.siderCollapse,
  dispatch: store.dispatch,
  isMobile:store.isMobile
}))(BasicLayout);


