import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

import "./style.css";

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
  getItem("Packages", "packages", <UnorderedListOutlined />, [
    getItem("All Packages", "/packages", <UnorderedListOutlined />),
    getItem("Add New Packages", "/new-package", <PlusOutlined />),
  ]),
  getItem("Ports", "ports", <UnorderedListOutlined />, [
    getItem("All Ports", "/ports", <UnorderedListOutlined />),
    getItem("Add New Port", "/new-port", <PlusOutlined />),
  ]),
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
      <Button type="primary" onClick={toggleCollapsed}>
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
      ></Menu>
    </div>
  );
};
export default ProjectMenu;
