import { useState, useEffect } from "react";
import { useAuth } from '../context/auth';
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../pages/Spinner";

export default function PrivateAdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth,setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/admin-auth", {
          headers: {
            Authorization: auth?.token
          }
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Admin auth check failed", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
