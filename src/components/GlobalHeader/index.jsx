import React, { PureComponent } from 'react';
import { Menu, Icon, Breadcrumb, Tag, Dropdown, Avatar, Divider } from 'antd';
import moment from 'moment';
//import groupBy from 'lodash/groupBy';
//import Debounce from 'lodash-decorators/debounce';
import { Link } from 'react-router-dom';
import NotificationIcon from '../NotificationIcon';
//import HeaderSearch from '../HeaderSearch';
import styles from './index.module.less';
const MessageIcon = NotificationIcon;

export default class GlobalHeader extends PureComponent {

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    //return groupBy(newNotices, 'type');
    return newNotices;
  }

  render() {
    const {
      currentUser,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
    } = this.props;
    const noticeData = this.getNoticeData();
    const menssageData = noticeData.slice(0,5);
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item>
          <Icon type="user" />perfil
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />config
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="triggerError">
          <Icon type="user-add" />add account
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />logout
        </Menu.Item>
      </Menu>
    );
    //const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile ? (
          <div>
          <Link to="/home/dashboard" className={styles.logo} key="logo">
           <img src={logo} alt="logo" width="32" />
          </Link>
          <Divider type="vertical" key="line" />
          </div>
        ):(
        <Breadcrumb style={{ display: 'inline-block', marginLeft: '21px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>)}

        <div className={styles.right}>
          <MessageIcon
            list={menssageData}
            icon={"mail"}
            className={styles.action}
            count={currentUser.newMessageCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line (item, tabProps)
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
          </MessageIcon>
          <NotificationIcon
            list={noticeData.slice(5,noticeData.length)}
            icon={"bell"}
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line (item, tabProps)
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
          </NotificationIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
              <div size="small" style={{ marginLeft: 8 }} />
            )}
        </div>
      </div>
    );
  }
}
