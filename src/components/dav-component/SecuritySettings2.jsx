import { useState } from 'react'
import { Segmented } from "antd";
import Sms from '../dav-component/Sms'
import AuthencicatorApp from '../dav-component/AuthencicatorApp'
const SecuritySettings2 = () => {
  const [mod, setMod] = useState(true);
  const handleReq = (off) => {
    setMod(off === 'on');
  };
  const [auth, setAuth] = useState(true);
  const handleAuth = (off) => {
    setAuth(off === 'on');
  };

  const [selectedSegment, setSelectedSegment] = useState("Sms");
  return (
    <div>
      <h1 className='text-lg font-bold'>Password Policy</h1>
      <div className="flex justify-between">
      <h1 className='font-semibold leading-8 tracking-tighter'>Set Up Minimum password length</h1>
      <input type="text"
            className="w-auto bg-[#f6f6f6] rounded-full h-10 pl-7 outline-none"
            placeholder="Atleast 8 Characters" />
      </div>

      <div className="flex justify-between my-3">
        <h1 className='font-semibold leading-8 tracking-tighter'>Require uppercase/lowercase letters, numbers, symbols</h1>
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${mod ? 'active' : ''}`}
            onClick={() => handleReq('on')}
            aria-pressed={mod}
          >
            <span>on</span>
          </button>
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!mod ? 'active' : ''}`}
            onClick={() => handleReq('off')}
            aria-pressed={!mod}
          >
            <span>off</span>
          </button>
        </div>
      </div>

      <h1 className='text-lg font-bold'>Two-Factor Authentication</h1>

      <div className="flex justify-between my-3">
        <h1 className='font-semibold leading-8 tracking-tighter'>Enable/Disable two-factor authentication</h1>
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${auth ? 'active' : ''}`}
            onClick={() => handleAuth('on')}
            aria-pressed={auth}
          >
            <span>on</span>
          </button>
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!auth ? 'active' : ''}`}
            onClick={() => handleAuth('off')}
            aria-pressed={!auth}
          >
            <span>off</span>
          </button>
        </div>
      </div>
      <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Choose authentication method</h1>
        <div className="bg-white rounded p-2">
          <Segmented
            defaultValue="Sms"
            className="bg-gray-200"
            options={["Sms", "Authenticator App"]}
            onChange={(value) => setSelectedSegment(value)}
          />
        </div>
      </div>
      <div className="mt-4">
        {selectedSegment === "Sms" && <Sms />}
        {selectedSegment === "Authenticator App" && <AuthencicatorApp />}
      </div>
    </div>
    </div>
  )
}

export default SecuritySettings2