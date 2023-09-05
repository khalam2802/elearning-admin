import React, { Fragment, useEffect, useState } from "react";
import Header from "../../Header/Header";
import { Button, Card, message,Modal,Form,Input,Select,DatePicker } from "antd";
import "./ListCourses.css";
import { https } from "../../../services/config";
import { Table } from "antd";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CoursesService } from "../../../services/CoursesService";
import moment from "moment";
const{Option} = Select

const { Meta } = Card;
export default function ListCourses() {
  // sửa thông tin
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
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
      const handleOnchangeSelect=(values) => { 
        console.log('values: ', values);
    
       }
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
      const onFinish = (values) => {
        let newValues = { ...values, hinhAnh: hinhAnh.name, ngayTao:ngayTao,maKhoaHoc:khoaHoc.maKhoaHoc };
        console.log("newValues: ", newValues);
        CoursesService.putUpdateCoursesList(newValues)
          .then((res) => {
            console.log("res: ", res);
            message.success("Cập Nhật Khóa Học thành công !!!")
            setTimeout(() => {
            navigate("/courses")
    
              
            }, 2000);
          })
          .catch((err) => {
            console.log("err: ", err);
            message.error(err.response.data)
          });
      };
  const [khoaHoc, setKhoaHoc] = useState()
  console.log('khoaHoc: ', khoaHoc);
  const handleGetCourses=(e) => { 
    console.log('e: ', e);
    setKhoaHoc(e)


   }
   
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeteleCourses=(maKhoaHoc) => { 
    CoursesService.deteleCoursesList(maKhoaHoc).then((res) => {
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
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
   CoursesService.getCoursesList()
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
      title: "ID",
      dataIndex: "maKhoaHoc",
      width: "20%",
    },

    {
      title: "Tên Khóa Hoc",
      dataIndex: "tenKhoaHoc",
      width: "15%",
    },

    {
      title: "Hình Ảnh",
      dataIndex: "",
      render: (text, courses, index) => {
        return (
          <Fragment>
            <img
              src={courses.hinhAnh}
              alt={courses.hinhAnh}
              width={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      with: "15%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, courses) => {
        return (
          <Fragment>
            {courses.moTa.length > 50
              ? courses.moTa.substr(0, 50) + "..."
              : courses.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      render: (text, courses) => {
        return (
          <Fragment>
            <button onClick={() => { showModal()
             handleGetCourses(courses)
             }} className="bg-dark text-green-600 mr-2 p-2 text-xl" >
              <EditOutlined />
            </button>
            <button onClick={() => { 
              handleDeteleCourses(courses.maKhoaHoc)
             }} className="bg-dark text-red-600 mr-2 p-2 text-xl" >
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
      <h3 className="text-4xl py-5">Quản lý danh sách khóa học </h3>
      <Button className="mb-5"
        onClick={() => {
          navigate("/courses/add-courses");
        }}
      >
        Thêm khóa học
      </Button>
      <Table  rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
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
                {/* maKhoaHoc */}
                <Form.Item
                
                  label="Mã Khóa Học"
                  className="mb-2"
                  name="maKhoaHoc"
                  
                >
                  <Input disabled placeholder={khoaHoc?.maKhoaHoc} className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
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
                  <Input placeholder={khoaHoc?.biDanh} className="w-full px-4 py-2 text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
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
                  <Input placeholder={khoaHoc?.tenKhoaHoc} className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
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
                  <Input placeholder={khoaHoc?.moTa} className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
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
                  <Input placeholder={khoaHoc?.luotXem} className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
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
                  <Input placeholder={khoaHoc?.danhGia} className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
                </Form.Item>
                {/* ngày tạo */}
                    <Form.Item  label="Ngày tạo" >
                      <DatePicker
                        onChange={handleChangeDatePicker}
                        name="ngayTao"
                        format={"DD/MM/YYYY"}
                        disabled
                        placeholder={khoaHoc?.ngayTao}
                      />
                    </Form.Item>
                {/* maNhom */}
                <Form.Item
                  label="Mã Nhóm"
                  className="mb-2"
                  name="maNhom"
                  
                >
                   <Select
                        defaultValue={khoaHoc?.maNhom}
                        allowClear
                        className="uppercase"
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
                  <Select defaultValue={khoaHoc?.danhMucKhoaHoc?.maDanhMucKhoahoc} onChange={handleOnchangeSelect}>
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
                  <Input placeholder={khoaHoc?.nguoiTao?.taiKhoan} className="w-full px-4 py-2text-[#59ba9a] bg-white border rounded-md focus:border-text-[#59ba9a] focus:text-[#59ba9a] focus:outline-none focus:ring focus:ring-opacity-40" />
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
      </Modal>

      {/* <div className="container py-5 grid grid-cols-4 gap-4">
        {renderCoursesList()}
      </div> */}
    </div>
  );
}
