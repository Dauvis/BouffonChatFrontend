import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ColorModeProvider } from "./contexts/ColorModeContext.jsx";
import LoadingOverlay from "./components/LoadingOverlay";

export default function App() {
    return (
        <BrowserRouter>
            <ColorModeProvider>
                <LoadingOverlay>
                    <AppRouter />
                </LoadingOverlay>
            </ColorModeProvider>
        </BrowserRouter>
    );
}
