import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { render } from "@testing-library/react";
import "./UserNav.css";
import { localServ } from "../../../services/localStore";

const { Search } = Input;

export default function UserNav() {
  let btnClass =
    "px-5 py-2 rouded border border-black hover:border-black hover:text-black";
  let handleLogout = () => {
    localServ.removeUser();

    navigate("/login");
    window.location.reload();
  };

  let renderContent = () => {
    if (user) {
      return (
        <>
          <img
            alt="avatar"
            className="w-8 h-8  rounded-full ring-2 ring-offset-4 ring-[#1A293E] ring-offset-[#8fa7c8] "
            src="https://source.unsplash.com/40x40/?portrait?1"
          />
          <span> {user.hoTen}</span>
          <button onClick={handleLogout} className={btnClass}>
            Log Out
          </button>
        </>
      );
    } else {
      return (
        <div>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className={btnClass}
          >
            Đăng nhập
          </button>
        </div>
      );
    }
  };
  let user = useSelector((state) => state.userSlice.userInfo);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSearch = (value) => console.log(value);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div>
      <div className="header_right flex items-center">
        <Button
          className="hover:bg-[#ffffff0d] transition-all duration-300 hover:rounded-md"
          type=""
          onClick={showModal}
        >
          <SearchOutlined className="text-[20px] hover:bg-[#ffffff0d] transition-all duration-300 hover:rounded-md " />
        </Button>
        <Modal
          title="Search"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          
        >
          <Search
            placeholder=""
            onSearch={onSearch}
            style={{
              width: "100%",
            }}
          />
        </Modal>

        <div className="flex justify-center items-center space-x-5">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
// import React from 'react'
// import { useSelector } from 'react-redux'

// export default function UserNav() {
//   let user=useSelector((state)=>state.userSlice.userInfo)
//   console.log('user: ', user);
//   return (
//     <div>UserNav</div>
//   )
// }
//  Log ko được user
