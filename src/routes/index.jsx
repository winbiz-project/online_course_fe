import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import PrivateRoute from "./privateroutes";
import GoogleRoute from "./googleroutes";
import SectionRoute from "./sectionroutes";
import QuizRoute from "./quizroutes";
import generateSlug from "./generateslug";

import Index from "@/pages/home";
import Login from "@/pages/auth/login";
import NotFound from "@/pages/notFound";
import ELearning from "@/pages/eLearning";
import CorporateService from "@/pages/corporateService";
import Blog from "@/pages/blog";
import Register from "@/pages/auth/register";
import RegisterGoogle from "@/pages/auth/registergoogle";
import Courses from "@/pages/courses";
import MyCourses from "@/pages/courses/mycourses";
import CourseDetailPage from "@/pages/courses/courseDetail";
import CourseVideo from "@/pages/courses/coursevideo";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import CourseQuiz from "@/pages/courses/coursequiz";
import StartQuiz from "@/pages/courses/startquiz";
import ResultQuiz from "@/pages/courses/resultquiz";
import Review from "@/pages/courses/review";
import ForgetPassword from "@/pages/auth/forgetpassword";
import ResetPassword from "@/pages/auth/resetpassword";
import AboutUs from "@/pages/aboutUs";
import Certificate from "@/pages/courses/certificate";
import MyProfilePage from "@/pages/userProfile/myprofile";


export default function Router() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path:"/auth/forgetpassword",
      element: <ForgetPassword />
    },
    {
      path:"/auth/resetpassword",
      element: <ResetPassword />
    },
    {
      path: "/auth/registergoogle",
      element: <GoogleRoute />,
      children: [
        { path: "", element: <RegisterGoogle /> },
      ],
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "/e-learning",
      children: [
        { path: "", element: <Courses /> },
        {
          path: ":courseSlug",
          children: [
            { path: "", element: <CourseDetailPage /> },
            {
              path: ":subsectionSlug",
              children: [
                { path: "", element: <CourseVideo /> }
              ]
            },
            { 
              path: "quiz/:quizId", 
              children: [
                { path: "", element: <CourseQuiz /> },
                { path: "start", element: <StartQuiz /> },
                { path: "result", element: <ResultQuiz /> }
              ]
            },
            {
              path: "review",
              children: [
                {path: "", element: <Review />}
              ]
            }
          ]
        },
      ],
    },
    
    {
      path: "/mycourses",
      element: <PrivateRoute />,
      children: [
        { path: "", element: <MyCourses />}
      ]
    },
    {
      path: "/myprofile",
      element: <PrivateRoute />,
      children: [
        { path: "", element: <MyProfilePage /> }  
      ]
    },
    {
      path: "/certificate",
      children: [
        {path: ":uniqueIdCertificate", element: <Certificate />}
      ]
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/terms",
      element: <Terms />
    },
    {
      path: "/privacy",
      element: <Privacy />
    },
    {
      path: "/about-us",
      element: <AboutUs />
    },
  ]);

  return <RouterProvider router={router} />;
}
