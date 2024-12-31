import { useNavigate } from "react-router-dom";
import { Container} from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import NavHeader from "../../components/NavHeader";
import ProfileForm from "../../components/ProfileForm";

export default function ProfilePage() {
    const navigate = useNavigate();

    const goToMainPage = () => {
      navigate("/main");
    };

    return (
        <>
            <NavHeader icon={(<XLg />)} callBack={() => goToMainPage()}/>
            <main>
                <Container>
                    <h3>Profile</h3>
                    <ProfileForm />
                </Container>
            </main>
        </>
    );
};
