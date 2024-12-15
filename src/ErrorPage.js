import { useNavigate, useLocation } from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const errorStatus = location.state?.errorStatus;

    const goToMainPage = () => {
      navigate("/main");
    };
  
    return (
        <div>
            <h1>Error {errorStatus || 'Unknown'}</h1>
            <p>Something went wrong. Please try again later.</p>
            <button onClick={goToMainPage}>Return to app</button>
        </div>
    );
};

export default ErrorPage;