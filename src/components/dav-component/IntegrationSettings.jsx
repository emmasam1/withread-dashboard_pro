import { useState } from 'react'
import twitter from '../../assets/icons8-twitter-50.png'
import facebook from '../../assets/icons8-facebook-48.png'
import slack from '../../assets/icons8-slack-48.png'
import google from '../../assets/icons8-google-48.png'
import analytics from '../../assets/icons8-analytics-48.png'


const IntegrationSettings = () => {
  const [xmod, setXmod] = useState(true);
  const handleXmod = (off) => {
    setXmod(off === 'on');
  };
  const [faceBookmod, setFaceBookmod] = useState(true);
  const handlesetFaceBookmod = (off) => {
    setFaceBookmod(off === 'on');
  };
  const [slackmod, setSlackmod] = useState(true);
  const handleSlackmod = (off) => {
    setSlackmod(off === 'on');
  };
  const [googlemod, setGooglemod] = useState(true);
  const handleGooglemod = (off) => {
    setGooglemod(off === 'on');
  };
  return (
    <div>
      <h1 className='text-lg font-semibold'>Social Media Integration</h1>
      <div className="flex justify-between place-items-center my-4">
        <div className="img flex place-items-center">
          <img className='' src={twitter} alt="twittter" />
          <span>
            <h1 className='text-xl my-2'>Twitter X <a href="#" className='font-normal
         text-lg underline text-[#333333B2]'>x.com</a></h1>
            <p className='text-[#272727b2]'>Build custom automations and integration with other apps.</p>
          </span>
        </div>
        <div className="btn">
          <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${xmod ? 'active' : ''}`}
              onClick={() => handleXmod('on')}
              aria-pressed={xmod}
            >
              <span>on</span>
            </button>
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!xmod ? 'active' : ''}`}
              onClick={() => handleXmod('off')}
              aria-pressed={!xmod}
            >
              <span>off</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between place-items-center">
        <div className="img flex place-items-center">
          <img src={facebook} alt="logo" />
          <span>
            <h1 className='text-xl my-2'>Facebook <a href="#" className='font-normal
         text-lg underline text-[#333333B2]'>facebook.com</a></h1>
            <p className='text-[#272727b2]'>Build custom automations and integration with other apps.</p>
          </span>
        </div>
        <div className="btn">
          <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${faceBookmod ? 'active' : ''}`}
              onClick={() => handlesetFaceBookmod('on')}
              aria-pressed={faceBookmod}
            >
              <span>on</span>
            </button>
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!faceBookmod ? 'active' : ''}`}
              onClick={() => handlesetFaceBookmod('off')}
              aria-pressed={!faceBookmod}
            >
              <span>off</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between place-items-center my-4">
        <div className="img flex place-items-center">
          <img src={slack} alt="logo" />
          <span>
            <h1 className='text-xl my-2'>Slack <a href="#" className='font-normal
         text-lg underline text-[#333333B2]'>Slack.com</a></h1>
            <p className='text-[#272727b2]'>Build custom automations and integration with other apps.</p>
          </span>
        </div>
        <div className="btn">
          <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${slackmod ? 'active' : ''}`}
              onClick={() => handleSlackmod('on')}
              aria-pressed={slackmod}
            >
              <span>on</span>
            </button>
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!slackmod ? 'active' : ''}`}
              onClick={() => handleSlackmod('off')}
              aria-pressed={!slackmod}
            >
              <span>off</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between place-items-center">
        <div className="img flex place-items-center">
          <img src={google} alt="logo" />
          <span>
            <h1 className='text-xl my-2'>Google <a href="#" className='font-normal
         text-lg underline text-[#333333B2]'>google.com</a></h1>
            <p className='text-[#272727b2]'>Build custom automations and integration with other apps.</p>
          </span>
        </div>
        <div className="btn">
          <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-l-full px-4 py-2 ${googlemod ? 'active' : ''}`}
              onClick={() => handleGooglemod('on')}
              aria-pressed={googlemod}
            >
              <span>on</span>
            </button>
            <button
              className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-gray-950 focus:text-gray-950 rounded-r-full px-4 py-2 ${!googlemod ? 'active' : ''}`}
              onClick={() => handleGooglemod('off')}
              aria-pressed={!googlemod}
            >
              <span>off</span>
            </button>
          </div>
        </div>
      </div>
      <h1 className='text-lg font-semibold my-4'>Third-Party Services</h1>
      <div className="flex justify-between place-items-center">
        <div className="img flex place-items-center">
          <img src={analytics} alt="logo" />
          <span>
            <h1 className='text-xl my-2'>Google Analytics</h1>
            <p className='text-[#272727b2]'>version 3.12</p>
          </span>
        </div>
        <div className="btn">
         <button  className=' bg-[#f1f1f2] rounded-full py-2 px-6 mr-2 border-black'>Configure</button>
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
         <button  className=' bg-[#f1f1f2] rounded-full py-2 px-6 mr-2 border-black'>Configure</button>
         <button className='bg-[#0a0e16] text-white rounded-full py-2 px-4 mr-2'>Activate Plugin</button>
        </div>
      </div>
    </div>
  )
}

export default IntegrationSettings