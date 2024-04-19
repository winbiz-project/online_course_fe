import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./authcontext";
import swal from 'sweetalert2';


const PrivateRoute = ({}) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    swal.fire({
      title: 'Please login',
      icon: 'warning',
      text: 'You need to be logged in to access this page',
      timer: 6000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,

    })
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;