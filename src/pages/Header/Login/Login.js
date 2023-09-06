import React from "react";
import "./Login.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../../../services/config";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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
    <div className=" h-screen flex justify-center items-center bg-[#73AFCA] ">
     <div className="min-h-screen w-[80%] mx-auto"> 
      <div className='py-[105px]'>
      <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full p-4 m-auto bg-white rounded-xl shadow-xl md:max-w-lg">
              <div className="flex items-center justify-center">
                <div className="h-14 w-14">
                
                </div>
              </div>
              <h1 className="text-3xl mt-4 font-semibold text-center text-black">
                Login to COURSEPLUS
              </h1>
              <Form className='mt-6'
                name="basic"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
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
                label="Tài Khoản"
                  className='mb-2'
                  name="taiKhoan"
                  rules={[
                    {
                      required: true,
                      message: 'Quên nhập nè ní',
                    },
                  ]}
                >
                  <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "/>
                </Form.Item>

                <Form.Item
                  label="Mật Khẩu"
                  className='mb-2'
                  name="matKhau"
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                >
                  <Input.Password className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </Form.Item>

                 
                <Form.Item
                  className='mt-3'
                >
                  <button type='submit' className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#73AFCA] rounded-md hover:bg-[#50a8d1] focus:outline-none focus:bg-[#50a8d1]">
                    Đăng Nhập
                  </button>
                </Form.Item>
              </Form>

              <p className="mt-8 text-xs font-light text-center text-gray-700">
               Bạn chưa có tài khoản?
                <NavLink
                  to="/register"
                  className="font-medium text-[#73AFCA] hover:underline ml-2"
                >
                  Đăng Ký
                </NavLink>
              </p>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
}