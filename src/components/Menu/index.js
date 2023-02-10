import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  HomeOutlined,
  ProfileFilled,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

import "./style.css";
import { Link, useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Home", "/", <HomeOutlined />),
  getItem("Profile", "/profile", <UserOutlined />),
  getItem("Packages", "/packages", <UnorderedListOutlined />),
  getItem("Ports", "/ports", <UnorderedListOutlined />),
  // getItem("Ports", "sub1", <MailOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Option 7", "7"),
  //   getItem("Option 8", "8"),
  // ]),
  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 11", "11"),
  //     getItem("Option 12", "12"),
  //   ]),
  // ]),
];

const ProjectMenu = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className="home-menu"
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        // style={{
        //   marginBottom: 1,
        // }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        className="project-menu"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={({ key }) => {
          navigate(key);
        }}
      >
        {/* <Menu.Item key="1">
          <PieChartOutlined />
          <span>Home</span>
          <Link to="/" />
        </Menu.Item> */}
      </Menu>
    </div>
  );
};
export default ProjectMenu;
