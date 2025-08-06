import React, { useState } from "react";
import { Segmented } from "antd";
import grendot from "../assets/green_dot.png";

const UserRegistration = () => {
  const [selectedSegments, setSelectedSegments] = useState({
    1: "Enable",
    2: "Enable",
    3: "OAuth",
  });

  const data = [
    {
      key: 1,
      title: "Configure user registration",
      content:
        "If you disable this module, no one can register on this system.",
    },
    {
      key: 2,
      title: "Email Verification",
      content:
        "If you enable Email Verification, users have to verify their email to access the dashboard. A 6-digit verification code will be sent to their email to be verified.",
    },
    {
      key: 3,
      title: "User authentication methods",
      content: false,
    },
  ];

  const handleSegmentChange = (key) => (value) => {
    setSelectedSegments((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-4">
      {data.map((e) => (
        <div
          className="flex justify-between border-b-[#D0D0D033] border-b-[.1rem] py-2"
          key={e.key}
        >
          <div>
            <p className="font-semibold">{e.title}</p>
            <div className="w-[430px]">
              <p className="text-[#333333B2] text-xs mt-1">{e.content}</p>
            </div>
          </div>

          {e.content === false ? (
            <Segmented
              value={selectedSegments[3]}
              className="mb-4 w-48"
              options={[
                {
                  label: <span className="flex items-center">OAuth</span>,
                  value: "OAuth",
                },
                {
                  label: "2FA",
                  value: "2FA",
                },
              ]}
              onChange={handleSegmentChange(3)}
            />
          ) : (
            <Segmented
              value={selectedSegments[e.key]}
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
              onChange={handleSegmentChange(e.key)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserRegistration;
