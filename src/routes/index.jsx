import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import Index from "@/pages/home";
import Login from "@/pages/auth/login";


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
  ]);

  return <RouterProvider router={router} />;
}
