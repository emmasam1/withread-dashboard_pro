import { useState } from "react";
import { Segmented } from "antd";
import ThemeManagement from "../components/dav-component/ThemeManagement";
import PluginManagement from "../components/dav-component/PluginManagement";
import APIAccess from "../components/dav-component/APIAccess";

const Customizations = () => {
  const [selectedSegment, setSelectedSegment] = useState("Theme Management");
  return (
    <div>
        
        <div className="bg-white rounded p-3">
        <div className="flex justify-center">
          <Segmented
            defaultValue="Theme Management"
            className=" bg-gray-200 m-3"
            options={[
              "Theme Management",
              "Plugin Management",
              "API Access",
            ]}
            onChange={(value) => setSelectedSegment(value)}
          />
        </div>
        {selectedSegment === "Theme Management" && <ThemeManagement />}
        {selectedSegment === "Plugin Management" && <PluginManagement />}
        {selectedSegment === "API Access" && <APIAccess />}

      </div>
    </div>
  )
}

export default Customizations