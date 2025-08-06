import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/login_logo.png";
import group from "../assets/Group.png";
import shape from "../assets/shape-99.png";
import bgImage from "../assets/bg-img.png";
import { useApp } from "../context/AppContext";
import CryptoJS from "crypto-js";

const Login = () => {
  const { loading, setLoading, API_BASE_URL, setToken, setUser } = useApp();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // Clear token if user navigates to login page
    sessionStorage.removeItem("token");
  }, [navigate.pathname]);

  const SECRET_KEY = "Withread$#2025!Secure@KeyAesEncrypt";

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, values);

      const { token, user } = res.data;

      if (!token) {
        throw new Error("Token not received from server");
      }

      // Encrypt token before saving
      const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();

      // Save token & user to sessionStorage
      sessionStorage.setItem("token", encryptedToken);

      // Set in context
      setToken(token);

      messageApi.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      messageApi.error(errorMessage);
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_600px]">
      {contextHolder}
      {/* Left Column */}
      <div className="p-4 bg-white h-screen relative overflow-y-auto">
        <img
          src={group}
          alt="icon"
          className="absolute top-0 left-0 w-20 h-20"
        />
        <img
          src={shape}
          alt="icon"
          className="absolute bottom-0 right-0 w-20 h-20"
        />

        <div className="flex justify-center items-center flex-col p-10">
          <div className="flex justify-center">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="font-semibold text-center text-black text-2xl mt-3 mb-5">
            Welcome Back to Withread!
          </h1>

          <div className="w-full max-w-[400px]">
            <Form
              name="login"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="w-full"
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address!",
                  },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long.",
                  },
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="!bg-[#141823] !rounded-full !w-full !py-5 mt-4"
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div
        className="hidden md:block p-4 h-screen"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

export default Login;
