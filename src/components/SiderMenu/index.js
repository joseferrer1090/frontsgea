import "rc-drawer/assets/index.css";
import React from "react";
import DrawerMenu from "rc-drawer";
import SiderMenu from "./SiderMenu";

export default props =>
  props.isMobile ? (
    <DrawerMenu
      getContainer={null}
      //level={["body .ant-layout .ant-layout"]}
      level={null}
      handler={false}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
        console.log("eyyyyyyyy")
      }}
    >
      <SiderMenu
        {...props}
        collapsed={props.isMobile ? false : props.collapsed}
      />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  );
