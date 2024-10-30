import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../Images/logo.png";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.email === "admin@gmail.com";
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/');
        window.location.reload();
    };

    return (
        <header className={styles.header}>
            {/* Left -  Logo */}
            <div className={styles.logo_container}>
                <Link to="/">
                    <img src={logo} alt="Logo"
                         className={styles.logo} />
                </Link>
            </div>

            {/* Middle  */}
            <nav className={styles.nav_buttons}>
                <a href="/" className={styles.nav_link}>
                    Home
                </a>

                {isAdmin && (
                    <Link to="/bookpost" className={styles.nav_link}>
                        Book Post
                    </Link>
                )}
            </nav>

            {/*Right*/}
            <div className={styles.right_buttons}>
                {isLoggedIn ? (
                    <button className={styles.white_btn}
                            onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        <button className={styles.white_btn}>Login</button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
