import React, { Fragment, useEffect, useState } from "react";
import Header from "../../Header/Header";
import { Button, Card, message } from "antd";
import "./ListCourses.css";
import { https } from "../../../services/config";
import { Table } from "antd";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CoursesService } from "../../../services/CoursesService";

const { Meta } = Card;
export default function ListCourses() {
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
            <NavLink className="bg-dark text-green-600 mr-2 p-2 text-xl" to="/">
              <EditOutlined />
            </NavLink>
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

      {/* <div className="container py-5 grid grid-cols-4 gap-4">
        {renderCoursesList()}
      </div> */}
    </div>
  );
}
