import Header from '../../Header/Header'
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import { https } from "../../../services/config";
import { Table } from "antd";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CoursesService } from "../../../services/CoursesService";
import './ListUser.css'
import { UserService } from '../../../services/UserService';
import { Option } from 'antd/es/mentions';
const { Meta } = Card;
export default function ListUser() {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
    


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [nguoiDung, setNguoiDung] = useState({})


  const handleGetUser=(item) => { 
    console.log('item: ', item);
    setNguoiDung(item)}


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    
    let newValues={...values,taiKhoan:nguoiDung.taiKhoan}
    console.log('newValues: ', newValues);
    UserService.putUpdateUser(newValues).then((res) => {
      message.success('Cập nhật thành công !!!')
      setTimeout(() => {
        window.location.reload()

      }, 900);
    })
    .catch((err) => {
      console.log(err);
      message.error(err.response.data)
    });
;

  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // xóa user
   const handleDeteleUser=(data) => { 
    UserService.deleteRemoveUser(data).then((res) => {
      console.log(res);
      message.success('Xóa thành công !!!')
      setTimeout(() => {
        window.location.reload()

      }, 900);
    })
    .catch((err) => {
      console.log(err);
      message.error(err.response.data)
    });
;
   }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const [coursesArr, setcoursesArr] = useState([]);
  useEffect(() => {
   CoursesService.getUserList()
      .then((res) => {
        console.log(res);
        setcoursesArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      width: "20%",
    },

    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      width: "15%",
    },
    {
        title: "Email",
        dataIndex: "email",
        width: "15%",
      },

    
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      width:'15%'
     
    },
    {
        title: "Loại Người Dùng",
        dataIndex: 'maLoaiNguoiDung',
        width:'15%',
       
      },

    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      render: (text, user) => {
        return (
          <Fragment>
            <button onClick={() => { 
              return (
                showModal(),
                handleGetUser(user)
              )
             }} className="bg-dark text-green-600 mr-2 p-2 text-xl" >
              <EditOutlined />
            </button>
            <button onClick={() => {
              handleDeteleUser(user.taiKhoan)

             }} className="bg-dark text-red-600 mr-2 p-2 text-xl" to="/">
              <DeleteOutlined />
            </button>
          </Fragment>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const data = coursesArr;

  // let renderCoursesList = () => {
  //   return coursesArr.map(({hinhAnh,tenKhoaHoc,moTa}) => {
  //     return (
  //       <Card
  //         hoverable
  //         style={{ width:240 }}
  //         cover={
  //           <img className="h-60 object-cover"
  //             alt="example"
  //             src={hinhAnh}
  //           />
  //         }
  //       >
  //         <Meta title={tenKhoaHoc}description={moTa} />
  //       </Card>
  //     );
  //   });
  // };
  return (
    <div className="">
      <Header />
      <div className="px-5">
      <h3 className="text-4xl py-5">Quản lý người dùng </h3>
      <Button className="mb-5"
        onClick={() => {
          navigate("/user/add-user");
        }}
      >
        Thêm Người Dùng
      </Button>
      <Table  rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>

      {/* <div className="container py-5 grid grid-cols-4 gap-4">
        {renderCoursesList()}
      </div> */}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <Input placeholder={nguoiDung.hoTen} className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
          </Form.Item>
          {/* Account */}
          <Form.Item
            
            label="Tài Khoản"
            className="mb-2"
            name="taiKhoan"
            
          >
            <Input placeholder={nguoiDung.taiKhoan} disabled className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
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
            <Input placeholder={nguoiDung.email} className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
          </Form.Item>
          {/* Loại Ndung  */}
          <Form.Item
            label="Loại Người Dùng"
            className="mb-2"
            name="maLoaiNguoiDung"
         
          >
            <Select placeholder="Chưa chọn nè ní !!!" allowClear>
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
            <Input placeholder={nguoiDung.soDt} className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
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
              placeholder="Chọn nhóm đi"
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
      </Modal>
    </div>
  );
}
