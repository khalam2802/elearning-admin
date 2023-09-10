import { https } from "./config";

export const CoursesService = {
  getCoursesList: (tenKhoaHoc="") => {
    if(tenKhoaHoc.trim()!=""){
      return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP01`)
    }
    return https.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
  },
  postAddCoursesListL:(values)=>{
    return https.post('/api/QuanLyKhoaHoc/ThemKhoaHoc',values)
  },
  
  getCategories:() => { 
    return https.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
   }, 
   postAddImageCourses:(formData) => { 
    return https.post('/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc',formData)
    },
  deteleCoursesList:(maKhoaHoc) => { 
    return https.delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`)
   },
   putUpdateCoursesList:((value) => { 
    return https.put('/api/QuanLyKhoaHoc/CapNhatKhoaHoc',value)
    }),
    
  
  

};
