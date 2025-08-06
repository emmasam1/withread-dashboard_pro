import React, { useState } from "react";
import { Button, Table, Modal, Input, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import arrowLeft from "../assets/arrow-left.png";
import user from "../assets/user_img.png";
import bgImg from "../assets/bgImg.png";
import verify from "../assets/verify.png";
import checked from "../assets/checked.png";
import msg from "../assets/msg.png";
import share from "../assets/share.png";
import search from "../assets/search-normal.png";
import arrowDown from "../assets/arrow-down.png";

// Replace 'user' with the actual image or avatar logic if needed, or mock it for now
const TopPerforming = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Creators",
      dataIndex: "user",
      key: "user",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={user}
            alt={record.user}
            className="w-8 h-8 rounded-full mr-2"
          />
          {record.user}
        </div>
      ),
    },
    {
      title: "Like",
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
      width: 100,
      render: (record) => (
        <Button
          className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
          onClick={showModal}
        >
          Details
        </Button>
      ),
    },
  ];

  const users = [
    {
      key: 1,
      user: "James Bogin",
      like: "100K Likes",
      view: "200K Views",
      share: "200K Shares",
    },
    {
      key: 2,
      user: "Sarah Williams",
      like: "150K Likes",
      view: "250K Views",
      share: "180K Shares",
    },
    {
      key: 3,
      user: "Michael Smith",
      like: "120K Likes",
      view: "220K Views",
      share: "190K Shares",
    },
    {
      key: 4,
      user: "Jessica Brown",
      like: "180K Likes",
      view: "300K Views",
      share: "250K Shares",
    },
    {
      key: 5,
      user: "David Johnson",
      like: "80K Likes",
      view: "150K Views",
      share: "100K Shares",
    },
    {
      key: 6,
      user: "Laura Davis",
      like: "200K Likes",
      view: "350K Views",
      share: "300K Shares",
    },
    {
      key: 7,
      user: "Chris Lee",
      like: "130K Likes",
      view: "270K Views",
      share: "230K Shares",
    },
  ];

  const items = [
    {
      label: "1 Week",
      key: "0",
    },
    {
      label: "1 Month",
      key: "1",
    },
    {
      label: "3 Months",
      key: "3",
    },
  ];

  return (
    <div>
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
                className="ml-2 bg-transparent border-none outline-none focus:!outline-none focus:bg-transparent hover:!bg-transparent focus:border-transparent"
              />
            </div>
            <Dropdown
              className="!text-black bg-[#F6F6F6] p-1 rounded-md px-2"
              menu={{
                items,
              }}
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
        <Table
          columns={columns}
          dataSource={users}
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          className="mt-3"
        />
      </div>

      <Modal
        title="Top Performing Post"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="bg-[#F6F6F6] p-2 rounded-md">
          <div className="flex mb-2 gap-2">
            <img src={user} alt="" className="rounded-full h-9" />
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="font-semibold text-xs">Ramsey Gary</h1>
                <img src={verify} alt="" className="w-4" />
                <p className="text-[#333333CC] text-xs">@ramseygry12</p>
              </div>
              <p className="text-[#333333CC] text-xs">29-09-2024</p>
            </div>
          </div>
          <div className="h-42 rounded-md overflow-hidden">
            <img src={bgImg} alt="" className="object-cover" />
          </div>

          <div className="mt-3">
            <h1 className="font-semibold text-xs">
              New Solar Panel Technology that Sell Sunlight at Night Increases
              Efficiency by 40%
            </h1>
            <p className="mt-2 text-xs text-[#333333BF]">
              New Solar Panel Technology that Sell Sunlight at Night Increases
              Efficiency by 40% New Solar Panel Technology that Sell Sunlight at
              Night Increases Efficiency by 40%, New Solar Panel Technology that
              Sell Sunlight at Night Increases Efficiency by 40%, New Solar
              Panel Technology that Sell Sunlight at Night Increases Efficiency
              by 40% New Solar Panel Technology that Sell Sunlight at Night
              Increases Efficiency by 40% New Solar Panel Technology that Sell
              Sunlight at Night Increases Efficiency by 40%....
            </p>
          </div>

          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1">
                <img src={checked} alt="" className="w-3 h-2" />
                <p className="text-[#333333] text-xs">50k Likes</p>
              </div>
              <div className="flex items-center gap-1">
                <img src={msg} alt="" className="w-3" />
                <p className="text-[#333333] text-xs">3k Comments</p>
              </div>
              <div className="flex items-center gap-1">
                <img src={share} alt="" className="w-4" />
                <p className="text-[#333333] text-xs">9.6k Share</p>
              </div>
            </div>
            <div>
              <p className="text-[#333333] text-xs">1M Total Impressions</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
            // onClick={suspendAccount}
          >
            Pin on Featured
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TopPerforming;
