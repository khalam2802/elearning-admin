import { https } from "./config";
export const UserService = {
  postAddUser: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThemNguoiDung", data);
  },
  deleteRemoveUser: (user) => {
    return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`);
  },
  putUpdateUser: (values) => {
    return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
  },
  getFilterUser: (searchValue) => {
    return https.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${searchValue}`
    );
  },
  getUserList: (hoTen = "") => {
    if (hoTen.trim() != "") {
      return https.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${hoTen}`
      );
    }
    return https.get("api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
  },
  postUserDangKi: (value) => {
    return  https.post("/api/QuanLyNguoiDung/DangKy", value);
    
  },
};
