import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, Space, Skeleton } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";
import { useApp } from "../context/AppContext";
import axios from "axios";

import followers from "../assets/followers.png";
import following from "../assets/following.png";
import community from "../assets/community.png";
import arrowRight from "../assets/arrow-right.png";
import userImg from "../assets/user_img.png";

// Sample chart data
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const qData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Helper to format numbers
const formatNumber = (num) => {
  if (!num && num !== 0) return "-";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const Dashboard = () => {
  const { API_BASE_URL, token, loading, setLoading } = useApp();
  const [siteData, setSiteData] = useState();

  const getDashboardDetails = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSiteData(res?.data?.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardDetails();
  }, [token]);

  const data = [
    {
      key: 1,
      small_title: "Total Post",
      content: <span className="font-bold text-2xl">{formatNumber(siteData?.totalPosts)} Posts</span>,
      img: followers,
      from: <span>{formatNumber(siteData?.totalApprovedPosts)} Posts Approved</span>,
    },
    {
      key: 2,
      small_title: "Total Users",
      content: <span className="font-bold text-2xl">{formatNumber(siteData?.totalUsers)} Users</span>,
      img: following,
      from: <span>{formatNumber(siteData?.totalVerifiedUsers)} Verified Users</span>,
    },
    {
      key: 3,
      small_title: "Total Communities",
      content: <span className="font-bold text-2xl">{formatNumber(siteData?.totalCommunities)} Communities</span>,
      img: community,
      from: <span>{formatNumber(siteData?.totalCommunities)} Communities Joined</span>,
    },
  ];

  const columns = [
    {
      title: "Creators",
      dataIndex: "user",
      key: "user",
      render: (text, record) => (
        <div className="flex items-center">
          <img src={userImg} alt={record.user} className="w-8 h-8 rounded-full mr-2" />
          {record.user}
        </div>
      ),
    },
    { title: "Likes", dataIndex: "like", key: "like" },
    { title: "Views", dataIndex: "view", key: "view" },
    { title: "Share", dataIndex: "share", key: "share" },
    {
      title: "",
      render: () => (
        <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
          Details
        </Button>
      ),
    },
  ];

  const users = [
    { key: 1, user: "James Bogin", like: "100K Likes", view: "200K View", share: "200K Share" },
    { key: 2, user: "James Bogin", like: "100K Likes", view: "200K View", share: "200K Share" },
    { key: 3, user: "James Bogin", like: "100K Likes", view: "200K View", share: "200K Share" },
  ];

  const items = [
    { label: "7 Days", key: "0" },
    { label: "1 Week", key: "1" },
    { label: "1 Month", key: "3" },
    { label: "6 Months", key: "4" },
    { label: "8 Months", key: "5" },
    { label: "10 Months", key: "6" },
    { label: "1 Year", key: "7" },
  ];

  return (
    <div>
      <div className="mt-5 flex flex-wrap gap-5">
        {data.map((e, index) => (
          <div className="bg-white p-5 w-80 rounded-md" key={index}>
            <p className="mb-2">{e.small_title}</p>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src={e.img} className="w-7" alt="icon" />
                {loading ? <Skeleton.Input style={{ width: 80 }} active /> : e.content}
              </div>
              <div>
                <img src={arrowRight} alt="arrow icon" className="w-[6px] mt-1" />
              </div>
            </div>
            <div className="mt-3 flex">
              {loading ? <Skeleton.Input style={{ width: 120 }} active /> : <p className="text-[#55E8AD] bg-[#EDFEF6] px-2 !text-left text-xs">{e.from}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
  {/* Recent Activity */}
  <div className="bg-white rounded-md p-2">
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-sm font-semibold">Recent Activity</h1>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Today
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
    {loading ? (
      <Skeleton active paragraph={{ rows: 6 }} />
    ) : (
      <LineChart
        className="!w-full !h-fit"
        width={500}
        height={300}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        series={[
          { data: uData, label: "User", color: "black" },
          { data: pData, label: "Comment", color: "blue" },
          { data: qData, label: "New Post", color: "green" },
        ]}
      />
    )}
  </div>

  {/* Top Performing Post */}
  <div className="bg-white rounded-md p-2">
    <div className="flex justify-between items-center mb-3">
      <h1 className="text-sm font-semibold">Top Performing Post</h1>
      <Link to="/dashboard/top-performing">See All</Link>
    </div>
    {loading ? (
      <Skeleton active paragraph={{ rows: 4 }} />
    ) : (
      <Table
        columns={columns}
        dataSource={users}
        size="small"
        scroll={{ x: "max-content" }}
        pagination={false}
        className="mt-3"
      />
    )}
  </div>
</div>

    </div>
  );
};

export default Dashboard;
