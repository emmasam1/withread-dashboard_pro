import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, Space, Skeleton, Modal, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";
import { useApp } from "../context/AppContext";
import axios from "axios";

import followers from "../assets/followers.png";
import following from "../assets/following.png";
import community from "../assets/community.png";
import arrowRight from "../assets/arrow-right.png";
import placeholder from "../assets/placeholder-image.png";
import verify from "../assets/verify.png";
import checked from "../assets/checked.png";
import msg from "../assets/msg.png";
import share from "../assets/share.png";

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
  const [siteData, setSiteData] = useState([]);
  const [creators, setCreators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
   const [highlightingId, setHighlightingId] = useState(null);

  const showModal = (record) => {
    setSelectedCreator(record); // store clicked record
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDashboardDetails = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSiteData(res?.data?.stats || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTopCreator = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/user/top-creators?page=1&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCreators(res?.data?.data || []);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardDetails();
    getTopCreator();
  }, [token]);



const markPostFeatured = async (id) => {
  if (!token || !id) return;
  try {
    setHighlightingId(id);
    const res = await axios.patch(
      `${API_BASE_URL}/api/admin/posts/${id}/feature`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    message.success(res?.data?.message);
    console.log(res)
  } catch (error) {
    console.error(error);
    message.error("Failed to highlight post");
  } finally {
    setHighlightingId(null);
  }
};

  const data = [
    {
      key: 1,
      small_title: "Total Post",
      content: (
        <span className="font-bold text-2xl">
          {formatNumber(siteData?.totalPosts)} Posts
        </span>
      ),
      img: followers,
      from: (
        <span>{formatNumber(siteData?.totalApprovedPosts)} Posts Approved</span>
      ),
    },
    {
      key: 2,
      small_title: "Total Users",
      content: (
        <span className="font-bold text-2xl">
          {formatNumber(siteData?.totalUsers)} Users
        </span>
      ),
      img: following,
      from: (
        <span>{formatNumber(siteData?.totalVerifiedUsers)} Verified Users</span>
      ),
    },
    {
      key: 3,
      small_title: "Total Communities",
      content: (
        <span className="font-bold text-2xl">
          {formatNumber(siteData?.totalCommunities)} Communities
        </span>
      ),
      img: community,
      from: (
        <span>
          {formatNumber(siteData?.totalCommunities)} Communities Joined
        </span>
      ),
    },
  ];

  const columns = [
    {
      title: "Creators",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => (
        <div className="flex items-center">
          {record.avatar ? (
            <img
              src={record.avatar}
              alt={`${record.firstName} ${record.lastName}`}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full mr-2 flex items-center justify-center bg-gray-400 text-white text-sm font-bold">
              {record.firstName?.[0]?.toUpperCase()}
              {record.lastName?.[0]?.toUpperCase()}
            </div>
          )}
          {record.firstName} {record.lastName}
        </div>
      ),
    },

    {
      title: "Total Impressions",
      dataIndex: "totalImpressions",
      key: "totalImpressions",
      render: (val) => (
        <div className="flex items-center gap-1">
          {formatNumber(val)}
          <p className="">Impressions</p>
        </div>
      ),
    },
    {
      title: "Total Posts",
      dataIndex: "totalPosts",
      key: "totalPosts",
      render: (val) => (
        <div className="flex items-center gap-1">
          {formatNumber(val)}
          <p className="">Posts</p>
        </div>
      ),
    },
    {
      title: "Total Sahre",
      dataIndex: "share",
      key: "share",
      render: (val) => (
        <div className="flex items-center gap-1">
          {formatNumber(val)}
          <p className="">Share</p>
        </div>
      ),
    },
    {
      title: "",
      render: (_, record) => (
        <Button
          onClick={() => showModal(record)}
          className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
        >
          Details
        </Button>
      ),
    },
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
      {contextHolder}
      {/* Stats Cards */}
      <div className="mt-5 flex flex-wrap gap-5">
        {data.map((e, index) => (
          <div className="bg-white p-5 w-80 rounded-md" key={index}>
            <p className="mb-2">{e.small_title}</p>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src={e.img} className="w-7" alt="icon" />
                {loading ? (
                  <Skeleton.Input style={{ width: 80 }} active />
                ) : (
                  e.content
                )}
              </div>
              <div>
                <img
                  src={arrowRight}
                  alt="arrow icon"
                  className="w-[6px] mt-1"
                />
              </div>
            </div>
            <div className="mt-3 flex">
              {loading ? (
                <Skeleton.Input style={{ width: 120 }} active />
              ) : (
                <p className="text-[#55E8AD] bg-[#EDFEF6] px-2 !text-left text-xs">
                  {e.from}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Post Details"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        {selectedCreator ? (
          <div className="bg-[#F6F6F6] p-2 rounded-md">
            {/* Header: Avatar / Initials + Name */}
            <div className="flex mb-2 gap-2">
              {selectedCreator.avatar ? (
                <img
                  src={selectedCreator.avatar}
                  alt={`${selectedCreator.firstName} ${selectedCreator.lastName}`}
                  className="rounded-full h-9 w-9 object-cover"
                />
              ) : (
                <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-400 text-white text-xs font-bold">
                  {selectedCreator.firstName?.[0]?.toUpperCase()}
                  {selectedCreator.lastName?.[0]?.toUpperCase()}
                </div>
              )}

              <div>
                <div className="flex gap-2 items-center flex-wrap">
                  <h1 className="font-semibold text-xs">
                    {selectedCreator.firstName} {selectedCreator.lastName}
                  </h1>
                  <img src={verify} alt="" className="w-4" />
                  <p className="text-[#333333CC] text-xs">
                    @{selectedCreator.username}
                  </p>
                </div>
                <p className="text-[#333333CC] text-xs">
                  {new Date(
                    selectedCreator.topPost?.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Top Post Image */}
            <div className="h-42 rounded-md overflow-hidden">
              <img
                src={selectedCreator.topPost?.images?.[0] || placeholder}
                alt={selectedCreator.topPost?.title || "Post image"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Post Content */}
            <div className="mt-3">
              <h1 className="font-semibold text-xs">
                {selectedCreator.topPost?.title}
              </h1>
              <p className="mt-2 text-xs text-[#333333BF]">
                {selectedCreator.topPost?.content}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center mt-4 mb-2">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1">
                  <img src={checked} alt="" className="w-3 h-2" />
                  <p className="text-[#333333] text-xs">
                    {formatNumber(selectedCreator.topPost?.likesCount)} Likes
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={msg} alt="" className="w-3" />
                  <p className="text-[#333333] text-xs">
                    {formatNumber(selectedCreator.topPost?.commentsCount)}{" "}
                    Comments
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={share} alt="" className="w-4" />
                  <p className="text-[#333333] text-xs">Share</p>
                </div>
              </div>
              <div>
                <p className="text-[#333333] text-xs">
                  {formatNumber(selectedCreator.topPost?.impressions)} Total
                  Impressions
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No record selected</p>
        )}

        {/* Footer Button */}
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => markPostFeatured(selectedCreator?.topPost?._id)}
            loading={highlightingId === selectedCreator?.topPost?._id}
            className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
          >
            Pin on Featured
          </Button>
        </div>
      </Modal>

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
            <h1 className="text-sm font-semibold">Top Performing Creators</h1>
            <Link to="/dashboard/top-performing">See All</Link>
          </div>
          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <Table
              columns={columns}
              dataSource={creators}
              rowKey={(record) => record.authorId}
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
