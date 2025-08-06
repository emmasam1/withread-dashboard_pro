import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

import arrowLeft from "../assets/arrow-left.png";
import followers from "../assets/followers.png";
import following from "../assets/following.png";
import community from "../assets/community.png";
import arrowRight from "../assets/arrow-right.png";
import info from "../assets/info-circle.png";
import personCheck1 from "../assets/person-check1.png";

import { useApp } from "../context/AppContext";

const { TextArea } = Input;

const SingleUser = () => {
  const location = useLocation();
  const { userId } = useParams();
  const { state } = location;
  const { loading, setLoading, API_BASE_URL, token } = useApp();

  const [userRecord, setUserRecord] = useState(state?.record || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [reactivateConfirmOpen, setReactivateConfirmOpen] = useState(false);
  const [form] = Form.useForm();

  // console.log(userId)

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Fetched user:", res.data.user); // ✅ proper log
      setUserRecord(res.data.user);
      form.setFieldsValue(res.data);
    } catch (err) {
      message.error("Failed to load user");
    }
  };

  fetchUser();
}, [userId, API_BASE_URL, token, form]); 



  useEffect(() => {
    if (!userRecord) {

    } else {
      form.setFieldsValue({
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
        email: userRecord.email,
      });
    }
 
  }, [userRecord?._id]);

  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num;
  };

  const showSuspendModal = () => {
    setIsModalOpen(true);
  };

  const handleSuspendCancel = () => {
    setIsModalOpen(false);
    form.resetFields(["reason"]);
  };

  const suspendAccount = async () => {
    try {
      const values = await form.validateFields(["reason"]);
      setLoading(true);
      const res = await axios.patch(
        `${API_BASE_URL}/api/admin/suspend/${userId}`,
        { reason: values.reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res)
      message.success("User suspended successfully");
      setUserRecord((prev) => ({ ...prev, isAccountSuspended: true }));
      setIsModalOpen(false);
      form.resetFields(["reason"]);
    } catch (err) {
      console.error("Suspend error:", err);
      message.error("Failed to suspend user");
    } finally {
      setLoading(false);
    }
  };

  const retrieveAccount = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${API_BASE_URL}/api/admin/reactivate/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("User reactivated successfully");
      setUserRecord((prev) => ({ ...prev, isAccountSuspended: false }));
    } catch (err) {
      console.error("Retrieve error:", err);
      message.error("Failed to retrieve user");
    } finally {
      setLoading(false);
    }
  };

  const confirmReactivate = () => {
    Modal.confirm({
      width: 390,
      icon: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={personCheck1} alt="Confirm" className="w-24" />
          <h2 className="font-semibold m-0 text-center text-lg">
            Are you sure you want to reactivate this account?
          </h2>
          <div className="text-[#333333CC] w-62 text-center">
            Reactivating this account will give the user access back to his/her
            account but will be on a close watch for a while.
          </div>
        </div>
      ),
      footer: (
        <div className="flex gap-5 justify-center mt-2">
          <Button
            className="text-black bg-[#F1F1F2] rounded-full hover:!bg-[#F1F1F2] hover:!text-black outline-none"
             disabled={loading}
            onClick={() => Modal.destroyAll()} // Close modal on cancel
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
            loading={loading}
            onClick={async () => {
              await retrieveAccount();
              Modal.destroyAll();
            }}
          >
            Reactivate Account
          </Button>
        </div>
      ),
      centered: true,
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${(firstName?.[0] || "").toUpperCase()}${(
      lastName?.[0] || ""
    ).toUpperCase()}`;
  };

  const onFinish = (values) => {
    console.log("Account info submit:", values);
    // implement saving profile updates if needed
  };

  if (!userRecord) return null;

  return (
    <div>
      <Link
        to="/user-management"
        className="flex gap-2 w-20 hover:!text-black items-center"
      >
        <img src={arrowLeft} alt="" className="w-4" /> Back
      </Link>

      <div className="bg-white rounded-md p-3 mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">User Details</h1>
          {userRecord?.isAccountSuspended && (
            <div className="bg-[#F3F3F4] border-[#28303D0D] flex items-center gap-2 rounded-full px-2 py-1">
              <img src={info} alt="" />
              <p>This user is currently suspended for hate speech</p>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          {/* Followers */}
          <div className="bg-[#FCFCFD] p-5 w-64 rounded">
            <p className="mb-2">Total Followers</p>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src={followers} className="w-7" />
                <p className="font-semibold text-lg">
                  {formatNumber(userRecord.followers?.length)} Followers
                </p>
              </div>
              <img src={arrowRight} alt="" className="w-[6px] mt-1" />
            </div>
            <div className="bg-[#EDFEF6] mt-3 w-28 rounded flex items-center justify-center">
              <p className="text-[#55E8AD] text-xs">+20 from yesterday</p>
            </div>
          </div>

          {/* Following */}
          <div className="bg-[#FCFCFD] p-5 w-64 rounded">
            <p className="mb-2">Total Following</p>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src={following} className="w-7" />
                <p className="font-semibold text-lg">
                  {formatNumber(userRecord.following?.length)} Following
                </p>
              </div>
              <img src={arrowRight} alt="" className="w-[6px] mt-1" />
            </div>
            <div className="bg-[#EDFEF6] mt-3 w-28 rounded flex items-center justify-center">
              <p className="text-[#55E8AD] text-xs">+20 from yesterday</p>
            </div>
          </div>

          {/* Communities */}
          <div className="bg-[#FCFCFD] p-5 w-64 rounded">
            <p className="mb-2">Total Community Joined</p>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src={community} className="w-7" />
                <p className="font-semibold text-lg">
                  {formatNumber(userRecord.communities?.length)} Communities
                </p>
              </div>
              <img src={arrowRight} alt="" className="w-[6px] mt-1" />
            </div>
            <div className="bg-[#EDFEF6] mt-3 w-28 rounded flex items-center justify-center">
              <p className="text-[#55E8AD] text-xs">+20 from yesterday</p>
            </div>
          </div>
        </div>

        <Modal
          title="Suspend This Account"
          open={isModalOpen}
          footer={null}
          onCancel={handleSuspendCancel}
        >
          <p className="text-[#333333CC] text-sm">
            If you ban this user he/she won't be able to access his/her account
            until you reactivate it.
          </p>

          <Form form={form} layout="vertical">
            <Form.Item
              name="reason"
              rules={[{ required: true, message: "Please provide a reason" }]}
            >
              <TextArea
                rows={7}
                placeholder="Your reason..."
                className="bg-[#F6F6F6] mt-4 hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none !resize-none"
              />
            </Form.Item>
          </Form>

          <div className="flex justify-end mt-4">
            
              <Button
                onClick={suspendAccount}
                className="bg-black hover:!bg-black text-white border-none rounded-full"
                loading={loading}
              >
                Suspend Account
              </Button>
            
          </div>
        </Modal>

        <div className="mt-4 flex justify-between items-center">
          {userRecord?.isAccountSuspended ? (
            <Button
              className="bg-black text-white hover:!bg-black border-none hover:!text-white p-5"
              onClick={confirmReactivate}
              
            >
              Retrieve Account
            </Button>
          ) : (
            <Button
              className="bg-black text-white hover:!bg-black border-none hover:!text-white p-5"
              onClick={showSuspendModal}
            >
              Suspend Account
            </Button>
          )}

          <Button className="bg-[#B475CC] text-white hover:!bg-[#B475CC] border-none hover:!text-white p-5">
            Notifications
          </Button>
          <Link to="/activity-logs">
            <Button className="bg-[#0085C9] text-white hover:!bg-[#0085C9] border-none hover:!text-white p-5">
              Activity Logs
            </Button>
          </Link>
          <Button className="bg-[#FF9064] text-white hover:!bg-[#FF9064] border-none hover:!text-white p-5">
            Ban Account
          </Button>
        </div>
      </div>

      <div className="p-3 mt-5 bg-white rounded">
        <p className="font-semibold">Account Information</p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3 items-center">
            {userRecord.avatar ? (
              <div className="rounded-fill h-14 w-14">
                <img
                  src={userRecord.avatar}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="rounded-full h-14 w-14 bg-slate-300 flex justify-center items-center">
                <h1 className="text-black">
                  {getInitials(userRecord.firstName, userRecord.lastName)}
                </h1>
              </div>
            )}
            <div>
              <p className="text-xs">Profile Picture</p>
              <p className="text-[.6rem] text-[#333333B2]">
                PNG, JPEG under 10mb
              </p>
            </div>
          </div>
          <div>
            <Button className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none">
              Delete Picture
            </Button>
          </div>
        </div>

        <Form
          form={form}
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
          className="mt-4"
        >
          <div className="flex items-center justify-between gap-10">
            <div className="w-full">
              <Form.Item
                name="firstName"
                label="First Name"
                className="font-semibold text-2xl"
              >
                <Input className="bg-[#F6F6F6]" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item
                name="lastName"
                label="Last Name"
                className="font-semibold text-2xl"
              >
                <Input className="bg-[#F6F6F6]" />
              </Form.Item>
            </div>
          </div>

          <div className="flex items-center justify-between gap-10 -mt-5">
            <div className="w-full">
              <Form.Item
                name="email"
                label="Email"
                className="font-semibold text-2xl"
              >
                <Input className="bg-[#F6F6F6]" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

// helper reused inside component
// function formatNumber(num) {
//   if (!num) return 0;
//   if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
//   if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
//   return num;
// }

export default SingleUser;
