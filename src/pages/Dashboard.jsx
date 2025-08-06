import React from "react";
import { Table, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";

// Sample data for the chart
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];  // Data for "User"
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];  // Data for "Comment"
const qData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];  // Data for "New Post"
const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

import followers from "../assets/followers.png";
import following from "../assets/following.png";
import community from "../assets/community.png";
import arrowRight from "../assets/arrow-right.png";
import user from "../assets/user_img.png";

const Dashboard = () => {
  const data = [
    {
      key: 1,
      small_title: "Total Followers",
      content: "125.3K Following",
      img: followers,
      from: "+20 from yesterday",
    },
    {
      key: 2,
      small_title: "Total Following",
      content: "125.3K Following",
      img: following,
      from: "+5 from yesterday",
    },
    {
      key: 3,
      small_title: "Total Community Joined",
      content: "10 Communities",
      img: community,
      from: "+2 from yesterday",
    },
  ];

  const columns = [
    {
      title: "Creators",
      dataIndex: "user",
      key: "user",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={user}
            alt={record.username}
            className="w-8 h-8 rounded-full mr-2"
          />
          {record.user}
        </div>
      ),
    },
    {
      title: "like",
      dataIndex: "like",
      key: "like",
    },
    {
      title: "Views",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Share",
      dataIndex: "share",
      key: "share",
    },
    {
      title: "",
      render: (record) => (
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
    { key: 4, user: "James Bogin", like: "100K Likes", view: "200K View", share: "200K Share" },
    { key: 5, user: "James Bogin", like: "100K Likes", view: "200K View", share: "200K Share" },
    { key: 6, user: "James Bogin", like: "100K Likes", view: "200K View", share: "200K Share" },
    { key: 7, user: "James Bogin", like: "100K Likes", view: "200K View", share: "200K Share" },
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
      <div className="mt-5 flex items-center justify-between">
        {data.map((e, index) => (
          <div className="bg-white p-5 w-80 rounded-md" key={index}>
            <p className="mb-2">{e.small_title}</p>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src={e.img} className="w-7" alt="icon" />
                <p className="font-semibold text-lg">{e.content}</p>
              </div>
              <div>
                <img src={arrowRight} alt="arrow icon" className="w-[6px] mt-1" />
              </div>
            </div>
            <div className="bg-[#EDFEF6] mt-3 w-28 rounded flex items-center justify-center">
              <p className="text-[#55E8AD] text-xs">{e.from}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6 gap-5">
        <div className="bg-white w-full rounded-md p-2">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Recent Activity</h1>
            <Dropdown
              className="!text-black bg-[#F6F6F6] p-1 rounded-md px-2"
              menu={{ items }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Today
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div>
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
          </div>
        </div>

        <div className="bg-white w-full rounded-md p-2">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Top Performing Post</h1>
            <Link to="/dashboard/top-performing">See All</Link>
          </div>

          <Table
            columns={columns}
            dataSource={users}
            size="small"
            scroll={{ x: "max-content" }}
            pagination={false}
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
