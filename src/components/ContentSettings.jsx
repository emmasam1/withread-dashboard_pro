import React, { useState, useEffect } from "react";
import { Segmented, Button, message, Skeleton } from "antd";
import greenDot from "../assets/green_dot.png";
import { useApp } from "../context/AppContext";
import axios from "axios";
import { motion } from "framer-motion";

const ContentSettings = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { API_BASE_URL, token } = useApp();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/system/system-config`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const config = res.data?.contentSettings ?? res.data;

        if (config && typeof config === "object") {
          setSettings(config);
        } else {
          console.error("Invalid config data. Response:", res.data);
          messageApi.error("Invalid config data from server.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        messageApi.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [API_BASE_URL, token]);

  const updateSettings = async (updated) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/system/system-config`,
        { contentSettings: updated },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      messageApi.success(res.data?.message || "Settings updated.");
    } catch (err) {
      console.error("Update error:", err);
      messageApi.error("Failed to update settings.");
    }
  };

  const handleToggle = (key, value) => {
    const updated = {
      ...settings,
      [key]: value === "Enable",
    };
    setSettings(updated);
    updateSettings(updated);
  };
  

  const data = [
    {
      key: "allowUserToPostContent",
      title: "Allow users to post contents",
      content: "This gives users the access to post their content effortlessly",
    },
    {
      key: "allowUserToPostComment",
      title: "Allow users to make comments",
      content: "This gives users the access to comment on posts",
    },
    {
      key: "allowUserToSharePost",
      title: "Allow users to share post",
      content: "This gives users the access to share other posts",
    },
    {
      key: "allowUserToCreateCommunity",
      title: "Allow users to create community",
      content: "Users can create new communities",
    },
    {
      key: "allowUserToJoinCommunity",
      title: "Allow users to join community",
      content: "Users can join any public or invited communities",
    },
    {
      key: "contentLengthLimit",
      title: "Set content length",
      content: "Configure the maximum length of user posts.",
      isButton: true,
    },
    {
      key: "mediaUploadLimitMB",
      title: "Media upload limits",
      content: "Set limits for media uploads.",
      isButton: true,
    },
  ];

  return (
  <div className="mt-4">
    {contextHolder}
    {loading
      ? Array.from({ length: 6 }).map((_, i) => (
          <div className="py-3 border-b border-gray-200" key={i}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
        ))
      : data.map((item, index) => (
          <div
            key={item.key}
            className="flex justify-between items-center border-b-[#D0D0D033] border-b-[.1rem] py-3"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-[#333333B2] text-xs mt-1">{item.content}</p>
            </div>

            {item.isButton ? (
              <Button className="rounded-full bg-[#F6F6F6] hover:!bg-[#F6F6F6] text-[#333333B2] text-xs border-none">
                {item.key === "contentLengthLimit"
                  ? `${settings?.contentLengthLimit || 0} Words Length`
                  : `${settings?.mediaUploadLimitMB || 0} MB Limit`}
              </Button>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Segmented
                  value={settings?.[item.key] ? "Enable" : "Disable"}
                  className="w-48"
                  options={[
                    {
                      label: (
                        <span className="flex items-center">
                          <img
                            src={greenDot}
                            alt="Enable"
                            className="mr-2 w-2 h-2"
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
                  onChange={(val) => handleToggle(item.key, val)}
                />
              </motion.div>
            )}
          </div>
        ))}
  </div>
);

};

export default ContentSettings;
