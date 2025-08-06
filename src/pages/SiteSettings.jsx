import React, { useState } from "react";
import { Segmented } from "antd";
import ContentSettings from "../components/ContentSettings";
import NotificationsSettings from "../components/NotificationsSettings";
import UserRegistration from "../components/UserRegistration";
import Language from "../components/Language";
import Community from "../components/Community";

function SiteSettings() {
  const [selectedSegment, setSelectedSegment] = useState("Contents Settings");
  return (
    <div className="bg-white rounded-md p-3 mt-5">
      <Segmented
        defaultValue="Contents Settings"
        className="w-full"
        options={[
          "Contents Settings",
          "Notifications Settings",
          "User Registration",
          "Language & Localization",
          "Community Guidelines",
        ]}
        onChange={(value) => setSelectedSegment(value)}
      />

      {selectedSegment === "Contents Settings" && <ContentSettings />}
      {selectedSegment === "Notifications Settings" && <NotificationsSettings />}
      {selectedSegment === "User Registration" && <UserRegistration />}
      {selectedSegment === "Language & Localization" && <Language />}
      {selectedSegment === "Community Guidelines" && <Community />}
    </div>
  );
}

export default SiteSettings;
