import { useState } from "react";
import { Segmented } from "antd";

import AllPosts from "../components/AllPosts";
import ContentsApproval from "../components/ContentsApproval";
import FeaturedPost from "../components/FeaturedPost";
import CommentsManagement from "../components/CommentsManagement";
import CategoryManagement from "../components/CategoryManagement";

const ContentManagement = () => {
  const [selectedSegment, setSelectedSegment] = useState("All Posts");

  return (
    <div>
      <div className="flex justify-between">
        <Segmented
          defaultValue="All Posts"
          className="!w-full"
          options={[
            "All Posts",
            "Contents Approval",
            "Featured Post Management",
            "Comments Management",
            "Category Management",
          ]}
          onChange={(value) => setSelectedSegment(value)}
        />
      </div>

      {selectedSegment === "All Posts" && <AllPosts />}
      {selectedSegment === "Contents Approval" && <ContentsApproval />}
      {selectedSegment === "Featured Post Management" && <FeaturedPost />}
      {selectedSegment === "Comments Management" && <CommentsManagement />}
      {selectedSegment === "Category Management" && <CategoryManagement />}
    </div>
  );
};

export default ContentManagement;