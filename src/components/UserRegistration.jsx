import React, { useState, useEffect } from "react";
import { Segmented, message, Skeleton } from "antd";
import grendot from "../assets/green_dot.png";
import axios from "axios";
import { useApp } from "../context/AppContext"; // if you have this

const UserRegistration = () => {
  const { API_BASE_URL, token } = useApp();

  const [selectedSegments, setSelectedSegments] = useState({
    1: "Enable",
    2: "Enable",
    3: "OAuth",
  });
  const [loading, setLoading] = useState(false);

  const data = [
    {
      key: 1,
      title: "Configure user registration",
      content:
        "If you disable this module, no one can register on this system.",
      settingKey: "allowUserRegistration",
    },
    {
      key: 2,
      title: "Email Verification",
      content:
        "If you enable Email Verification, users have to verify their email to access the dashboard. A 6-digit verification code will be sent to their email to be verified.",
      settingKey: "enableEmailVerification",
    },
    {
      key: 3,
      title: "User authentication methods",
      content: false,
      settingKey: "authenticationMethod",
    },
  ];

  // Fetch initial settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/system/system-config`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userSettings = res.data.config?.userSettings;

      if (!userSettings || typeof userSettings !== "object") {
        throw new Error("Invalid config data from server");
      }

      const updatedSegments = {
        1: userSettings.allowUserRegistration ? "Enable" : "Disable",
        2: userSettings.enableEmailVerification ? "Enable" : "Disable",
        3: userSettings.authenticationMethod || "OAuth",
      };

      setSelectedSegments(updatedSegments);
    } catch (error) {
      console.error("Failed to fetch settings", error);
      message.error("Failed to load settings from server.");
    } finally {
      setLoading(false);
    }
  };

  // Update setting on toggle
  const handleSegmentChange = (key, settingKey) => async (value) => {
    const updated = {
      ...selectedSegments,
      [key]: value,
    };
    setSelectedSegments(updated);

    const userSettings = {
      allowUserRegistration: updated[1] === "Enable",
      enableEmailVerification: updated[2] === "Enable",
      authenticationMethod: updated[3],
    };

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/system/system-config`,
        { userSettings },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success(res.data.message);
    } catch (error) {
      console.error("Error updating setting:", error);
      message.error("Failed to update setting");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="mt-4">
      {loading
        ? Array.from({ length: data.length }).map((_, idx) => (
            <div key={idx} className="py-2 border-b-[.1rem] border-b-[#D0D0D033]">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          ))
        : data.map((e) => (
            <div
              className="flex justify-between border-b-[#D0D0D033] border-b-[.1rem] py-2"
              key={e.key}
            >
              <div>
                <p className="font-semibold">{e.title}</p>
                {e.content && (
                  <div className="w-[430px]">
                    <p className="text-[#333333B2] text-xs mt-1">{e.content}</p>
                  </div>
                )}
              </div>

              {e.content === false ? (
                <Segmented
                  value={selectedSegments[e.key]}
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
                  onChange={handleSegmentChange(e.key, e.settingKey)}
                />
              ) : (
                <Segmented
                  value={selectedSegments[e.key]}
                  className="mb-4 w-48"
                  options={[
                    {
                      label: (
                        <span className="flex items-center">
                          <img src={grendot} alt="Enable" className="mr-3 w-2" />
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
                  onChange={handleSegmentChange(e.key, e.settingKey)}
                />
              )}
            </div>
          ))}
    </div>
  );
};

export default UserRegistration;
