import analytics from '../../assets/icons8-analytics-48.png'
import { useState } from "react";
import { Button, Modal, Input } from "antd";

const PluginManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputClass = "bg-[#cdcdcd] py-3 hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none";
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2 mt-4 float-end relative'>Install New Plugin</button>
            <div className="flex justify-between place-items-center mt-16 ">
                <div className="img flex place-items-center">
                    <img src={analytics} alt="logo" />
                    <span>
                        <h1 className='text-xl my-2'>Custom Captcha</h1>
                        <p className='text-[#272727b2]'>version 2.34</p>
                    </span>
                </div>
                <div className="btn">
                    <button className=' bg-[#f1f1f2] rounded-full py-2 px-6 mr-2 border-black' onClick={showModal}>Configure</button>
                    <button className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2'>Activate Plugin</button>
                    <Modal title="Configure Recaptcha 2.0" className="mt-28" open={isModalOpen} footer={null} onCancel={handleCancel}>
                        <p className="text-sm font-semibold mt-4">Site Key</p>
                        <Input rows={3}  maxLength={200} className={`${inputClass} !resize-none`} />
                        <p className="text-sm font-semibold mt-4">Secret Key</p>
                        <Input rows={3} maxLength={200} className={`${inputClass} !resize-none`} />
                        <div className="flex justify-end mt-4">
                            <Button className="text-white bg-[#0a0e16] rounded-full hover:!bg-black px-7 py-5 outline-none">
                                Submit
                            </Button>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="flex justify-between place-items-center">
                <div className="img flex place-items-center">
                    <img src={analytics} alt="logo" />
                    <span>
                        <h1 className='text-xl my-2'>Google Analytics</h1>
                        <p className='text-[#272727b2]'>version 3.12</p>
                    </span>
                </div>
                <div className="btn">
                    <button className=' bg-[#f1f1f2] rounded-full py-2 px-6 mr-2 border-black'>Configure</button>
                    <button className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2'>Activate Plugin</button>
                </div>
            </div>
            <div className="flex justify-between place-items-center">
                <div className="img flex place-items-center">
                    <img src={analytics} alt="logo" />
                    <span>
                        <h1 className='text-xl my-2'>Google Analytics</h1>
                        <p className='text-[#272727b2]'>version 3.12</p>
                    </span>
                </div>
                <div className="btn">
                    <button className=' bg-[#f1f1f2] rounded-full py-2 px-6 mr-2 border-black'>Configure</button>
                    <button className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2'>Activate Plugin</button>
                </div>
            </div>
            <div className="flex justify-between place-items-center">
                <div className="img flex place-items-center">
                    <img src={analytics} alt="logo" />
                    <span>
                        <h1 className='text-xl my-2'>Google Analytics</h1>
                        <p className='text-[#272727b2]'>version 3.12</p>
                    </span>
                </div>
                <div className="btn">
                    <button className=' bg-[#f1f1f2] rounded-full py-2 px-6 mr-2 border-black'>Configure</button>
                    <button className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2'>Activate Plugin</button>
                </div>
            </div>
            <div className="flex justify-between place-items-center">
                <div className="img flex place-items-center">
                    <img src={analytics} alt="logo" />
                    <span>
                        <h1 className='text-xl my-2'>Google ReCaptcha 2</h1>
                        <p className='text-[#272727b2]'>version 2.34</p>
                    </span>
                </div>
                <div className="btn">
                    <button className=' bg-[#f1f1f2] rounded-full py-2 px-6 mr-2 border-black'>Configure</button>
                    <button className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2'>Activate Plugin</button>
                </div>
            </div>
        </>
    )
}

export default PluginManagement