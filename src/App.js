import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from './pages/SignInPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import TemplatePage from "./pages/TemplatePage";
import './App.css';
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
        <Route path="*" element={<ErrorPage status="404" message="The page that you are looking for does not exist."/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
