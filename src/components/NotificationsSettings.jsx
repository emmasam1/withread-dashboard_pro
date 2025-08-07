import React, { useState, useEffect } from "react";
import { Segmented, Skeleton, message } from "antd";
import greenDot from "../assets/green_dot.png";
import { useApp } from "../context/AppContext";
import axios from "axios";
import { motion } from "framer-motion";

const NotificationsSettings = () => {
  const { API_BASE_URL, token } = useApp();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null); // For per-toggle loading
  const [messageApi, contextHolder] = message.useMessage();

  const settingsMap = [
    {
      key: "newPost",
      title: "Allow users to receive notifications for new post",
    },
    {
      key: "newComment",
      title: "Allow users to receive notifications for comments",
    },
    {
      key: "replyToComment",
      title: "Allow users to receive notifications for replies",
    },
    {
      key: "reportNotifications",
      title: "Allow users to receive notifications for reports",
    },
    {
      key: "collaborationRequests",
      title: "Allow users to receive notifications for collaborations",
    },
  ];

  // Fetch settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/system/system-config`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const config = res.data?.config?.notificationSettings;

      if (config && typeof config === "object") {
        setSettings(config);
      } else {
        messageApi.error("Invalid config data from server.");
        console.error("Invalid config:", res.data);
      }
    } catch (error) {
      messageApi.error("Failed to fetch settings");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle switch
  const toggleSetting = async (key) => {
    const updated = {
      ...settings,
      [key]: !settings[key],
    };

    try {
      setSavingKey(key);
      setSettings(updated);

      const res = await axios.put(
        `${API_BASE_URL}/api/system/system-config`,
        { notificationSettings: updated },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success(res.data.message);
    } catch (error) {
      messageApi.error("Failed to update setting");
      console.error("Update error:", error);
      // Revert back if error
      setSettings((prev) => ({ ...prev, [key]: !updated[key] }));
    } finally {
      setSavingKey(null);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="mt-4">
      {contextHolder}

      {loading ? (
        // Skeleton loader
        <>
          {[...Array(5)].map((_, i) => (
            <Skeleton.Input key={i} active block className="h-12 mb-4" />
          ))}
        </>
      ) : (
        settingsMap.map(({ key, title }) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={key}
            className="flex justify-between items-center border-b-[#D0D0D033] border-b-[.1rem] py-2"
          >
            <div>
              <p className="font-semibold">{title}</p>
            </div>

            <Segmented
              value={settings[key] ? "Enable" : "Disable"}
              onChange={() => toggleSetting(key)}
              loading={savingKey === key}
              className="mb-4 w-48"
              options={[
                {
                  label: (
                    <span className="flex items-center">
                      <img src={greenDot} alt="Enable" className="mr-3 w-2" />
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
            />
          </motion.div>
        ))
      )}
    </div>
  );
};

export default NotificationsSettings;
