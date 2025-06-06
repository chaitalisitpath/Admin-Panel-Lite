import {Navigate} from 'react-router-dom';
import URLS from '../constants/url';

const withAuth = (RenderComponent) =>{
    const WrappedComponent = (props) =>{
        const token = localStorage.getItem('token');
        if(token){
            return <Navigate to={URLS.DASHBOARD} replace/>
        }
        return <RenderComponent {...props}/>;
    };
    WrappedComponent.displayName = `withAuth(${RenderComponent.displayName || RenderComponent.name || 'Component'})`;
    return WrappedComponent;

}
export default withAuth;