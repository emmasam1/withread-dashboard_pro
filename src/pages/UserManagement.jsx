import { useEffect, useState } from "react";
import { Button, Input, Table, Skeleton, Avatar } from "antd";
import arrowDown from "../assets/arrow-down.png";
import search from "../assets/search-normal.png";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import verify from "../assets/verify.png";
import axios from "axios";

const UserManagement = () => {
  const { loading, setLoading, API_BASE_URL, token } = useApp();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formatted = res.data?.users?.map((user, index) => ({
        key: user._id,
        fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
        username: user.username ?? "",
        email: user.email ?? "",
        country: user.country ?? "—",
        date_joined: new Date(user.createdAt).toLocaleDateString(),
        status: user.isVerified ? "Verified" : "Not Verified",
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        original: user,
      }));
      setUsers(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    getUsers();
  }, [token]);

  const getInitials = (firstName, lastName) => {
    return `${(firstName?.[0] || "").toUpperCase()}${(
      lastName?.[0] || ""
    ).toUpperCase()}`;
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "User",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          {record.avatar ? (
            <Avatar src={record.avatar} />
          ) : (
            <Avatar className="bg-slate-300 font-semibold text-black">
              {getInitials(record.firstName, record.lastName)}
            </Avatar>
          )}
          <span>{record.fullName}</span>
        </div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date Joined",
      dataIndex: "date_joined",
      key: "date_joined",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div className="flex items-center">
          {status === "Verified" ? (
            <>
              <img src={verify} alt="Verified" className="w-4 h-4 mr-2" />
              Verified
            </>
          ) : (
            "Not Verified"
          )}
        </div>
      ),
    },
    {
      title: "",
      render: (record) => (
        <Link
          to={`/user-details/${record.key}`}
          state={{ record: record.original }}
        >
          <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white">
            Details
          </Button>
        </Link>
      ),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-white rounded-md p-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">All Users</h1>
        <div className="flex gap-4 items-center">
          <div className="bg-[#F6F6F6] flex items-center rounded-full px-3 w-72">
            <img src={search} className="w-4 h-4" alt="search" />
            <Input
              placeholder="Search user..."
              onChange={(e) => setSearchText(e.target.value)}
              className="ml-2 bg-transparent border-none outline-none"
            />
          </div>
          <Button className="bg-black text-white rounded-full flex items-center h-9">
            Export as <img src={arrowDown} className="w-3 ml-2" alt="export" />
          </Button>
        </div>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Table
          dataSource={filteredUsers}
          columns={columns}
          size="small"
          pagination={{
            pageSize,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            position: ["bottomCenter"],
            className: "custom-pagination",
          }}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default UserManagement;
