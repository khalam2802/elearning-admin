import { CoursesService } from "./CoursesService";

export const postAddImageCourses = (formData) => {
  return async (dispatch) => {
    try {
      let result = CoursesService.postAddImageCourses(formData);
      alert('thành công ')
      console.log("result: ", result.data);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
