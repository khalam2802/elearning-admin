import React from 'react'
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { UserService } from '../../../services/UserService';


const { Option } = Select;
const onFinishFailed = (errorInfo) => {
  message.error(errorInfo)
};

export default function SigUp() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;

  const onFinish = (values) => {
    console.log('values: ', values);
    UserService.postUserDangKi(values)
        .then((res) => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng ký thành công",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        })
        .catch((err) => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${err.response.data} thử lại`,
                showConfirmButton: false,
                timer: 1500,
            });
        });
  };
  const [form] = Form.useForm();
  return (

  <div className='h-max-content min-h-screen w-full bg-cover bg-[#73AFCA] flex overflow-hidden relative'>
    <div className="absolute w-full h-full bg-[#73AFCA]"></div>
     
      <div className="min-h-screen w-[80%] mx-auto"> 
        <div className='py-[90px]'>
        <div className="container-80">
          <div className="relative flex flex-col justify-cente overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl md:max-w-lg">
              <h1 className="text-3xl font-semibold text-center text-[#2a5366] uppercase">
                Đăng ký
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
                {/* Username */}
                <Form.Item
                  label="Họ tên"
                  className='mb-2'
                  name="hoTen"
                  rules={[
                    {
                      required: true,
                      message: 'Quên nhập nè ní',
                    },
                    {
                      pattern: regexName,
                      message: 'Phải có ít nhất một chữ cái và giới hạn 20 từ!',
                    }
                  ]}
                >
                  <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "/>
                </Form.Item>
                {/* Account */}
                <Form.Item
                  label="Tài Khoản"
                  className='mb-2'
                  name="taiKhoan"
                  rules={[
                    {
                      required: true,
                      message: 'Quên nhập nè ní',
                    },
                    {
                      pattern: regexName,
                      message: 'Phải có ít nhất một chữ cái và giới hạn 20 từ!',
                    }
                  ]}
                >
                  <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "/>
                </Form.Item>
                {/* Password  */}
                <Form.Item
                  label="Mật Khẩu"
                  className='mb-2'
                  name="matKhau"
                  rules={[
                    {
                      required: true,
                      message: 'Quên nhập nè ní',
                    },
                    {
                      pattern: regexPassword,
                      message: 'Phải chứa ít nhất một chữ số, cả chữ hoa và chữ thường, ký tự đặc biệt và không vượt quá 20 ký tự',
                    }
                  ]}
                >
                  <Input.Password className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                </Form.Item>
                {/* Email  */}
                <Form.Item
                  label="Email"
                  className='mb-2'
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Quên nhập nè ní',
                    },
                    {
                      pattern: regexEmail,
                      message: 'Email chưa đúng định dạng',
                    }
                  ]}
                >
                  <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                </Form.Item>
                {/* Số */}
                <Form.Item
                  label="Số điện thoại"
                  className='mb-2'
                  name="soDt"
                  rules={[
                    {
                      required: true,
                      message: 'Quên nhập nè ní',
                    },
                    {
                      pattern: regexNumber,
                      message: 'Chỉ nhập số thôi',
                    }
                  ]}
                >
                  <Input className="w-full px-4 py-2  focus:outline-none focus:ring focus:ring-opacity-40"/>
                </Form.Item>
                {/* USERGROUP  */}
                <Form.Item
                  name="maNhom"
                  label="ID Group"
                  rules={[
                    {
                      required: true,
                      message:"Chưa chọn mã nhóm nè"
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
                <Form.Item
                  className='mt-6'
                >
                  <button type='submit' className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#73AFCA] rounded-md hover:bg-[#50a8d1] focus:outline-none focus:bg-[#50a8d1]">
                    Đăng ký
                  </button>
                </Form.Item>
              </Form>

              <p className="mt-8 text-xs font-light text-center text-gray-700">
                Bạn có tài khoản rồi ?
                <NavLink
                  to="/login"
                  className="font-medium text-[#73AFCA] hover:underline ml-2"
                >
                  Đăng nhập
                </NavLink>
              </p>
            </div>
          </div>
    </div>
        </div>
    </div>
  </div>
      
  )
}
