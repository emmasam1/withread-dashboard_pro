import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MostRecent from "./MostRecent";
import Flagged from "./Flagged";

const AllPosts = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [text, setText] = useState("All Posts");

  const tabs = [
    { key: "1", label: "Most Recent", content: <MostRecent /> },
    { key: "2", label: "Flagged", content: <Flagged /> },
    { key: "3", label: "Top Rated", content: '<SavedPost /> '},
  ];

  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  useEffect(() => {
    switch (activeTab) {
      case "1":
        setText("All Posts");
        break;
      case "2":
        setText("Flagged Posts");
        break;
      case "3":
        setText("Top Rated Posts");
        break;
      default:
        setText("All Posts");
    }
  }, [activeTab]);

  return (
    <div>
      <div className="bg-white rounded-md p-3 mt-5 relative">
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-lg font-semibold">{text}</h1>
          <div className="relative bg-gray-100 rounded-full h-10 w-full max-w-xl overflow-hidden flex">
            {/* Animated Pill */}
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="absolute top-1 h-8 bg-white rounded-full shadow"
              style={{
                width: `${100 / tabs.length}%`,
                left: `calc(${activeIndex} * (100% / ${tabs.length}))`,
              }}
            />
            {/* Tab Buttons */}
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 z-10 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab.key ? "text-black" : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">{tabs.find((tab) => tab.key === activeTab)?.content}</div>
      </div>
    </div>
  );
};

export default AllPosts;
