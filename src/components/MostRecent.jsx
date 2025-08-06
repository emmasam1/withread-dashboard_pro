import { useEffect, useState } from "react";
import { Button, Skeleton, Avatar, Pagination, Input, message, Modal } from "antd";
const { TextArea } = Input;
import verify from "../assets/verify.png";
import dot from "../assets/dot.png";
import { useApp } from "../context/AppContext";
import axios from "axios";
import ReusableModal from "./modal/ReusableModal";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const MostRecent = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 10;

  const [messageApi, contextHolder] = message.useMessage();

  const { loading, setLoading, API_BASE_URL, token } = useApp();

  const getInitials = (firstName = "", lastName = "") =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/post/all-posts?page=${page}&limit=${pageSize}`
      );
      setPosts(res.data.posts || []);
      setTotalPosts(res.data.total || 0);
    //   console.log(res.data)
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

    const showConfirm = (postId) => {
      confirm({
        title: "Do you want to delete this post?",
        icon: <ExclamationCircleFilled />,
        content: "This action is permanent and cannot be undone.",
        okText: "Yes, delete it",
        okType: "danger",
        cancelText: "Cancel",
        onOk() {
          deletePost(postId);
        },
        onCancel() {
          console.log("Delete cancelled");
        },
      });
    };

  // Delete post function
  const deletePost = async (postId) => {
    if (!token) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      messageApi.success("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      messageApi.error("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditPost = async () => {
    if (!selectedPost) return;
    try {
      await axios.put(`${API_BASE_URL}/api/admin/posts/${selectedPost._id}`, {
        content: editedContent,
      });
      fetchPosts();
      setIsModalOpen(false);
      setSelectedPost(null);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditedContent(post.content || "");
    setEditedTitle(post.title);
    setIsModalOpen(true);
  };

  return (
    <div className="p-2">
      {contextHolder}
      {loading
        ? Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-3 items-start border-b py-4 px-2 border-gray-200"
            >
              <Skeleton.Avatar active size="large" shape="circle" />
              <Skeleton active paragraph={{ rows: 2 }} className="w-full" />
            </div>
          ))
        : posts.map((post) => {
            const { firstName, lastName, avatar } = post.author || {};
            const initials = getInitials(firstName, lastName);

            return (
              <div
                key={post._id}
                className="p-2 pb-4 pt-3 border-b border-gray-200 flex gap-3 items-start"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mt-1 object-cover"
                  />
                ) : (
                  <Avatar
                    className="mt-1 bg-slate-300 font-semibold text-black"
                    size={40}
                  >
                    {initials}
                  </Avatar>
                )}

                <div className="flex justify-between w-full">
                  <div>
                    <div className="flex items-center gap-2 capitalize">
                      <p>{firstName}</p>
                      <p>{lastName}</p>
                      <img src={verify} alt="verified" className="w-4" />
                      <img src={dot} alt="dot" className="w-1 h-1" />
                      <span className="text-xs text-gray-500">
                        {new Date(post.createdAt)
                          .toLocaleString()
                          .replace(",", " |")}
                      </span>
                    </div>

                    <p className="font-semibold mt-1">{post.title}</p>

                    {post.content && (
                      <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                        {post.content}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="text-black bg-[#F3F3F4] rounded-full border-none hover:!bg-[#e4e4e4]"
                      onClick={() => openEditModal(post)}
                    >
                      Edit Post
                    </Button>
                    <Button
                      className="text-white hover:!text-white bg-black rounded-full border-none hover:!bg-black"
                      onClick={() => showConfirm(post?._id)}
                    >
                      Delete Post
                    </Button>
                  
                  </div>
                </div>
              </div>
            );
          })}

      {!loading && totalPosts > 0 && (
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

      <ReusableModal
        isOpen={isModalOpen}
        title="Edit Post"
        content={
          <div>
            <TextArea
              //   rows={3}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="!resize-none"
            />
            <TextArea
              rows={10}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="!resize-none mt-3"
            />
          </div>
        }
        onOk={handleEditPost}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
        okText="Save Changes"
        cancelText="Cancel"
      />
    </div>
  );
};

export default MostRecent;
