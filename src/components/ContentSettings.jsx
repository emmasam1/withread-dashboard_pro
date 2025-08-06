import React, { useState } from "react";
import { Segmented, Button } from "antd";
import grendot from "../assets/green_dot.png";

const ContentSettings = () => {
  const [selectedSegment, setSelectedSegment] = useState("Enable");

  const data = [
    {
      key: 1,
      title: "Allow users to post contents",
      content: "This gives users the access to post their content effortlessly",
    },
    {
      key: 2,
      title: "Allow users to post contents",
      content: "This gives users the access to post their content effortlessly",
    },
    {
      key: 3,
      title: "Allow users to post contents",
      content: "This gives users the access to post their content effortlessly",
    },
    {
      key: 4,
      title: "Allow users to post contents",
      content: "This gives users the access to post their content effortlessly",
    },
    {
      key: 5,
      title: "Allow users to post contents",
      content: "This gives users the access to post their content effortlessly",
    },
    {
      key: 6,
      title: "Set content length",
      content: "Configure the maximum length of user posts.",
      isButton: true,
    },
    {
      key: 7,
      title: "Media upload limits",
      content: "Set limits for media uploads.",
      isButton: true,
    },
  ];

  return (
    <div className="mt-4">
      {data.map((e) => {
        return (
          <div
            className="flex justify-between border-b-[#D0D0D033] border-b-[.1rem] py-2"
            key={e.key}
          >
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-[#333333B2] text-xs mt-1">{e.content}</p>
            </div>
            {e.isButton ? (
              <Button className="database-button rounded-full bg-[#F6F6F6] hover:!bg-[#F6F6F6] hover:!text-[#333333B2] text-[#333333B2] text-xs border-none">
                12,500 Words Length
              </Button>
            ) : (
              <Segmented
                value={selectedSegment}
                className="mb-4 w-48"
                options={[
                  {
                    label: (
                      <span className="flex items-center">
                        <img
                          src={grendot}
                          alt="Enable messaging"
                          className="mr-3 w-2"
                        />
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
                onChange={setSelectedSegment}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContentSettings;
