import React, { PureComponent } from 'react';
import { Popover, Icon, Badge, Spin } from 'antd';
import classNames from 'classnames';
import List from './Notices.list';
import styles from './index.module.less';

//const { TabPane } = Tabs;

export default class NotificationIcon extends PureComponent {
  static defaultProps = {
    onItemClick: () => { },
    onPopupVisibleChange: () => { },
    onTabChange: () => { },
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: 'empty!',
      clear: 'see all',
    },
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };
  //static Tab = TabPane;
  constructor(props) {
    super(props);
    this.state = {};
    /*if (props.children && props.children[0]) {
      this.state.tabType = props.children[0].props.title;
    }*/
  }
  onItemClick = (item) => {
    const { onItemClick } = this.props;
    onItemClick(item);
  };
  /*onTabChange = tabType => {
    this.setState({ tabType });
    this.props.onTabChange(tabType);
  };*/
  getNotifications() {
    const {list, loading, locale } = this.props;
    if (!list) {
      return null;
    }
    const notifications =
      <List
        data={list}
        onClick={item => this.onItemClick(item)}
        onClear={() => this.props.onClear("this.props.title")}
        title={this.props.title}
        locale={locale}
        emptyImage={this.props.emptyImage}
      />
    return (
      <Spin spinning={loading} delay={0}>      
          {notifications}    
      </Spin>
    );
  }
  render() {
    const { className, count, popupAlign, onPopupVisibleChange, icon } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationList = this.getNotifications();
    const iconItem = typeof icon === "string"? <Icon type={icon} className={styles.icon} />:icon;
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count} className={styles.badge}>
          {iconItem}
        </Badge>
      </span>
    );
    if (!notificationList) {
      return trigger;
    }
    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationList}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}
