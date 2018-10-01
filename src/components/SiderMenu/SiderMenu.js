import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import styles from "./index.module.less";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    // const [_, first, second, ...rest] = pathname.split("/");
    // return [`/${first}`];
    return [`/${pathname.split("/")[1]}`];

    // // eg. /list/search/articles = > ['','list','search','articles']
    // let snippets = pathname.split("/");
    // // Delete the end
    // // eg.  delete 'articles'
    // snippets.pop();
    // // Delete the head
    // // eg. delete ''
    // snippets.shift();
    // // eg. After the operation is completed, the array should be ['list','search']
    // // eg. Forward the array as ['list','list/search']
    // snippets = snippets.map((item, index) => {
    //   // If the array length > 1
    //   if (index > 0) {
    //     // eg. search => ['list','search'].join('/')
    //     return snippets.slice(0, index + 1).join("/");
    //   }
    //   // index 0 to not do anything
    //   return item;
    // });
    // snippets = snippets.map(item => {
    //   return this.getSelectedMenuKeys(`/${item}`)[0];
    // });
    // // eg. ['list','list/search']
    // return snippets;
  }

  handleOpenChange = openKeys => {
    this.setState({ openKeys });
    console.log('openKeys',openKeys);
    //const { onCollapse } = this.props;
    
    // const lastOpenKey = openKeys[openKeys.length - 1];
    // const isMainMenu = this.menus.some(
    //   item =>
    //     lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey),
    // );
    // this.setState({
    //   openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    // });
  };
  render() {
    const { collapsed, onCollapse, location, logo, isMobile } = this.props;
    const { openKeys } = this.state;
    console.log("ismobileeee sider",isMobile)
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys,
        };
    // if pathname can't match, use the nearest parent's key
    menuProps["selectedKeys"] = [location.pathname];
    
    const siderProps =isMobile? {
      breakpoint:'lg',
      trigger:null          
    }: {
      breakpoint:'lg',
    };
    return (
      <Sider
        {...siderProps}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
        style={{position:isMobile?null:'fixed'}}
      >   
        <div className={styles.logo} key="logo">
          <Link to="/home/dashboard">
            <img src={logo} alt="logo" />
            <h1>Lexco</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
         onSelect={()=>{onCollapse(true)}}
        >
          <Menu.Item key="/home/dashboard">
              <Link to="/home/dashboard">
                <Icon type="home" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/log">
              <Link to="/log">
                <Icon type="desktop" />
                <span>Log</span>
              </Link>
            </Menu.Item>
            <SubMenu 
              key="/settingd"
              title={<span><Icon type="setting" /><span>Setup</span></span>}
            >
              <Menu.Item key="3">User</Menu.Item>
              <Menu.Item key="/settings/linecontrol">
                <Link to="/settings/linecontrol">Control line</Link>
              </Menu.Item>
              <Menu.Item key="/settings/teams">
                <Link to="/settings/teams">Roles & teams</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="/email"
              title={<span><Icon type="inbox" /><span>Mail</span></span>}
            >
              <Menu.Item key="/mail/settle">Settle</Menu.Item>
              <Menu.Item key="/email/inbox">inbox</Menu.Item>
            </SubMenu>
            <Menu.Item key="/file">
              <Icon type="file" />
              <span>Files</span>
            </Menu.Item>
            <Menu.Item key="/archivo">
              <Link to="/archivo">
                <Icon type="book" />
                <span>archivo</span>
              </Link>
            </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;

