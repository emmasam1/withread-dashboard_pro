import { useState } from "react";
import { Button, Modal, Input } from "antd";

const { TextArea } = Input;
const SecuritySettings = () => {
  const [isOn, setIsOn] = useState(true);
  const handleSwicth = (off) => {
    setIsOn(off === 'on');
  };

  const [isHard, setIsHard] = useState(true);
  const handleEasy = (easy) => {
    setIsHard(easy === 'hard');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputClass = "bg-[#F6F6F6] hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between my-3">
        <h1 className='font-semibold text-xl leading-8 tracking-tighter '>Firewalls Rules</h1>
        <button className="bg-[#0a0e16] text-white rounded-full px-4 py-2 ">Configure</button>
      </div>
      <div className="bg-gray-200 rounded-lg border-2 border-gray-300 p-5">
        <ul className="">
          <li>Deny all traffic</li>
          <li> Allow TCP from any IP address to any IP address on port 80</li>
          <li>Allow TCP from any IP address to any IP address on port 80 (HTTP)</li>
          <li>Allow TCP from any IP address to any IP address on port 443 (HTTPS)</li>
          <li>Allow ICMP (ping) from any IP address to any IP address</li>
        </ul>
      </div>
      <div className="flex justify-between m-5">
        <h1 className='font-semibold text-xl leading-8 tracking-tighter '>CAPTCHA</h1>
        <button className="bg-[#0a0e16] text-white rounded-full px-4 py-2 ">Configure</button>
      </div>

      <div className="flex justify-between ">
        <h1 className='font-semibold leading-8 tracking-tighter'>Enable or disable CAPTCHA to prevent automated spam</h1>
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${isOn ? 'active' : ''}`}
            onClick={() => handleSwicth('on')}
            aria-pressed={isOn}
          >
            <span>on</span>
          </button>
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!isOn ? 'active' : ''}`}
            onClick={() => handleSwicth('off')}
            aria-pressed={!isOn}
          >
            <span>off</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <h1 className='font-semibold leading-8 tracking-tighter'>
          Set CAPTCHA difficulty level
        </h1>
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-black focus:text-black rounded-l-full px-4 py-2 ${isHard ? 'active' : ''}`}
            onClick={() => handleEasy('hard')}
            aria-pressed={isHard}
          >
            <span>Hard</span>
          </button>
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none  hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!isHard ? 'active' : ''}`}
            onClick={() => handleEasy('easy')}
            aria-pressed={!isHard}
          >
            <span>Easy</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between my-3">
        <h1 className='font-semibold text-xl leading-8 tracking-tighter '>Roles-Based Access Control (RBAC)</h1>
        <button onClick={showModal}
         className="bg-[#0a0e16] text-white rounded-full px-4 py-2 ">Edit RBAC</button>
      <Modal title="Edit Role_Based Access Control (RBAC)" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <p className="text-sm font-semibold mt-4">Admin Roles</p>
        <TextArea rows={3} placeholder="Set roles" maxLength={200} className={`${inputClass} !resize-none`} />
        <p className="text-sm font-semibold mt-4">Moderator Roles</p>
        <TextArea rows={3} placeholder="Set roles" maxLength={200} className={`${inputClass} !resize-none`} />
        <p className="text-sm font-semibold mt-4">User Roles</p>
        <TextArea rows={3} placeholder="Set roles" maxLength={200} className={`${inputClass} !resize-none`} />

        <div className="flex justify-end mt-4">
          <Button className="text-white bg-[#0a0e16] rounded-full hover:!bg-black px-7 py-5 outline-none">
            Submit
          </Button>
        </div>
      </Modal>
      </div>
      <p>Roles:</p>
      <ul className="list-disc ml-7 p-1 leading-6">
        <li>Admin: Has full control over the platform, including managing users, settings, and content.</li>
        <li> Moderator: Can moderate content, approve or reject posts, and handle user reports.</li>
        <li>User: Can create posts, comments, and interact with other users.
        </li>
      </ul>
      <p>Permissions:</p>
      {/* <ul className="list-disc ml-7 p-1 leading-6">
        <li>Admin: Has full control over the platform, including managing users, settings, and content.</li>
        <li> Moderator: Can moderate content, approve or reject posts, and handle user reports.</li>
        <li>User: Can create posts, comments, and interact with other users.
        </li>
      </ul> */}

    </div>


  )
}

export default SecuritySettings