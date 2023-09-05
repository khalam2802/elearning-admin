import { https } from "./config";
export const UserService={
    postAddUser:(data) => { 
        return https.post('/api/QuanLyNguoiDung/ThemNguoiDung',data)
    
       }
      ,
    deleteRemoveUser:(user)=>{
        return https.delete( `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`)
    },
    putUpdateUser:(values) => {  return https.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',values)}
    

}