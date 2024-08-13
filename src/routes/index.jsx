import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import PrivateRoute from "./privateroutes";
import GoogleRoute from "./googleroutes";
import SectionRoute from "./sectionroutes";

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
import Terms from "@/pages/terms"

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
      element: <ELearning />,
    },
    // {
    //   path: "/corporate-service",
    //   element: <PrivateRoute />,
    //   children: [
    //     { path: "", element: <CorporateService /> },
    //   ],
    // },
    {
      path: "/courses",
      element: <PrivateRoute />,
      children: [
        { path: "", element: <Courses /> },
        { path: ":courseId", element: <CourseDetailPage />},
        {
          path: ":courseId/:courseSubsectionId",
          element: <SectionRoute />,
          children: [
            { path: "", element: <CourseVideo />}
          ]
        }
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
      path: "/blog",
      element: <Blog />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/terms",
      element: <Terms />
    },
  ]);

  return <RouterProvider router={router} />;
}
