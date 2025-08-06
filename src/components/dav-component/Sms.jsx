import { useState } from "react";
import { Button, Modal, Input } from "antd";



const Sms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputClass = "bg-[#F6F6F6] py-3 hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none";
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className='flex justify-between mt-10'>
        <p className='font-semibold'>IP Address Blocking</p>
        <Modal title="Block New IP Address" className="mt-28" open={isModalOpen} footer={null} onCancel={handleCancel}>
          <p className="text-sm font-semibold mt-4">IP Address</p>
          <Input rows={3} placeholder="Ip Address" maxLength={200} className={`${inputClass} !resize-none`} />
          <div className="flex justify-end mt-4">
            <Button className="text-white bg-[#0a0e16] rounded-full hover:!bg-black px-7 py-5 outline-none">
              Block
            </Button>
          </div>
        </Modal>
        <button onClick={showModal}
          className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2'>Add ip Address</button>
      </div>
      <div className="">
        <div className='flex justify-between m-2'>
          <p className=''>197.210.227.186</p>
          <button className='bg-[#0a0e16] text-white rounded-full py-1 px-4 mr-2'>Remove</button>
        </div>
        <div className='flex justify-between m-2'>
          <p className=''>197.210.227.186</p>
          <button className='bg-[#0a0e16] text-white rounded-full py-1 px-4 mr-2'>Remove</button>
        </div>
        <div className='flex justify-between m-2'>
          <p className=''>197.210.227.186</p>
          <button className='bg-[#0a0e16] text-white rounded-full py-1 px-4 mr-2'>Remove</button>
        </div>
        <div className='flex justify-between m-2'>
          <p className=''>197.210.227.186</p>
          <button className='bg-[#0a0e16] text-white rounded-full py-1 px-4 mr-2'>Remove</button>
        </div>

      </div>
    </>
  )
}

export default Sms