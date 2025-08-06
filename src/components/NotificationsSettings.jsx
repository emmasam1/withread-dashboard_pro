import React, { useState } from "react";
import { Segmented, Button } from "antd";
import grendot from "../assets/green_dot.png";

const NotificationsSettings = () => {
  const [selectedSegment, setSelectedSegment] = useState("Enable");

  const data = [
    {
      key: 1,
      title: "Allow users to receive notifications for new post",
    },
    {
      key: 2,
      title: "Allow users to receive notifications for comments",
    },
    {
      key: 3,
      title: "Allow users to receive notifications for replies",
    },
    {
      key: 4,
      title: "Allow users to receive notifications for reports",
    },
    {
      key: 5,
      title: "Allow users to receive notifications for collaborations",
    },
  ];

  return (
    <div className="mt-4">
      {data.map((e) => {
        return (
          <div
            className="flex justify-between items-center border-b-[#D0D0D033] border-b-[.1rem] py-2"
            key={e.key}
          >
            <div>
              <p className="font-semibold">{e.title}</p>
            </div>

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
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsSettings;
