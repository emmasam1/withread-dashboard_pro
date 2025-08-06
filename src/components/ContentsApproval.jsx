import { useState, useEffect } from "react";
import { Button, Skeleton, Avatar, Pagination, message } from "antd";
import axios from "axios";
import { useApp } from "../context/AppContext";
import dot from "../assets/dot.png";
import verify from "../assets/verify.png";

const ContentsApproval = () => {
  const { loading, setLoading, API_BASE_URL, token } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [localLoader, setLocalLoader] = useState(false);
  const [allPost, setAllPost] = useState(false);
  const pageSize = 10;

  const [messageApi, contextHolder] = message.useMessage();

  const getInitials = (firstName = "", lastName = "") =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/admin/posts/unapproved?page=${page}&limit=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(res.data.posts || []);
      setTotalPosts(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const approveAll = async () => {
    try {
      setAllPost(true);
      const res = await axios.put(
        `${API_BASE_URL}/api/admin/posts/approve-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      messageApi.success(res.data.message);
      fetchPosts(currentPage);
    } catch (error) {
      messageApi.error("Failed to approve posts");
    } finally {
      setAllPost(false);
    }
  };

  const approveOne = async (id) => {
    try {
      setLoadingPostId(id);
      setLocalLoader(true);
      const res = await axios.put(
        `${API_BASE_URL}/api/admin/posts/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      messageApi.success(res.data.message);
      fetchPosts(currentPage);
    } catch (error) {
      messageApi.error("Failed to approve post");
    } finally {
      setLocalLoader(false);
      setLoadingPostId(null);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {contextHolder}
      <div className="bg-white rounded-md p-4 mt-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Contents Approval</h1>
          <Button
            onClick={approveAll}
            loading={allPost}
            disabled={allPost || posts.length === 0} // ✅ Disable if loading OR no posts
            className={`text-white rounded-full outline-none ${
              posts.length === 0
                ? "!bg-gray-400 cursor-not-allowed hover:!bg-gray-400"
                : "bg-black hover:!bg-black hover:!text-white"
            }`}
          >
            Approve All Except Bots Posts
          </Button>
        </div>

        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="my-4">
              <Skeleton avatar paragraph={{ rows: 2 }} active />
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => {
            const { firstName, lastName, avatar } = post.author || {};
            const initials = getInitials(firstName, lastName);

            return (
              <div
                key={post._id}
                className="border-b border-gray-200 pb-4 mb-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="rounded-full h-11 w-11 object-cover"
                      />
                    ) : (
                      <Avatar
                        size={45}
                        className="bg-slate-300 font-semibold text-black"
                      >
                        {initials}
                      </Avatar>
                    )}
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold capitalize m-0">
                        {firstName} {lastName}
                      </p>
                      <img src={verify} alt="verify" className="w-4" />
                      <img src={dot} alt="dot" className="w-1 h-1" />
                      <p className="text-gray-400 text-xs m-0">
                        {new Date(post.createdAt)
                          .toLocaleString()
                          .replace(",", " |")}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => approveOne(post._id)}
                    loading={localLoader && loadingPostId === post._id}
                    className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
                  >
                    {post?.isApproved ? "Approved" : "Approve Post"}
                  </Button>
                </div>

                <p className="ml-14 font-semibold">{post.title}</p>
                <p className="ml-14 text-gray-400 text-sm truncate">
                  {post.content?.slice(0, 150)}...
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-400">
            All contents have been approved or no posts available.
          </div>
        )}

        {!loading && totalPosts > pageSize && (
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              total={totalPosts}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentsApproval;
