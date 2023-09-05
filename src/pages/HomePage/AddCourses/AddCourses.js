
import { Form, Input, message, Button, Upload, Select, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { CoursesService } from "../../../services/CoursesService";
import { Option } from "antd/es/mentions";
import Header from "../../Header/Header";
import moment from "moment/moment";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;
 

export default function AddCourses() {
const [ngayTao, setNgayTao] = useState('')
const handleChangeDatePicker = (value) => {

  setNgayTao(moment(value).format("DD/MM/YYYY"))
};
  const [imgSrc, setImgSrc] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  console.log("hinhAnh: ", hinhAnh);
  const handleChangeFile = (event) => {
    let file = event.target.files[0];
    // tao doi tuong de? doc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result); //hinhBase 64
    };
    setHinhAnh(file);
  };
  const [maDanhMucKhoaHoc, setMaDanhMucKhoaHoc] = useState([]);
  useEffect(() => {
    CoursesService.getCategories()
      .then((res) => {
        setMaDanhMucKhoaHoc(res.data)

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log('maDanhMucKhoaHoc: ', maDanhMucKhoaHoc);
  const renderListCourses = () => { 
    return maDanhMucKhoaHoc.map((item,index) => { 
      return (
        <Option className="text-black">
          {item.maDanhMucKhoaHoc} </Option>
    )
     })
  };
  const handleOnchangeSelect=(values) => { 
    console.log('values: ', values);

   }
  const onFinish = (values) => {
    let newValues = { ...values, hinhAnh: hinhAnh.name, ngayTao:ngayTao };
    console.log("newValues: ", newValues);
    CoursesService.postAddCoursesListL(newValues)
      .then((res) => {
        console.log("res: ", res);
        message.success("Thêm Khóa Học thành công !!!")
        setTimeout(() => {
        navigate("/courses")

          
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
    <div className="relative h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden">
      <div className="absolute w-full h-full bg-[#e5e7eb]">
        <Header></Header>
      </div>

      <div className="min-h-screen w-full">
        <div className="py-[105px]">
          <div className="relative flex flex-col justify-center overflow-hidden px-10 lg:mt-0 mt-10">
            <div className="w-full p-4 m-auto bg-white rounded-xl shadow-xl md:max-w-lg">
              
              <h1 className="text-3xl mt-4 font-semibold text-center text-[#388acc]">
                Thêm Khóa học
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
                {/* maKhoaHoc */}
                <Form.Item
                  label="Mã Khóa Học"
                  className="mb-2"
                  name="maKhoaHoc"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
                    },
                    {
                      pattern:regexNumber,
                      message:'Chỉ nhập số thui'
                    }
                  ]}
                >
                  <Input className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>
                {/* biDanh */}
                <Form.Item
                  label="Bí Danh"
                  className="mb-2"
                  name="biDanh"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
                    },
                    {
                      pattern:'',
                      message:''
                    }
                  ]}
                >
                  <Input className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>
                {/* hinhAnh */}
                <Form.Item label="Chọn Ảnh" className="mb-2" name="hinhAnh">
                  {/* <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload> */}
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    accept="image/png, image/jpeg, image/gif, image/png"
                  />
                  <img src={imgSrc} alt="" />
                </Form.Item>
                {/* tenKhoaHoc */}
                <Form.Item
                  label="Tên Khóa Học"
                  className="mb-2"
                  name="tenKhoaHoc"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
                    },
                    {
                      pattern:regexName,
                      message:'Chỉ nhập chữ thui'
                    }
                  ]}
                >
                  <Input className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>
                {/* moTa */}
                <Form.Item
                  label="Mô Tả"
                  className="mb-2"
                  name="moTa"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
                    },
                  ]}
                >
                  <Input className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>
                {/* luotXem */}
                <Form.Item
                  label="Lượt Xem"
                  className="mb-2"
                  name="luotXem"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
                    },
                  ]}
                >
                  <Input className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>
                {/* danhGia */}
                <Form.Item
                  label="Đánh Giá"
                  className="mb-2"
                  name="danhGia"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
                    },
                  ]}
                >
                  <Input className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>
                {/* ngày tạo */}
                    <Form.Item label="Ngày tạo" >
                      <DatePicker
                        onChange={handleChangeDatePicker}
                        name="ngayTao"
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                {/* maNhom */}
                <Form.Item
                  label="Mã Nhóm"
                  className="mb-2"
                  name="maNhom"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
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
            
             
                {/* maDanhMucKhoaHoc */}
                <Form.Item
                  label="Danh Mục Khóa Học"
                  className="mb-2"
                  name="maDanhMucKhoahoc"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Select onChange={handleOnchangeSelect}>
                    {maDanhMucKhoaHoc.map((item,index) => { 
      return (<Option value={item.maDanhMuc} key={index} className="text-black">
          {item.maDanhMuc} </Option>
    )
     })}
                  </Select>
                
                </Form.Item>
                {/* taiKhoanNguoiTao */}
                <Form.Item
                  label="Tài Khoản Người Tạo"
                  className="mb-2"
                  name="taiKhoanNguoiTao"
                  rules={[
                    {
                      required: true,
                      message: "quên nhập nè ní ơi !!!",
                    },
                  ]}
                >
                  <Input className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>

              
                <Form.Item className="mt-3">
                  <button
                    type="submit"
                    className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#388acc] rounded-md hover:bg-[#388acc] focus:outline-none focus:bg-[#388acc]"
                  >
                    Thêm Khóa Học
                  </button>
                </Form.Item>
              </Form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
