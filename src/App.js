import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from './SignInPage';
import MainPage from './MainPage';
import ErrorPage from './ErrorPage';
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./ProfilePage";
import TemplatePage from "./TemplatePage";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/main" /> } />
        <Route path="/main" element={<PrivateRoute> <MainPage/> </PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute> <ProfilePage/> </PrivateRoute>}/>
        <Route path="/template" element={<PrivateRoute> <TemplatePage/> </PrivateRoute>}/>
        <Route path="/sign-in" element={<SignInPage/> }/>
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
