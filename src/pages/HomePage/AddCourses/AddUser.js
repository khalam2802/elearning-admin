import { Form, Input, message, Button, Upload, Select, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { CoursesService } from "../../../services/CoursesService";
import { Option } from "antd/es/mentions";
import Header from "../../Header/Header";
import moment from "moment/moment";
import { UserService } from "../../../services/UserService";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;



export default function AddUser() {
 
 
  const onFinish = (values) => {
    console.log("values: ", values);
    UserService.deleteRemoveUser(values)
      .then((res) => {
        console.log("res: ", res);
        message.success("Thêm Người Dùng thành công !!!")
        setTimeout(() => {
        navigate("/user")

        }, 2000);
      })
      .catch((err) => {
        console.log("err: ", err);
        message.error(err.response.data)
      });
  };
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.userSlice.userInfo;
  });

  return (
    <div className="relative flex flex-col justify-cente overflow-hidden">
      <Header></Header>

      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl md:max-w-lg">

        <div className="flex items-center justify-center">
        </div>
        <h1 className="text-3xl mt-4 font-semibold text-center text-[#388acc]">
          Thêm Người Dùng
        </h1>
        <Form
          className="mt-6"
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
          {/* Username */}
          <Form.Item
            label="Họ Tên"
            className="mb-2"
            name="hoTen"
            rules={[
              {
                required: true,
                message: "quên đặt họ tên kìa",
              },
              {
                pattern: regexName,
                message: "Tên gì dài vậy ?",
              },
            ]}
          >
            <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
          </Form.Item>
          {/* Account */}
          <Form.Item
            label="Tài Khoản"
            className="mb-2"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Quên tài khoản nè",
              },
              {
                pattern: regexName,
                message: "Nhập lại tên nè",
              },
            ]}
          >
            <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
          </Form.Item>
          {/* Password  */}
          <Form.Item
            label="Mật Khẩu"
            className="mb-2"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "quên nhập nè ní ơi !!!",
              },
              {
                pattern: regexPassword,
                message: "Mật khẩu không đúng định dạng",
              },
            ]}
          >
            <Input.Password className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
          </Form.Item>
          {/* Email  */}
          <Form.Item
            label="Email"
            className="mb-2"
            name="email"
            rules={[
              {
                required: true,
                message: "quên nhập nè ní ơi !!!",
              },
              {
                pattern: regexEmail,
                message: "Sai định dạng rồi",
              },
            ]}
          >
            <Input className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
          </Form.Item>
          {/* Loại Ndung  */}
          <Form.Item
            label="Loại Người Dùng"
            className="mb-2"
            name="maLoaiNguoiDung"
          >
            <Select  placeholder="Chưa chọn nè ní !!!" allowClear>
              <Option  value="GV">GV</Option>
              <Option value="HV">HV</Option>
            </Select>
          </Form.Item>
          {/* Phone  */}
          <Form.Item
            label="Phone"
            className="mb-2"
            name="soDt"
            rules={[
              {
                required: true,
                message: "quên nhập nè ní ơi !!!",
              },
              {
                pattern: regexNumber,
                message: "Chỉ nhập số thui",
              },
            ]}
          >
            <Input className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
          </Form.Item>
          {/* USERGROUP  */}
          <Form.Item
            name="maNhom"
            label="ID Group"
            rules={[
              {
                required: true,
                message:'chọn nhóm nữa nè'
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="GP01">GP01</Option>
              <Option value="GP02">GP02</Option>
              <Option value="GP03">GP03</Option>
              <Option value="GP04">GP04</Option>
              <Option value="GP05">GP05</Option>
              <Option value="GP06">GP06</Option>
              <Option value="GP07">GP07</Option>
              <Option value="GP08">GP08</Option>
            </Select>
          </Form.Item>
          {/* BUTTON */}
          <Form.Item className="mt-6">
            <button
              type="submit"
              className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#f64a6e] rounded-md hover:bg-[#f77259] focus:outline-none focus:bg-[#f77259]"
            >
              Register
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
