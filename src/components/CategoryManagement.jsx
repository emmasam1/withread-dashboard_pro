import React, { useState } from "react";
import { Button } from "antd";
import close from "../assets/close-circle.png";

const categories = [
  "Network Protocols", "Cybersecurity",
  "AR/VR", "Cloud Computing",
];

const CategoryManagement = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleSelection = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const handleDoneClick = () => {
    // Clear selected categories when "Done" is clicked
    setSelectedCategories([]);
  };

  return (
    <div className="bg-white rounded-md p-3 mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Category/Tag Management</h1>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleDoneClick}
            className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-[black] outline-none border-none"
          >
            {selectedCategories.length > 0 ? "Done" : "Edit Category"}
          </Button>
          <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
            Create New Category
          </Button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <Button
            key={index}
            className={`flex items-center gap-2 py-2 px-3 rounded-full hover:!bg-transparent hover:!text-black hover:!border-gray-200 ${
              selectedCategories.includes(category) ? "bg-gray-200" : ""
            }`}
            onClick={() => toggleSelection(category)}
          >
            {category}
            {selectedCategories.includes(category) && (
              <img src={close} alt="close icon" className="w-4 ml-2" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
