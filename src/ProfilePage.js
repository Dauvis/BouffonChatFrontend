import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

    const goToMainPage = () => {
      navigate("/main");
    };
  
    return (
        <div>
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <button onClick={goToMainPage}>Close profile</button>
        </div>
    );
};

export default ProfilePage;