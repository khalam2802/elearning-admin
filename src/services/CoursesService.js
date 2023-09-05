import { https } from "./config";

export const CoursesService = {
  getCoursesList: () => {
    return https.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP08");
  },
  postAddCoursesListL:(values)=>{
    return https.post('/api/QuanLyKhoaHoc/ThemKhoaHoc',values)
  },
  getUserList:() => { 
    return https.get('api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01')
   },
  getCategories:() => { 
    return https.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
   }, 
   postAddImageCourses:(formData) => { 
    return https.post('/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh',formData)
    },
  deteleCoursesList:(maKhoaHoc) => { 
    return https.delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`)
   },
   putUpdateCoursesList:((value) => { 
    return https.put('/api/QuanLyKhoaHoc/CapNhatKhoaHoc',value)
    })
  
  

};
