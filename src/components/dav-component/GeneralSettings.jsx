import { useState } from 'react';
import logo from '../../assets/logo.png'

const GeneralSettings = () => {
  const [isOn, setIsOn] = useState(true);
  const handleOpenReg = (off) => {
    setIsOn(off === 'on');
  };

  const [mod, setMod] = useState(true);
  const handleModreg = (off) => {
    setMod(off === 'on');
  };
  return (
    <>
      <div className="flex justify-between place-items-center">
    <div className="img flex place-items-center">
      <img className='bg-[#0A0E16] py-11 px-1 rounded-2xl mr-3' src={logo} alt="logo"/>
      <span>
        <h1 className='text-2xl my-2'>App's logo</h1>
      <p className='text-[#333333B2]'>PNG, JPEG under 10mb</p>
      </span>
    </div>
    <div className="btn">
      <button className=' bg-[#f1f1f2] rounded-full py-1 px-4 mr-2 border-black'>Delete picture</button>
      <button className='bg-[#0a0e16] text-white rounded-full py-1 px-4 mr-2'>Change Picture</button>
    </div>
      </div>
      <form action="">
          <label className="block text-lg font-semibold py-3">Site's Name</label>
          <input type="text"
            className="w-96 bg-[#f6f6f6] rounded-xl h-10 p-4 outline-none"
            placeholder="Withread" />
          <label className="block text-lg font-semibold py-3">Site's Description</label>
          <input type="text"
            className="w-full bg-[#f6f6f6] rounded-xl h-12 p-6 pb-20 outline-none"
            placeholder="Site's description..." />
      </form>
      
      <div className="my-4">
        <h1 className='text-lg font-bold'>User Registration</h1>
        <div className="flex justify-between ">
        <h1 className='font-semibold leading-8 tracking-tighter'>Open Registration</h1>
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${isOn ? 'active' : ''}`}
            onClick={() => handleOpenReg('on')}
            aria-pressed={isOn}
          >
            <span>on</span>
          </button>
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!isOn ? 'active' : ''}`}
            onClick={() => handleOpenReg('off')}
            aria-pressed={!isOn}
          >
            <span>off</span>
          </button>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <h1 className='font-semibold leading-8 tracking-tighter'>Modrated Registration</h1>
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${mod ? 'active' : ''}`}
            onClick={() => handleModreg('on')}
            aria-pressed={mod}
          >
            <span>on</span>
          </button>
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!mod ? 'active' : ''}`}
            onClick={() => handleModreg('off')}
            aria-pressed={!mod}
          >
            <span>off</span>
          </button>
        </div>
      </div>
      <h1 className='text-lg font-bold'>Email notification</h1>
      </div>
    </>
  )
}

export default GeneralSettings