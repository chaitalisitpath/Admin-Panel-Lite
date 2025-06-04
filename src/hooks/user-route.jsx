import { useMemo } from "react";
import URLS from "../constants/url"
import Login from "../containers/Auth/Login";
import ForgotPassword from '../containers/Auth/ForgotPassword'
import Dashboard from '../containers/Admin/Dashboard'
import Home from '../containers/Home'

const useRoutes = () =>{
    const allRoutes = useMemo(()=>[
        {
            id:"root",
            path:URLS.INITIAL,
            element: <Home/>,
            isAuth:true
        },
        {
            id:'login',
            path:URLS.LOGIN,
            element: <Login/>,
            isAuth: true
        },
        {
            id:"forgotpassword",
            path:URLS.FORGOT_PASSWORD,
            element: <ForgotPassword/>,
            isAuth: true
        },
        {
            id:"dashboard",
            path:URLS.DASHBOARD,
            element: <Dashboard/>,
            isPrivate: true
        }

    ],[]);
    const authRoutes = useMemo(()=>{
        return allRoutes.filter(route => route.isAuth)
    },[allRoutes])
    const privateRoutes = useMemo(()=>{
        return allRoutes.filter(route => route.isPrivate)
    },[allRoutes])
    return {authRoutes, privateRoutes, allRoutes};
}
export default useRoutes;