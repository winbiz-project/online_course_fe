import { Outlet, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./authcontext";
import swal from 'sweetalert2';
import config from "@/config";

const QuizRoute = ({}) => {
  const { user } = useContext(AuthContext);
  const baseUrl = config.apiBaseUrl;
  const { courseId, quizId } = useParams();
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
    const checkValidationCourseAndQuiz = async (user, courseId, quizId) => {
      try{
        const response = await fetch(`${baseUrl}/quiz/get_quiz_on_enrolled_course/${quizId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                }),
        });
        if (!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
        const data = await response.json();

        if(data.Quiz.quiz_course_origin_id === parseInt(courseId)){
          setIsValid(true);
        } else {
          console.log("masuk");
          setIsValid(false);
        }

      } catch (error) {
        console.error('Error:', error)
      }
    };

    checkValidationCourseAndQuiz(user, courseId, quizId)
  }, [user, courseId, quizId]);

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
    <Navigate to={`/courses/${courseId}`} replace />;
  }

  if (isValid === false) {
    swal.fire({
      title: "Course Quiz Doesn't Exist",
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

export default QuizRoute;