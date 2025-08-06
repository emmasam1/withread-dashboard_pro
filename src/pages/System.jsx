import { useState } from "react";
import { Segmented } from "antd";
import GeneralSettings from '../components/dav-component/GeneralSettings';
import SecuritySettings2 from '../components/dav-component/SecuritySettings2';
import IntegrationSettings from '../components/dav-component/IntegrationSettings';
const System = () => {
  const [selectedSegment, setSelectedSegment] = useState("General Settings");
  return (
    <div>
      <div className="bg-white rounded p-3">
        <div className="flex justify-center">
          <Segmented
            defaultValue="General Settings"
            className=" bg-gray-200 m-3 "
            options={[
              "General Settings",
              "Security Settings",
              "Integration Settings",
            ]}
            onChange={(value) => setSelectedSegment(value)}
          />
        </div>
        {selectedSegment === "General Settings" && <GeneralSettings />}
        {selectedSegment === "Security Settings" && <SecuritySettings2 />}
        {selectedSegment === "Integration Settings" && <IntegrationSettings />}

      </div>
    </div>
  )
}

export default System