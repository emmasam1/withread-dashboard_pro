import React, { useState } from "react";
import { Segmented, Button, Modal, Input } from "antd";
import grendot from "../assets/green_dot.png";

const { TextArea } = Input;

const Monetization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placements, setPlacements] = useState({
    header: "On",
    sidebar: "On",
    post: "On",
  });
  const [selectedSegments, setSelectedSegments] = useState("Enable");

  const inputClass = "bg-[#F6F6F6] hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSegmentChange = (placement, value) => {
    setPlacements((prev) => ({
      ...prev,
      [placement]: value,
    }));
  };

  return (
    <div className="bg-white rounded-md p-3 mt-5">
      <h1 className="text-lg font-semibold">Advertisement Management</h1>
      <div className="mt-3">
        <p className="text-[#333333CC] mb-4">Configure ad placements:</p>
        <div className="flex justify-between mb-4">
          <p className="text-sm font-semibold">Header</p>
          <Segmented
            options={[
              {
                label: (
                  <span className="flex items-center">
                    <img src={grendot} alt="Enable messaging" className="mr-1 w-2" />
                    On
                  </span>
                ),
                value: "On",
              },
              {
                label: "Off",
                value: "Off",
              },
            ]}
            value={placements.header}
            onChange={(value) => handleSegmentChange("header", value)}
          />
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-sm font-semibold">Side Bar</p>
          <Segmented
            options={[
              {
                label: (
                  <span className="flex items-center">
                    <img src={grendot} alt="Enable messaging" className="mr-1 w-2" />
                    On
                  </span>
                ),
                value: "On",
              },
              {
                label: "Off",
                value: "Off",
              },
            ]}
            value={placements.sidebar} // Corrected
            onChange={(value) => handleSegmentChange("sidebar", value)} // Corrected
          />
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold">Post</p>
          <Segmented
            options={[
              {
                label: (
                  <span className="flex items-center">
                    <img src={grendot} alt="Enable messaging" className="mr-1 w-2" />
                    On
                  </span>
                ),
                value: "On",
              },
              {
                label: "Off",
                value: "Off",
              },
            ]}
            value={placements.post} // Corrected
            onChange={(value) => handleSegmentChange("post", value)} // Corrected
          />
        </div>

        <div>
          <p className="text-[#333333CC]">Ads Revenue</p>
          <div className="flex mt-4 gap-2">
            <p className="text-[#333333CC]">Monthly Revenue:</p>
            <p className="font-semibold"> $12,450.60</p>
          </div>
          <div className="flex mt-4 gap-2">
            <p className="text-[#333333CC]">Click-Through Rate:</p>
            <p className="font-semibold"> : 59%</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Advertisement Management</h1>
            <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none" onClick={showModal}>
              Edit
            </Button>
          </div>
          <div className="mt-2">
            <p className="User Tiers mb-2">User Tiers</p>
            <li className="text-[#333333E5] ml-2 mb-2">Free: [Features]</li>
            <li className="text-[#333333E5] ml-2">Premium: [Features]</li>
          </div>
          <div className="mt-2">
            <p className="User Tiers mb-2">Subscription Plans</p>
            <li className="text-[#333333E5] ml-2 mb-2">Free: [Features]</li>
            <li className="text-[#333333E5] ml-2">Premium: [Features]</li>
          </div>
        </div>
      </div>

      <Modal title="Edit Subscription Plan" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <p className="text-sm font-semibold mt-4">Free</p>
        <TextArea rows={3} placeholder="Features..." maxLength={200} className={`${inputClass} !resize-none`} />
        <p className="text-sm font-semibold mt-4">Premium</p>
        <TextArea rows={3} placeholder="Features..." maxLength={200} className={`${inputClass} !resize-none`} />

        <div className="mt-3">
          <p className="text-sm font-semibold mt-4">Subscription Plans</p>
          <div className="flex justify-between">
            <div>
              <p className="text-xs mt-4 mb-2">Monthly</p>
              <Input placeholder="Monthly Price" className={inputClass} />
            </div>
            <div>
              <p className="text-xs mt-4 mb-2">Monthly</p>
              <Input placeholder="Monthly Price" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <p className="text-sm font-semibold">1 month Free Trial</p>
          <Segmented
            value={selectedSegments}
            className="mb-4 w-48"
            options={[
              {
                label: (
                  <span className="flex items-center">
                    <img src={grendot} alt="Enable messaging" className="mr-3 w-2" />
                    Enable
                  </span>
                ),
                value: "Enable",
              },
              {
                label: "Disable",
                value: "Disable",
              },
            ]}
            onChange={(value) => setSelectedSegments(value)} // Add onChange handler
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Monetization;
