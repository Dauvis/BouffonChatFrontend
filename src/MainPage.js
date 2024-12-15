import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    const goToPage = (page) => {
        navigate(page);
    }

    const logOutOfApp = () => {
        localStorage.setItem('lock', '');
        navigate('/');
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