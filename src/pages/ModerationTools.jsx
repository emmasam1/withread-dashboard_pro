import React, { useState } from "react";
import { Segmented } from "antd";
import AllModerations from "../components/AllModerations";


const ModerationTools = () => {
  const [selectedSegment, setSelectedSegment] = useState("All Moderations");

  return (
    <div>
      <div className="flex justify-between">
        <Segmented
          defaultValue="All Moderations"
          className="w-2/5"
          options={[
            "All Moderations",
            "Automated Moderation",
            "Reports & Alerts",
          ]}
          onChange={(value) => setSelectedSegment(value)}
        />
      </div>

      {selectedSegment === "All Moderations" && <AllModerations />}
      {/* {selectedSegment === "Contents Approval" && <ContentsApproval />}
      {selectedSegment === "Featured Post Management" && <FeaturedPost />}
      {selectedSegment === "Comments Management" && <CommentsManagement />}
      {selectedSegment === "Category Management" && <CategoryManagement />} */}
    </div>
  );
};

export default ModerationTools;