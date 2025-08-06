import { useState } from "react";
import { Button, Segmented, Modal, Input } from "antd";
import grendot from "../assets/green_dot.png";

const { TextArea } = Input;

const Community = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-md p-3 mt-5">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">General Community Guidelines</h1>
        <Button
          className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
          onClick={showModal}
        >
          Edit
        </Button>
      </div>
      <div className="border-b border-[#D0D0D033] pb-5">
        <li className="text-[#333333E5] mb-1">
          Respectful Communication: Encourage respectful and constructive
          discussions.
        </li>
        <li className="text-[#333333E5] mb-1">
          No Hate Speech: Prohibit discriminatory or hateful language.
        </li>
        <li className="text-[#333333E5] mb-1">
          No Spam: Prevent unsolicited or irrelevant content.
        </li>
        <li className="text-[#333333E5] mb-1">
          Copyright and Intellectual Property: Respect copyright laws and avoid
          plagiarism.
        </li>
        <li className="text-[#333333E5]">
          Copyright and Intellectual Property: Respect copyright laws and avoid
          plagiarism
        </li>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">Automatic Violation Detection</h1>
        <div className="flex justify-between">
          <p className="text-[#333333B2]">
            Enable automatic violation detection to help in making the platform
            a safe space
          </p>
          <Segmented
            className="-mt-3"
            options={[
              {
                label: (
                  <span className="flex items-center">
                    <img
                      src={grendot}
                      alt="Enable messaging"
                      className="mr-3 w-2"
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
          />
        </div>
      </div>
      <Modal
        title="Edit General Community Guidelines"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <h1 className="text-[#333333CC] text-sm font-semibold">
          Community Guidelines
        </h1>

        <TextArea
          rows={7}
          placeholder="Guidelines......"
          maxLength={6}
          className="bg-[#F6F6F6] hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none !resize-none mt-2"
        />
        <div className="flex justify-end mt-4">
          <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Community;
