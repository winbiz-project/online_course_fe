import { Outlet, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./authcontext";
import swal from 'sweetalert2';

const SectionRoute = ({}) => {
  const { user } = useContext(AuthContext);
  const { courseId } = useParams();
  const [hasAccess, setHasAccess] = useState(null);

  useEffect(() => {
    const checkIfUserBoughtCourse = async (user, courseId) => {
      try{
        const response = await fetch(`https://online-course-be.vercel.app/course/check_user_enrolled/`+user.email+'/'+courseId);
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
    return <Navigate to={`/courses/${courseId}`} replace />;
  }

  if (hasAccess === null) {
    <Navigate to={`/courses/${courseId}`} replace />;
  }

  return <Outlet />;
};

export default SectionRoute;