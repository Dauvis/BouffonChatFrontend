import { Button } from "react-bootstrap";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useTheme } from '../../contexts/ColorModeContext.js';

export default function ColorModeButton() {
    const { toggleTheme, theme } = useTheme();
    let icon;
    let text;

    if (theme === "light") {
        icon = (<MoonFill />);
        text = "Change to dark mode";
    } else {
        icon = (<SunFill />);
        text = "Change to light mode";
    }

    return (
        <Button variant="link" onClick={() => toggleTheme()}>{icon} {text}</Button>
    );
}