import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./authcontext";
import swal from 'sweetalert2';


const GoogleRoute = ({}) => {
  const { googleAccount } = useContext(AuthContext);

  if (!googleAccount || googleAccount.email === null || googleAccount.name === null) {
    swal.fire({
      title: 'Please login with Google',
      icon: 'warning',
      text: "You can't to access this page",
      timer: 6000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,

    })
    return <Navigate to="/auth/login" replace />;
  }

  console.log('Google Account:', googleAccount)

  return <Outlet />;
};

export default GoogleRoute;