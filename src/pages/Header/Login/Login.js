import React from "react";
import "./Login.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../../../services/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogIn } from "../../../redux/userSlice";
import { localServ } from "../../../services/localStore";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log("values: ", values);
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        console.log("res: ", res);
        message.success("Đăng nhập thành công");
        dispatch(setLogIn(res.data));
      localServ.setUser(res.data)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log("err: ", err);
        message.error("Đăng nhập thất bại");
      });
  };

  return (
    <div className=" h-screen flex justify-center items-center ">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="text-red-900"
          label="Username"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="bg-blue-900 hover:text-red-600" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
