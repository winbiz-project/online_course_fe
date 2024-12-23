import { Outlet, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./authcontext";
import swal from 'sweetalert2';
import config from "@/config";

const SectionRoute = ({}) => {
  const { user } = useContext(AuthContext);
  const baseUrl = config.apiBaseUrl;
  const { courseId, subsectionId } = useParams();
  const [hasAccess, setHasAccess] = useState(null);
  const [isValid, setIsValid] = useState(null);
  

  useEffect(() => {
    const checkIfUserBoughtCourse = async (user, courseId) => {
      try{
        const response = await fetch(`${baseUrl}/course/check_user_enrolled/`+user.email+'/'+courseId);
        if (!response.ok) {
          throw new Error('Failed to check enrollment status');
        }
        const data = await response.json();
        setHasAccess(data.response);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkIfUserBoughtCourse(user, courseId);
  }, [user, courseId]);

  useEffect(() => {
    const checkValidationCourseAndSection = async (courseId, subsectionId) => {
      try{
        const response = await fetch(`${baseUrl}/course/get_sub_section_details/${subsectionId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if(data.course_origin_id === parseInt(courseId)){
          setIsValid(true);
        } else {
          setIsValid(false);
        }

      } catch (error) {
        console.error('Error:', error)
      }
    };

    checkValidationCourseAndSection(courseId, subsectionId)
  }, [courseId, subsectionId]);

  if (hasAccess === false) {
    swal.fire({
      title: 'Access Denied',
      icon: 'warning',
      text: 'You need to purchase this course to access this page',
      timer: 6000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,
    })
    return <Navigate to={`/e-learning/${courseId}`} replace />;
  }

  if (hasAccess === null) {
    <Navigate to={`/e-learning/${courseId}`} replace />;
  }

  if (isValid === false) {
    swal.fire({
      title: "Course Video Doesn't Exist",
      icon: "error",
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    })
    return <Navigate to={`/e-learning/${courseId}`} />
  }

  return <Outlet />;
};

export default SectionRoute;