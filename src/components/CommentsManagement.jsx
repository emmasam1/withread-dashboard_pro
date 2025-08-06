import { Segmented, Button } from "antd";

import verify from "../assets/verify.png";
import user_img_dark from "../assets/user_img_dark.png";
import dot from "../assets/dot.png";
import message from "../assets/message.png";

const CommentsManagement = () => {
  const data = [
    {
      id: 1,
      img: user_img_dark,
      owner: "Ramsey Gary",
      activity:
        "Making The Tech Ecosystem A Safe Space To Grow, Learn and Connect",
      post: "View Post",
      date: "12:56 PM | 01-09-2024 ",
      like: "50k Likes",
      comment: "3k Comments",
      share: "1.3k Shares",
      impression: "300k Total Impressions",
    },
    {
      id: 2,
      img: user_img_dark,
      owner: "Ramsey Gary",
      activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
      post: "View Post",
      date: "12:56 PM | 01-09-2024 ",
      like: "50k Likes",
      comment: "3k Comments",
      share: "1.3k Shares",
      impression: "300k Total Impressions",
    },
    {
      id: 3,
      img: user_img_dark,
      owner: "Ramsey Gary",
      activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
      post: "View Post",
      date: "12:56 PM | 01-09-2024 ",
      like: "50k Likes",
      comment: "3k Comments",
      share: "1.3k Shares",
      impression: "300k Total Impressions",
    },
    {
      id: 4,
      img: user_img_dark,
      owner: "Ramsey Gary",
      activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
      post: "View Post",
      date: "12:56 PM | 01-09-2024 ",
      like: "50k Likes",
      comment: "3k Comments",
      share: "1.3k Shares",
      impression: "300k Total Impressions",
    },
    {
      id: 5,
      img: user_img_dark,
      owner: "Ramsey Gary",
      activity: "Submitted a post | Making Tech Ecosystem A Safe Space",
      post: "View Post",
      date: "12:56 PM | 01-09-2024 ",
      like: "50k Likes",
      comment: "3k Comments",
      share: "1.3k Shares",
      impression: "300k Total Impressions",
    },
  ];

  return (
    <div>
      <div className="bg-white rounded-md p-3 mt-5 relative">
        <h1 className="text-lg font-semibold absolute top-5">
          Comments Management
        </h1>

        <div className="flex justify-end mt-2">
          <div className="flex justify-end gap-3">
            <Segmented
              defaultValue="All comments"
              className="mb-4"
              options={["All comments", "Flagged Comments"]}
              onChange={(value) => setSelectedSegment(value)}
            />
            <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none h-9">
              Delete All Spam
            </Button>
          </div>
        </div>

        <div className="mt-4 pb-4">
          {data.map((e) => {
            return (
              <div className="border-b border-gray-200">
                <div className="flex justify-between mt-4">
                  <div className="flex gap-2">
                    <img
                      src={message}
                      alt=""
                      className="rounded-full h-10 w-10"
                    />
                    <div className="">
                      <p className="font-semibold">
                        @Parkermann12 Comment on @williambull00’s Post
                      </p>
                    </div>
                  </div>

                  <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
                    Delete Comment
                  </Button>
                </div>

                <p className="ml-14 mb-2">View full details</p>

                <div className="bg-[#F6F6F6] border-[#B475CC1A] ml-14 p-4 w-80 rounded-md mb-3">
                  <p>
                    This is really insightful and impressive, we keep learning
                    everyday and keep up the great work. Thanks.
                  </p>
                </div>

                <div className="flex gap-2 items-center ml-14 mb-3">
                  <p className="text-xs text-gray-400">{e.like}</p>
                  <img src={dot} alt="" />
                  <p className="text-xs text-gray-400">{e.impression}</p>
                  <p className="text-xs text-gray-400">{e.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentsManagement;
