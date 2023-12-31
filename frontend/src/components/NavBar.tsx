import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaStickyNote } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';

interface NavBarProps {
	loggedInUser: User | null;
	onSignUpClicked: () => void;
	onLoginClicked: () => void;
	onLogoutSuccessful: () => void;
}
const NavBar = ({
	loggedInUser,
	onSignUpClicked,
	onLoginClicked,
	onLogoutSuccessful,
}: NavBarProps) => {
	return (
		<Navbar bg="dark" variant="dark" expand="sm" sticky="top">
			<Container>
				<Navbar.Brand style={{ marginRight: '1.5rem' }}>
					<Nav.Link as={Link} to="/">
						<FaStickyNote
							style={{ marginRight: '0.3rem', marginTop: '-0.1rem' }}
						/>
						Web Notes
					</Nav.Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav>
						<Nav.Link as={Link} to="/privacy">
							Privacy
						</Nav.Link>
					</Nav>
					<Nav className="ms-auto">
						{loggedInUser ? (
							<NavBarLoggedInView
								user={loggedInUser}
								onLogoutSuccessful={onLogoutSuccessful}
							/>
						) : (
							<NavBarLoggedOutView
								onLoginClicked={onLoginClicked}
								onSignUpClicked={onSignUpClicked}
							/>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
