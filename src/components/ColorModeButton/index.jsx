import { Button } from "react-bootstrap";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useTheme } from '../../contexts/ColorModeContext.jsx';

export default function ColorModeButton() {
    const { toggleTheme, theme } = useTheme();
    const icon = theme === "light" ? <MoonFill /> : <SunFill />;
    const text = theme === "light" ? "Change to dark mode" : "Change to light mode";

    return (
        <Button variant="link" onClick={() => toggleTheme()}>{icon} {text}</Button>
    );
}