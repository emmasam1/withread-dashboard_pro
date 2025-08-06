import { useState } from "react";
import { Segmented } from "antd";
import SecuritySettings from "../components/dav-component/SecuritySettings";
import AuditLogs from "../components/dav-component/AuditLogs";
const Security = () => {
  const [selectedSegment, setSelectedSegment] = useState("Security Settings");
  return (
    <div className="bg-white rounded p-4">
    <div className="flex justify-center">
      <Segmented
        defaultValue="Security Settings"
        className=" bg-gray-200 py-1"
        options={[
          "Security Settings",
          "Audit Logs",
        ]}
        onChange={(value) => setSelectedSegment(value)}
      />
    </div>
    {selectedSegment === "Security Settings" && <SecuritySettings />}
    {selectedSegment === "Audit Logs" && <AuditLogs />}
  </div>
  )
}

export default Security