import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { request_refresh } from '../actions/auth/refresh';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';



const Layout = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();
    const dispatch = useDispatch();



    useEffect(() => {

        if (dispatch && dispatch !== null && dispatch !== undefined){
            dispatch(request_refresh());
        }
        
    }, [dispatch]);
    
    console.log({isAuthenticated:isAuthenticated})
    
    const execludeList = ['/register', '/login']
    
    return (
        <>
            {execludeList.indexOf(router.pathname) === -1 && <Header/>}
            {children}
        </>
    );
};


export default Layout;
