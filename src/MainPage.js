import { useNavigate } from "react-router-dom";
import loginService from "./services/loginService.js";

const MainPage = () => {
    const navigate = useNavigate();

    const goToPage = (page) => {
        navigate(page);
    }

    const logOutOfApp = async () => {
        await loginService.logOutOfAPI();
        sessionStorage.removeItem('profile');
        navigate('/sign-in');
    }

    const handleError = (errorStatus) => {
        navigate('/error', { state: { errorStatus } });
      };

    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <button onClick={() => goToPage('/profile')}>Open profile</button>
            <button onClick={() => goToPage('/template')}>Open template management</button>
            <button onClick={logOutOfApp}>Log out</button>
            <button onClick={() => handleError(500)}>Server error!!!!</button>

            {/* Your main application logic goes here */}
        </div>
    );
};

export default MainPage;