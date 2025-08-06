import { useState } from "react";
import { Link } from "react-router-dom";
import { Segmented, Button } from "antd";

import arrowLeft from "../assets/arrow-left.png";
import user_img_dark from "../assets/user_img_dark.png";
import user_img_2 from "../assets/user_img_2.png";

const ActivityLog = () => { 
  const [selectedSegment, setSelectedSegment] = useState("Post Submission");

  const activityLogs = {
    "Post Submission": [
      {
        id: 1,
        img: user_img_dark,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 2,
        img: user_img_dark,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 3,
        img: user_img_dark,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 4,
        img: user_img_dark,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 5,
        img: user_img_dark,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
    ],
    Collaborations: [
      {
        id: 1,
        img: user_img_dark,
        img_2: user_img_2,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 2,
        img: user_img_dark,
        img_2: user_img_2,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 3,
        img: user_img_dark,
        img_2: user_img_2,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 4,
        img: user_img_dark,
        img_2: user_img_2,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
      {
        id: 5,
        img: user_img_dark,
        img_2: user_img_2,
        activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
        post: "View Post",
        date: "12:56 PM | 01-09-2024 ",
      },
    ],
    Comments: [
      {
        id: 1,
        img: user_img_dark,
        title: "Comment on Mark Richmond’s Post",
        post: "View full details",
        activity:
          "This is really insightful and impressive, we keep learning everyday and keep up the great work. Thanks.",
        date: "2024-10-19",
      },
      {
        id: 2,
        img: user_img_dark,
        title: "Comment on Mark Richmond’s Post",
        post: "View full details",
        activity:
          "This is really insightful and impressive, we keep learning everyday and keep up the great work. Thanks.",
        date: "2024-10-19",
      },
      {
        id: 3,
        img: user_img_dark,
        title: "Comment on Mark Richmond’s Post",
        post: "View full details",
        activity:
          "This is really insightful and impressive, we keep learning everyday and keep up the great work. Thanks.",
        date: "2024-10-19",
      },
      {
        id: 4,
        img: user_img_dark,
        title: "Comment on Mark Richmond’s Post",
        post: "View full details",
        activity:
          "This is really insightful and impressive, we keep learning everyday and keep up the great work. Thanks.",
        date: "2024-10-19",
      },
      {
        id: 5,
        img: user_img_dark,
        title: "Comment on Mark Richmond’s Post",
        post: "View full details",
        activity:
          "This is really insightful and impressive, we keep learning everyday and keep up the great work. Thanks.",
        date: "2024-10-19",
      },
    ],
  };

  return (
    <div>
      <Link
        to="/user-management"
        className="flex gap-2 w-20 hover:!text-black items-center"
      >
        <img src={arrowLeft} alt="Back" className="w-4" /> Back
      </Link>

      <div className="bg-white rounded-md p-3 mt-5 relative">
        <h1 className="text-lg font-semibold absolute top-5">Activity Logs</h1>

        <div className="flex justify-end mt-2">
          <Segmented
            defaultValue="Post Submission"
            className="mb-4 w-[400px]"
            options={["Post Submission", "Collaborations", "Comments"]}
            onChange={(value) => setSelectedSegment(value)}
          />
        </div>

        <div className="mt-4 pb-4">
          {/* Map through the activities array based on the selected segment */}
          {activityLogs[selectedSegment].map((log) => (
            <div
              key={log.id}
              className={`${
                selectedSegment === "Collaborations"
                  ? "gap-0 p-2 pb-10 border-b border-gray-200 flex items-center"
                  : "p-2 pb-10 border-b border-gray-200 flex gap-3 items-center"
              }`}
            >
              {log.img && (
                <img
                  src={log.img}
                  alt="User"
                  className={`${selectedSegment === "Comments" ? "w-10 h-10 rounded-full relative -top-10" : "w-10 h-10 rounded-full "}`}

                />
              )}
              {log.img_2 && (
                <img
                  src={log.img_2}
                  alt="User"
                  className="w-10 h-10 rounded-full relative right-4"
                />
              )}
              <div className="flex justify-between w-full">
                <div>
                  {selectedSegment === "Comments" ? (
                    <p className="font-semibold">{log.title}</p>
                  ) : (
                    <p className="font-semibold">{log.activity}</p>
                  )}

                  {log.post && (
                    <p className="text-[#B475CC] hover:underline cursor-pointer text-xs mt-2">
                      {log.post}
                    </p>
                  )}

                  {selectedSegment === "Comments" ? (
                    <div className="bg-[#F6F6F6] p-2 mt-2 rounded-md w-80">
                      <p>{log.activity}</p>
                    </div>
                  ) : null}

                  <span className="text-[.7rem] text-gray-500 absolute left-3 mt-2">
                    {log.date}
                  </span>
                </div>
                <div className="flex gap-5">
                  <Button className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-[black] outline-none border-none">
                  {selectedSegment === "Comments" ? "Flag Comment" : "Delet Post"}
                  </Button>
                  <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
                    {selectedSegment === "Comments" ? "Delete Comment" : "Delet Post"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
