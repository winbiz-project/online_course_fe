import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import Index from "@/pages/home";
import Login from "@/pages/auth/login";
import NotFound from "@/pages/notFound";
import ELearning from "@/pages/eLearning";


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
      path: "/e-learning",
      element: <ELearning />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
