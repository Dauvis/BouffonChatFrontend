import { useNavigate } from "react-router-dom";

const TemplatePage = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/main");
  };

  return (
    <div>
      <h1>Templates</h1>
      <p>This is the template management page.</p>
      <button onClick={goToMainPage}>Close template management</button>
    </div>
  );
};

export default TemplatePage;
