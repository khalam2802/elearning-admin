import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import Header from "../../Header/Header";
import { useFormik } from "formik";

export default function AddCourses() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formilk=useFormik({
    initialValues:{
      maKhoaHoc:'',
      tenKhoaHoc:'',
      luotXem:'',
      danhGia:0,
      maNhom:"",
      ngayTao:'',
      maDanhMucKhoaHoc:
      '',
      taiKhoanNguoiTao:'',
      hinhAnh:{},

      
    },
    onSubmit:(values)=>{
      console.log('values: ', values);
;
    }
  })
  return (
    <div>
      <Header />
      <div className="container py-5 ">
        <h6>Thêm khóa học</h6>
        <Form
        onSubmitCapture={formilk.handleSubmit}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Mã Khóa Học">
            <Input name="maKhoaHoc" />
          </Form.Item>
          <Form.Item label="Tên Khóa Học">
            <Input name="tenKhoaHoc"></Input>
          </Form.Item>
          <Form.Item label="Mô Tả">
            <Input name="moTa" />
          </Form.Item>
          <Form.Item label="Lượt Xem">
            <Input name="luotXem"></Input>
          </Form.Item>
          <Form.Item label="Đánh Giá">
            <Input name="danhGia" />
          </Form.Item>
          <Form.Item label="Ngày tạo">
            <DatePicker name="ngayTao" />
          </Form.Item>
          <Form.Item label='Danh Mục Khóa Học'  >
            <Input name="maDanhMucKhoaHoc"></Input>
          </Form.Item>
          <Form.Item label="Tài Khoản Người tạo">
            <Input name="taiKhoanNguoiTao"></Input>
          </Form.Item>
          <Form.Item label="Hình Ảnh">
            <input type="file"></input>
          </Form.Item>
          <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
     <Form.Item label=''>
      <button className="bg-blue-300 text-white py-3 px-5 border rounded-md hover:bg-white hover:text-blue-500 hover:transition-shadow" type="submit">Add</button>
     </Form.Item>
    </Form.Item>
        </Form>
      </div>
    </div>
  );
}
