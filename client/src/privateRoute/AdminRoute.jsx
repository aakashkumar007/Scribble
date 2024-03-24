import { useState, useEffect } from "react";
import {useAuth} from '../context/auth'
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../pages/Spinner";

export default function PrivateAdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:4000/api/auth/admin-auth",{
        headers:{
          Authorization : auth?.token
        }
      });
      console.log(res)
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
      console.log({auth});
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}