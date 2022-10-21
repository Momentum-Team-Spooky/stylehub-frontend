import { Navigate, Outlet } from "react-router";

export const ProtectedRoutes = ({isLoggedIn, redirectPath ='/', token}) => {

    if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />
    }
    return token ? token : <Outlet />
}