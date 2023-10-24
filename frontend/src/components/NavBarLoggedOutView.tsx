import { Button } from 'react-bootstrap';

interface NavBarLoggedOutViewProps {
	onSignUpClicked: () => void;
	onLoginClicked: () => void;
}
const NavBarLoggedOutView = ({
	onSignUpClicked,
	onLoginClicked,
}: NavBarLoggedOutViewProps) => {
	return (
		<>
			<Button
				className="mx-2"
				onClick={onSignUpClicked}
				variant="outline-light"
			>
				Sign up
			</Button>
			<Button
				className="mx-2"
				onClick={onLoginClicked}
				variant="outline-light"
			>
				Login
			</Button>
		</>
	);
};

export default NavBarLoggedOutView;
