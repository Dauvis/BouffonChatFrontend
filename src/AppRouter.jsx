import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./contexts/ColorModeContext.jsx"
import SignInPage from './pages/SignInPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from "./PrivateRoute.jsx";
import ProfilePage from "./pages/ProfilePage";
import TemplatePage from "./pages/TemplatePage";
import { OptionsProvider } from "./contexts/OptionsContext.jsx";
import { ChatDataProvider } from "./contexts/ChatDataContext.jsx";

export default function AppRouter() {
    const { theme } = useTheme();

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="/main" element={
                <PrivateRoute>
                    <OptionsProvider>
                        <ChatDataProvider>
                            <MainPage />
                        </ChatDataProvider>
                    </OptionsProvider>
                </PrivateRoute>} />
            <Route path="/profile" element={
                <PrivateRoute>
                    <OptionsProvider>
                        <ChatDataProvider>
                            <ProfilePage />
                        </ChatDataProvider>
                    </OptionsProvider>
                </PrivateRoute>} />
            <Route path="/template" element={
                <PrivateRoute>
                    <OptionsProvider>
                        <ChatDataProvider>
                            <TemplatePage />
                        </ChatDataProvider>
                    </OptionsProvider>
                </PrivateRoute>} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage status="404" message="The page that you are looking for does not exist." />} />
        </Routes>
    );
}