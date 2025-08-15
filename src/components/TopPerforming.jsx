import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Input,
  Dropdown,
  Space,
  Skeleton,
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import arrowLeft from "../assets/arrow-left.png";
import verify from "../assets/verify.png";
import checked from "../assets/checked.png";
import msg from "../assets/msg.png";
import share from "../assets/share.png";
import search from "../assets/search-normal.png";
import arrowDown from "../assets/arrow-down.png";
import placeholder from "../assets/placeholder-image.png";
import { useApp } from "../context/AppContext";
import axios from "axios";

const TopPerforming = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { API_BASE_URL, token, loading, setLoading } = useApp();
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [highlightingId, setHighlightingId] = useState(null);

  const showModal = (record) => {
    setSelectedCreator(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      console.log(res);
    } catch (error) {
      console.error(error);
      message.error("Failed to highlight post");
    } finally {
      setHighlightingId(null);
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
    getTopCreator();
  }, [token]);

  const formatNumber = (num) => {
    if (!num && num !== 0) return "-";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  };

  const columns = [
    {
      title: "Creators",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, record) => (
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
      title: "Likes",
      dataIndex: ["topPost", "likesCount"],
      key: "likes",
      render: (val) => `${formatNumber(val)} Likes`,
    },
    {
      title: "Views",
      dataIndex: "totalViews",
      key: "views",
      render: (val) => `${formatNumber(val)} Views`,
    },
    {
      title: "Shares",
      dataIndex: "totalShares",
      key: "shares",
      render: (val) => `${formatNumber(val)} Shares`,
    },
    {
      title: "",
      width: 100,
      render: (_, record) => (
        <Button
          className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
          onClick={() => showModal(record)}
        >
          Details
        </Button>
      ),
    },
  ];

  const items = [
    { label: "1 Week", key: "0" },
    { label: "1 Month", key: "1" },
    { label: "3 Months", key: "3" },
  ];

  return (
    <div>
      {contextHolder}
      <Link
        to="/dashboard"
        className="flex gap-2 w-20 hover:!text-black items-center"
      >
        <img src={arrowLeft} alt="back" className="w-4" /> Back
      </Link>

      <div className="bg-white rounded-md p-3 mt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold">Top Performing Post</h1>
          <div className="flex justify-between items-center gap-6">
            <div className="bg-[#F6F6F6] flex items-center rounded-full w-72 px-3">
              <img src={search} className="w-4 h-4 cursor-pointer" />
              <Input
                placeholder="Search user....."
                className="ml-2 bg-transparent border-none outline-none focus:!outline-none"
              />
            </div>
            <Dropdown
              className="!text-black bg-[#F6F6F6] p-1 rounded-md px-2"
              menu={{ items }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  This week
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none flex items-center h-9">
              Export as <img src={arrowDown} className="w-3 ml-1" />
            </Button>
          </div>
        </div>
        {loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
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

      <Modal
        title="Top Performing Post"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        {selectedCreator ? (
          <div className="bg-[#F6F6F6] p-2 rounded-md">
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

            <div className="h-[350px] rounded-md overflow-hidden">
              <img
                src={selectedCreator.topPost?.images?.[0] || placeholder}
                alt={selectedCreator.topPost?.title || "Post image"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3">
              <h1 className="font-semibold text-xs">
                {selectedCreator.topPost?.title}
              </h1>
              <p className="mt-2 text-xs text-[#333333BF]">
                {selectedCreator.topPost?.content}
              </p>
            </div>

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

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => markPostFeatured(selectedCreator?.topPost?._id)}
            loading={highlightingId === selectedCreator?.topPost?._id}
            disabled={selectedCreator?.topPost?.isFeatured} // disable if already featured
            className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
          >
            {selectedCreator?.topPost?.isFeatured
              ? "Featured"
              : "Pin to Featured"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TopPerforming;
