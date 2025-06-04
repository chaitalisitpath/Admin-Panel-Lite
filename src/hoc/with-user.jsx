import { Navigate } from "react-router-dom";
import URLS from "../constants/url";

const withUser = (RenderComponent) =>{
    const WrappedComponent = (props) =>{
        const token = localStorage.getItem("token");
        return token ? (
            <RenderComponent {...props}/>
        ):(
            <Navigate to={URLS.LOGIN} replace/>
        );
    };
       WrappedComponent.displayName = `withUser(${
        RenderComponent.displayName || RenderComponent.name || "Component"
    })`;
    return WrappedComponent;
}
export default withUser;