import { Navigate, Outlet, useLocation } from "react-router-dom";

export interface IProtectedRoutesProps {}

export function ProtectedRoutes(props: IProtectedRoutesProps) {
  const isAuth: boolean = false;
  const location = useLocation();
  return isAuth ? (
    <Outlet/>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
}
