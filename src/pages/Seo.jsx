import { useState } from "react";

const Seo = () => {
  const [isGrid, setIsGrid] = useState(true);
  const handleToggle = (view) => {
    setIsGrid(view === 'grid');
  };
  return (
    <div className='bg-white  rounded-lg p-4'>
      <h1 className='font-semibold text-1xl leading-8 tracking-tighter '>Meta Tags</h1>
      <form action="">
        <div className="">
          <label className="block text-sm font-medium py-3">Title</label>
          <input type="text"
            className="w-full bg-[#f6f6f6] rounded-xl h-12 p-4 outline-none"
            placeholder="Name..." />
        </div>
        <div className="">
          <label className="block text-sm font-medium py-3">Description</label>
          <input type=""
            className="w-full bg-[#f6f6f6] rounded-xl h-12 p-6 pb-20 outline-none"
            placeholder="Description..." />
        </div>
        <div className="">
          <label className="block text-sm font-medium py-3">Keywords</label>
          <input type="text"
            className="w-full bg-[#f6f6f6] rounded-xl h-12 p-4 outline-none"
            placeholder="Tags..." />
        </div>
      </form>
      <div className="flex justify-between m-5">
        <h1 className='font-semibold text-1xl leading-8 tracking-tighter '>Sitemaps</h1>
        <button className="bg-[#0a0e16] text-white rounded-full px-4 py-2 ">Generate sitemaps</button>
      </div>
      <div className="">
        <label className="block text-sm font-medium py-3">Robots.txt</label>
        <input type="text"
          className="w-full bg-[#f6f6f6] rounded-xl h-12 p-4 outline-none"
          placeholder="https://site.example.com/robots.txt" />
      </div>
      <h1 className='font-semibold text-1xl leading-8 tracking-tighter '>Content Discovery</h1>
      <div className="flex justify-between m-5">
        <h1 className='font-semibold text-1xl leading-8 tracking-tighter '>Enable Trending Content</h1>


        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 ${isGrid ? 'active' : ''}`}
            onClick={() => handleToggle('grid')}
            aria-pressed={isGrid}
          >
            <span>on</span>
          </button>
          <button
            className={`inline-flex items-center transition-all duration-300 ease-in-out focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-4 py-2 ${!isGrid ? 'active' : ''}`}
            onClick={() => handleToggle('list')}
            aria-pressed={!isGrid}
          >
            <span>off</span>
          </button>
        </div>


      </div>
    </div>
  )
}

export default Seo