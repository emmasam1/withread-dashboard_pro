import { useState, useEffect } from "react";
import { Segmented, Button, Skeleton, Pagination, message, Select } from "antd";
import verify from "../assets/verify.png";
import dot from "../assets/dot.png";
import { useApp } from "../context/AppContext";
import axios from "axios";
import ReusableModal from "./modal/ReusableModal";
import img_placeholder from "../assets/imgplaceholder.jpg";
import checked from "../assets/checked.png";
import messageIcon from "../assets/message.png";
import share from "../assets/share.png";

const FeaturedPost = () => {
  const { loading, setLoading, API_BASE_URL, token } = useApp();
  const [allFeatured, setAllFeatured] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState("Most Engaged");
  const [highlightingId, setHighlightingId] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const ranges = [
    { label: "10 - 30", value: "10-30" },
    { label: "31 - 50", value: "31-50" },
    { label: "51 - 100", value: "51-100" },
    { label: "101 - 200", value: "101-200" },
    { label: "201 - 500", value: "201-500" },
  ];

  const openEditModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // ✅ Fetch Featured Posts with optional range filter
  const getFeaturedPosts = async (page = 1, range = selectedRange) => {
    if (!token) return;
    try {
      setLoading(true);

      let url = `${API_BASE_URL}/api/admin/posts-by-impression?page=${page}`;
      if (range) {
        const [min, max] = range.split("-");
        url += `&min=${min}&max=${max}`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      setAllFeatured(res.data.posts || []);
      setCurrentPage(res.data.currentPage);
      setTotalPosts(res.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const markPostFeatured = async (id) => {
    if (!token) return;
    try {
      setHighlightingId(id);
      const res = await axios.patch(
        `${API_BASE_URL}/api/admin/posts/${id}/feature`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(res.data.message);
      await getFeaturedPosts(currentPage);
    } catch (error) {
      console.log(error);
      message.error("Failed to highlight post");
    } finally {
      setHighlightingId(null);
    }
  };

  useEffect(() => {
    getFeaturedPosts(currentPage);
  }, [token, API_BASE_URL, currentPage]);

  return (
    <div>
      {contextHolder}
      <div className="bg-white rounded-md p-3 mt-5 relative">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-semibold">Featured Posts Management</h1>

          {/* ✅ Impression Range Filter */}
          <Select
            placeholder="Filter by Impressions"
            style={{ width: 220 }}
            options={ranges}
            value={selectedRange}
            onChange={(value) => {
              setSelectedRange(value);
              setCurrentPage(1); // Reset to first page
              getFeaturedPosts(1, value);
            }}
          />

          <div>
            <Segmented
              defaultValue="Most Engaged"
              options={["Most Engaged", "Top-rated"]}
              onChange={(value) => setSelectedSegment(value)}
            />
          </div>
        </div>

        <div className="mt-5 pb-4">
          {/* ✅ Skeleton Loader */}
          {loading ? (
            <div className="space-y-5 mt-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} active avatar paragraph={{ rows: 3 }} />
              ))}
            </div>
          ) : (
            <>
              {/* ✅ Featured Posts */}
              {allFeatured.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  No featured posts found.
                </div>
              ) : (
                allFeatured.map((post) => (
                  <div
                    key={post._id}
                    className="border-b border-gray-200 pb-4 mb-4"
                  >
                    <div className="flex justify-between mt-4">
                      <div className="flex gap-2">
                        {post?.author?.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt="avatar"
                            className="rounded-full h-11 w-11 object-cover"
                          />
                        ) : (
                          <div className="rounded-full h-11 w-11 flex items-center justify-center bg-gray-200 text-gray-600 font-semibold uppercase text-lg">
                            {`${post?.author?.firstName?.[0] || ""}${
                              post?.author?.lastName?.[0] || ""
                            }`}
                          </div>
                        )}

                        <div className="flex gap-2 items-center -mt-6">
                          <p className="font-semibold capitalize ml-1">
                            {post.author.firstName} {post.author.lastName}
                          </p>
                          <img src={verify} alt="" className="w-4" />
                          <span className="text-xs text-gray-500">
                            {post?.createdAt
                              ? `${new Date(
                                  post.createdAt
                                ).toLocaleDateString()} | ${new Date(
                                  post.createdAt
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}`
                              : "Unknown date"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => openEditModal(post)}
                          className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-[black] outline-none border-none"
                        >
                          View Post
                        </Button>
                        <Button
                          loading={highlightingId === post._id}
                          disabled={post.isFeatured}
                          onClick={() => markPostFeatured(post?._id)}
                          className={`rounded-full outline-none ${
                            post.isFeatured
                              ? "!bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "text-white bg-black hover:!bg-black hover:!text-white"
                          }`}
                        >
                          {post.isFeatured ? "Highlighted" : "Highlight Post"}
                        </Button>
                      </div>
                    </div>
                    <p className="ml-14 -mt-5 font-semibold mb-2">
                      {post.title?.slice(0, 100)}
                    </p>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap ml-14 text-gray-400 text-xs mb-3">
                      {post.content}
                    </div>

                    <div className="flex gap-2 items-center ml-14 mb-3">
                      <p className="text-xs text-gray-400">
                        {post.likesCount} Likes
                      </p>
                      <img src={dot} alt="" />
                      <p className="text-xs text-gray-400">
                        {post.commentsCount} Comments
                      </p>
                      <img src={dot} alt="" />
                      <p className="text-xs text-gray-400">
                        {post.totalImpression} Impressions
                      </p>
                    </div>
                  </div>
                ))
              )}

              {/* ✅ Pagination */}
              {totalPosts > 10 && (
                <div className="flex justify-center mt-5">
                  <Pagination
                    current={currentPage}
                    pageSize={10}
                    total={totalPosts}
                    showSizeChanger={false}
                    onChange={(page) => {
                      setCurrentPage(page);
                      getFeaturedPosts(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        title="Review Post"
        content={
          <div className="rounded-md bg-[#F6F6F6] p-3">
            {/* Author Info */}
            <div className="flex gap-3">
              {selectedPost?.author?.avatar ? (
                <img
                  src={selectedPost.author.avatar}
                  alt="avatar"
                  className="rounded-full h-11 w-11 object-cover"
                />
              ) : (
                <div className="rounded-full h-11 w-11 flex items-center justify-center bg-gray-200 text-gray-600 font-semibold uppercase text-lg">
                  {`${selectedPost?.author?.firstName?.[0] || ""}${
                    selectedPost?.author?.lastName?.[0] || ""
                  }`}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold capitalize">
                    {selectedPost?.author?.firstName}{" "}
                    {selectedPost?.author?.lastName}
                  </h1>
                  <img src={verify} alt="verify" className="w-5 h-5" />
                  <p className="text-gray-500">
                    @{selectedPost?.author?.username}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {selectedPost?.createdAt
                    ? new Date(selectedPost.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>
            </div>

            {/* Post Image */}
            {selectedPost?.images && selectedPost.images.length > 0 ? (
              <div className="rounded-lg h-52 mt-3">
                <img
                  src={selectedPost.images[0]}
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

            {/* Post Title & Content */}
            <h1 className="mt-2 font-semibold">{selectedPost?.title}</h1>
            <p className="text-xs text-gray-500 mt-1">
              {selectedPost?.content}
            </p>

            {/* Stats */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={checked} alt="" className="w-4" />
                  <span className="text-gray-500 text-xs">
                    {selectedPost?.likesCount} Likes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={messageIcon} alt="" className="w-6" />
                  <span className="text-gray-500 text-xs">
                    {selectedPost?.commentsCount} Comments
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={share} alt="" className="w-4" />
                  <span className="text-gray-500 text-xs">
                    {selectedPost?.shares?.length || 0} Shares
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-xs">
                  {selectedPost?.totalImpression} Total Impressions
                </span>
              </div>
            </div>
          </div>
        }
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
        // footer={
        //   <div className="flex gap-4 flex-row-reverse">
        //     <Button
        //       loading={loading}
        //       onClick={() => deletPost(selectedPost?._id)}
        //       className="!bg-black text-white hover:!text-white !border-0 rounded-full hover:!bg-black"
        //     >
        //       Delete Post
        //     </Button>
        //     <Button className="!bg-[#F3F3F4] text-black !border-0 hover:!text-black rounded-full hover:!bg-[#F3F3F4]">
        //       Warn Post
        //     </Button>
        //   </div>
        // }
      />
    </div>
  );
};

export default FeaturedPost;
