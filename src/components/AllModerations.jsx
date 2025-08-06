import { useEffect, useState } from "react";
import { Segmented, Button, message, Skeleton } from "antd";
import verify from "../assets/verify.png";
import dot from "../assets/dot.png";
import info from "../assets/info-circle.png";
import { useApp } from "../context/AppContext";
import axios from "axios";
import ReusableModal from "./modal/ReusableModal";
import checked from "../assets/checked.png";
import messageIcon from "../assets/message.png";
import share from "../assets/share.png";
import img_placeholder from "../assets/imgplaceholder.jpg";

const AllModerations = () => {
  const [selectedSegment, setSelectedSegment] = useState("Flagged Posts");
  const [flagged, setFlagged] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();
  const { loading, setLoading, API_BASE_URL, token } = useApp();

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  };

  useEffect(() => {
    const getFlaggedPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/api/admin/reported-posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFlagged(res.data.reportedPosts || []);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        messageApi.error("Failed to load flagged posts");
      } finally {
        setLoading(false);
      }
    };

    getFlaggedPost();
  }, [API_BASE_URL, token]);

  const deletPost = async (id) => {
    if (!token) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/admin/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      messageApi.success("Post deleted successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
      messageApi.error("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-md p-3 mt-5 relative">
      {contextHolder}
      <h1 className="text-lg font-semibold absolute top-5">Moderations</h1>

      <div className="flex justify-end mt-2">
        <Segmented
          defaultValue="Flagged Posts"
          className="mb-4"
          options={["Flagged Posts", "Flagged Comments"]}
          onChange={(value) => setSelectedSegment(value)}
        />
      </div>

      {selectedSegment === "Flagged Posts" && (
        <>
          {loading ? (
            <div className="space-y-5 mt-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} active avatar paragraph={{ rows: 3 }} />
              ))}
            </div>
          ) : flagged.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No flagged posts found.
            </div>
          ) : (
            flagged.map((post) => (
              <div key={post?.post._id} className="border-b border-gray-200">
                <div className="flex justify-between mt-4">
                  <div className="flex gap-2">
                    {post?.post?.author?.avatar ? (
                      <img
                        src={post?.post.author.avatar}
                        alt="avatar"
                        className="rounded-full h-11 w-11 object-cover"
                      />
                    ) : (
                      <div className="rounded-full h-11 w-11 flex items-center justify-center bg-gray-200 text-gray-600 font-semibold uppercase text-lg">
                        {`${post?.post?.author?.firstName?.[0] || ""}${
                          post?.post?.author?.lastName?.[0] || ""
                        }`}
                      </div>
                    )}

                    <div className="flex gap-2 items-center -mt-6">
                      <h1 className="capitalize font-semibold">
                        {post?.post?.author?.firstName}{" "}
                        {post?.post?.author?.lastName}
                      </h1>
                      <img src={verify} alt="" className="w-4" />
                      <p className="font-semibold">
                        @{post?.post?.author?.username}
                      </p>
                      <img src={dot} alt="" className="w-1 h-1" />
                      <span className="text-xs text-gray-500">
                        {post?.reportedAt
                          ? `${new Date(
                              post.reportedAt
                            ).toLocaleDateString()} | ${new Date(
                              post.reportedAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          : "Unknown date"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-black outline-none border-none"
                      onClick={() => openEditModal(post)}
                    >
                      Review Post
                    </Button>
                    <Button className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-black outline-none border-none">
                      Warn User
                    </Button>
                    <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
                      Delete Post
                    </Button>
                  </div>
                </div>

                <p className="ml-14 -mt-5 font-semibold mb-2">
                  {post?.post?.title}
                </p>
                <div className="ml-14 text-gray-400 text-xs truncate mb-3">
                  {post?.post?.content?.slice(0, 180)}
                </div>
                <div className="ml-14 flex items-center gap-2 mb-3 bg-[#F3F3F4] rounded-full px-2 py-1 w-96">
                  <img src={info} alt="" className="w-4" />
                  <p className="text-xs">{post.reason}</p>
                </div>
              </div>
            ))
          )}

          {/* {flagged.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No flagged posts found.
            </div>
          ) : (
            flagged.map((post) => (
              <div key={post._id} className="border-b border-gray-200">
                <div className="flex justify-between mt-4">
                  <div className="flex gap-2">
                    <div className="rounded-full h-11 w-11">
                      <img
                        src={post?.post?.author?.avatar}
                        alt="avatar"
                        className="rounded-full h-11 w-11 object-cover"
                      />
                    </div>
                    <div className="flex gap-2 items-center -mt-6">
                      <p className="font-semibold">
                        @{post?.post?.author?.username}
                      </p>
                      <img src={verify} alt="" className="w-4" />
                      <img src={dot} alt="" className="w-1 h-1" />
                      <span className="text-xs text-gray-500">
                        {post?.reportedAt
                          ? `${new Date(
                              post.reportedAt
                            ).toLocaleDateString()} | ${new Date(
                              post.reportedAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          : "Unknown date"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-black outline-none border-none"
                      onClick={() => openEditModal(post)}
                    >
                      Review Post
                    </Button>
                    <Button className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-black outline-none border-none">
                      Warn User
                    </Button>
                    <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
                      Delete Post
                    </Button>
                  </div>
                </div>

                <p className="ml-14 -mt-5 font-semibold mb-2">
                  {post?.post?.title}
                </p>
                <div className="ml-14 text-gray-400 text-xs truncate mb-3">
                  {post?.post?.content?.slice(0, 180)}
                </div>
                <div className="ml-14 flex items-center gap-2 mb-3 bg-[#F3F3F4] rounded-full px-2 py-1 w-96">
                  <img src={info} alt="" className="w-4" />
                  <p className="text-xs">{post.reason}</p>
                </div>
              </div>
            ))
          )} */}
        </>
      )}

      <ReusableModal
        isOpen={isModalOpen}
        title="Review Post"
        content={
          <div className="rounded-md bg-[#F6F6F6] p-3">
            <div className="flex gap-3">
              {selectedPost?.post?.author?.avatar ? (
                <img
                  src={selectedPost?.post?.author.avatar}
                  alt="avatar"
                  className="rounded-full h-11 w-11 object-cover"
                />
              ) : (
                <div className="rounded-full h-11 w-11 flex items-center justify-center bg-gray-200 text-gray-600 font-semibold uppercase text-lg">
                  {`${selectedPost?.post?.author?.firstName?.[0] || ""}${
                    selectedPost?.post?.author?.lastName?.[0] || ""
                  }`}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold">
                    {selectedPost?.post?.author?.firstName}{" "}
                    {selectedPost?.post?.author?.lastName}
                  </h1>
                  <img src={verify} alt="verify" className="w-5 h-5" />
                  <p className="text-gray-500">
                    @{selectedPost?.post?.author?.username}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {selectedPost?.reportedAt
                    ? new Date(selectedPost.reportedAt).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>
            </div>
            {selectedPost?.post?.images ? (
              <div className="rounded-lg h-52 mt-3">
                <img
                  src={selectedPost?.post?.images[0]}
                  alt=""
                  className="rounded-lg h-52 object-cover w-full"
                />
              </div>
            ) : (
              <div className="rounded-lg h-52 mt-3">
                <img
                  src={img_placeholder}
                  alt=""
                  className="rounded-lg h-52 object-cover w-full"
                />
              </div>
            )}

            <h1 className="mt-2 font-semibold">{selectedPost?.post?.title}</h1>

            <p className="text-xs text-gray-500 mt-1">
              {selectedPost?.post?.content}
            </p>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={checked} alt="" className="w-4" />
                  <span className="text-gray-500 text-xs">
                    {formatNumber(selectedPost?.post?.likes?.length)} Likes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={messageIcon} alt="" className="w-6" />
                  <span className="text-gray-500 text-xs">
                    {formatNumber(selectedPost?.post?.comments?.length)}{" "}
                    Comments
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={share} alt="" className="w-4" />
                  <span className="text-gray-500 text-xs">
                    {formatNumber(selectedPost?.post?.shares?.length)} Shares
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-xs">
                  {formatNumber(
                    (selectedPost?.post?.likes?.length || 0) +
                      (selectedPost?.post?.comments?.length || 0) +
                      (selectedPost?.post?.shares?.length || 0)
                  )}{" "}
                  Total Impressions
                </span>
              </div>
            </div>
          </div>
        }
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
        footer={
          <div className="flex gap-4 flex-row-reverse">
            <Button
              loading={loading}
              onClick={() => deletPost(selectedPost?.post?._id)}
              className="!bg-black text-white hover:!text-white !border-0 rounded-full hover:!bg-black"
            >
              Delete Post
            </Button>
            <Button className="!bg-[#F3F3F4] text-black !border-0 hover:!text-black rounded-full hover:!bg-[#F3F3F4]">
              Warn Post
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default AllModerations;
