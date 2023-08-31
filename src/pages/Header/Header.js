import React,{ useState } from "react";
import {
  HomeOutlined,
  RightOutlined,
  UserOutlined,
  UnorderedListOutlined,SearchOutlined,
} from "@ant-design/icons";
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import { Navigate, useNavigate } from "react-router-dom";
import UserNav from "./UserNav/UserNav";
const { Search } = Input;
export default function Header() {

  const navigate=useNavigate()
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
    <div className="px-10 bg-[#73afca]">
      <div className="flex justify-between items-center">
        <div className="header_left flex items-center h-[72px] space-x-5">
          <div className="w-40 leading-[72px]">
            <img className="object-cover " src="./img/logo.png" alt="" />
          </div>
          <div className="">
            <ul className="flex items-center space-x-5 text-white">
              <li className="leading-[72px] hover:bg-[#ffffff0d] transition-all duration-300 hover:rounded-md cursor-pointer">
                <a onClick={() => { 
                  navigate('/')
                 }}  className="flex items-center">
                  <HomeOutlined className="mr-2" />
                  <span> Dashboards </span>
                  <RightOutlined className="text-xs" />
                </a>
              </li>
              <li className="leading-[72px] hover:bg-[#ffffff0d] transition-all duration-300 hover:rounded-md cursor-pointer">
                <a onClick={() => { 
                  navigate('/user')
                 }}  className="flex items-center">
                  <UserOutlined className="mr-2 " />
                  <span className="">
                    User
                    
                  </span>
                  <RightOutlined className="text-xs" />
                </a>
              </li>
              <li className="leading-[72px] hover:bg-[#ffffff0d] transition-all duration-300 hover:rounded-md cursor-pointer">
                <a onClick={() => { 
                  navigate('/courses')
                 }} className="flex items-center">
                  <UnorderedListOutlined className="mr-2" />

                  <span>
                    Courses
                  </span>
                  <RightOutlined className="text-xs " />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <UserNav></UserNav>
        {/* <div className="header_right flex items-center">
        <Button className="hover:bg-[#ffffff0d] transition-all duration-300 hover:rounded-md" type="primary" onClick={showModal}>
        <SearchOutlined className="text-xl " />
      </Button>
      <Modal title="Search" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Search
      placeholder=""
      onSearch={onSearch}
      style={{
        width: '100%'
      }}
    />
      </Modal>
      <button
      onClick={
        () => { 
          navigate('/login')
          
         }
      }>
        <img className="w-8 h-8 object-cover rounded-full" src="./img/user_logo.png" alt="" />
      </button>

        </div> */}
        
      </div>
    </div>
  );
}
