import React, { useState, useEffect } from "react";
import { Layout, Menu, Input } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import dashboard from "../assets/dashboard.png";
import user from "../assets/user.png";
import content from "../assets/content.png";
import analysis from "../assets/analysis.png";
import setting from "../assets/setting.png";
import global from "../assets/global.png";
import notification from "../assets/notification-bing.png";
import search from "../assets/search-normal.png";
import {
  MdOutlineGavel,        // Moderation Tools
  MdOutlineSettings,     // Site Settings
  MdOutlineAttachMoney,  // Monetization
  MdOutlineSearch,       // SEO
  MdOutlineSecurity,     // Security
  MdOutlineBrush,        // Customizations
  MdOutlineBuild         // System Config
} from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi"; // SEO alternative

const iconStyle = { fontSize: "18px", color: "#fff" };

const { Sider, Content, Header } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem(
    "Dashboard",
    "/dashboard",
    <img src={dashboard} alt="" className="w-4" />
  ),
  getItem(
    "User Management",
    "/user-management",
    <img src={user} alt="" className="w-4" />
  ),
  getItem(
    "Content Management",
    "/content-management",
    <img src={content} alt="" className="w-4" />
  ),
  getItem(
    "Analytics & Insights",
    "/analytics-&-insights",
    <img src={analysis} alt="" className="w-4" />
  ),
  getItem("Moderation Tools", "/moderation-tools", <MdOutlineGavel style={iconStyle} />),
  getItem("Site Settings & Config", "/site-settings-&-config", <MdOutlineSettings style={iconStyle} />),
  getItem("Monetization & Adverts", "/monetization-&-adverts", <MdOutlineAttachMoney style={iconStyle} />),
  getItem("SEO & Content Discovery", "/seo-&-content-discovery", <BiNetworkChart style={iconStyle} />),
  getItem("Security & Logs", "/security-&-logs", <MdOutlineSecurity style={iconStyle} />),
  getItem("Customizations", "/customizations", <MdOutlineBrush style={iconStyle} />),
  getItem("System Configuration", "/system-configuration", <MdOutlineBuild style={iconStyle} />),
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const handleResize = () => {
    if (window.innerWidth < 1020) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check the size on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-[#0A0E16] fixed left-0 top-0 bottom-0"
        width={250}
        style={{ height: "100vh", zIndex: 1000 }}
      >
        <div className="p-4 text-xl font-bold flex items-center">
          <img src={logo} alt="" className="mx-2" />
        </div>
        <Menu
          theme="dark"
          className="bg-[#0A0E16]"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header
          className="bg-white fixed top-0 left-0 right-0 flex items-center w-full"
          style={{ zIndex: 900, paddingLeft: collapsed ? 80 : 250 }}
        >
          <div className="flex justify-between items-center w-full !m-auto">
            <div className="bg-[#F6F6F6] flex items-center rounded-full w-72 px-3 ml-10">
              <img src={search} className="w-4 h-4 cursor-pointer" />
              <Input
                placeholder="Search anything....."
                className="ml-2 bg-transparent border-none outline-none focus:!outline-none focus:bg-transparent hover:!bg-transparent focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <div className="bg-[#1418230D] border-1 border-[#28303D08] rounded-full h-9 w-9 flex justify-center items-center">
                <img src={global} alt="" className="w-5" />
              </div>
              <div className="bg-[#1418230D] border-1 border-[#28303D08] rounded-full h-9 w-9 flex justify-center items-center">
                <img src={notification} alt="" className="w-5" />
              </div>
            </div>
          </div>
        </Header>
        <Content className="p-3" style={{ marginTop: 64 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
