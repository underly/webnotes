import styles from '../styles/privacy.module.css';

const PrivacyPage = () => {
	return (
		<div className={`${styles.privacyContainer}`}>
			<h2 style={{ textDecoration: 'underline' }}>Our Privacy Statement</h2>
			<p className="lead text-center font-size-30 ">
				Your security is our priority. We have proper security measures in
				place to ensure your notes can only be viewed by you. Make sure to
				never share your credentials with anyone else. We will never ask for
				them!
			</p>
		</div>
	);
};

export default PrivacyPage;
