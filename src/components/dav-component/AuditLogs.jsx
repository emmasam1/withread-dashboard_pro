import avater from '../../assets/user_img.png'
const AuditLogs = () => {
    return (
        <div>
            <h1 className='text-xl font-medium'>Login Attempts:</h1>
            <div className="relative overflow-x-auto rounded-lg border">
                <table className="w-full text-left font-light">
                    <thead className="dark:bg-[#A3A3A340] font-light">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium text-base">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-base">
                                Timestamp
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-base">
                                IP Address
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-base">
                                Result
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-white  font-normal">
                            <td className="px-6 py-4 flex place-items-center">
                                <img src={avater} className='pr-3' alt="" />
                                admin@mikel12
                            </td>
                            <td className="px-6 py-4">
                                2024-09-22 01:45:23
                            </td>
                            <td className="px-6 py-4">
                                192.168.1.100
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#F9F9FA] px-3 py-2 box-content rounded-full w-fit">
                                    <span className='bg-[#2AAA2A] px-2 mr-1 rounded-full'>
                                    </span>
                                    Successful
                                </div>
                            </td>
                        </tr>

                        <tr className="bg-white border-b dark:bg-white  font-normal">
                            <td className="px-6 py-4 flex place-items-center">
                                <img src={avater} className='pr-3' alt="" />
                                admin@mikel12
                            </td>
                            <td className="px-6 py-4">
                                2024-09-22 01:45:23
                            </td>
                            <td className="px-6 py-4">
                                192.168.1.100
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#F9F9FA] px-3 py-2 box-content rounded-full w-fit">
                                    <span className='bg-[#FF9064] px-2 mr-1 rounded-full'>
                                    </span>
                                    Fialed
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-white  font-normal">
                            <td className="px-6 py-4 flex place-items-center">
                                <img src={avater} className='pr-3' alt="" />
                                admin@mikel12
                            </td>
                            <td className="px-6 py-4">
                                2024-09-22 01:45:23
                            </td>
                            <td className="px-6 py-4">
                                192.168.1.100
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#F9F9FA] px-3 py-2 box-content rounded-full w-fit">
                                    <span className='bg-[#2AAA2A] px-2 mr-1 rounded-full'>
                                    </span>
                                    Successful
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-white  font-normal">
                            <td className="px-6 py-4 flex place-items-center">
                                <img src={avater} className='pr-3' alt="" />
                                admin@mikel12
                            </td>
                            <td className="px-6 py-4">
                                2024-09-22 01:45:23
                            </td>
                            <td className="px-6 py-4">
                                192.168.1.100
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#F9F9FA] px-3 py-2 box-content rounded-full w-fit">
                                    <span className='bg-[#FF9064] px-2 mr-1 rounded-full'>
                                    </span>
                                    Failed
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-white  font-normal">
                            <td className="px-6 py-4 flex place-items-center">
                                <img src={avater} className='pr-3' alt="" />
                                admin@mikel12
                            </td>
                            <td className="px-6 py-4">
                                2024-09-22 01:45:23
                            </td>
                            <td className="px-6 py-4">
                                192.168.1.100
                            </td>
                            <td className="px-6 py-4">
                                <div className="bg-[#F9F9FA] px-3 py-2 box-content rounded-full w-fit">
                                    <span className='bg-[#2AAA2A] px-2 mr-1 rounded-full'>
                                    </span>
                                    Successful
                                </div>
                            </td>
                        </tr>
                        

                    </tbody>
                </table>
            </div>


            <h1 className='text-xl font-medium mt-10'>Site Configuration Changes:</h1>
            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-left font-light">
                    <thead className="dark:bg-[#A3A3A340] font-light border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium text-base">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-base">
                                Timestamp
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium text-base">
                                Change
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-white  font-normal">
                            <td className="px-6 py-4 flex place-items-center">
                                <img src={avater} className='pr-3' alt="" />
                                admin@mikel12
                            </td>
                            <td className="px-6 py-4">
                                2024-09-22 01:45:23
                            </td>
                            <td className="px-6 py-4">
                                192.168.1.100
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuditLogs