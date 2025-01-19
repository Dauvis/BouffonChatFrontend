import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter.jsx";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ColorModeProvider } from "./contexts/ColorModeContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ColorModeProvider>
        <AppRouter />
      </ColorModeProvider>
    </BrowserRouter>
  );
}
