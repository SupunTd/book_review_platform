import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/main";
import Signup from "./components/Singup/signup";
import Login from "./components/Login/login";
import BookPost from "./components/BookPost/bookPost";
import Review from "./components/Review/review";

function App() {
	const user = JSON.parse(localStorage.getItem("user"));
	const isAdmin = user && user.email === "admin@gmail.com";

	return (
		<Routes>
			<Route path="*" element={<Navigate replace to="/login" />} />

			<Route path="/" element={user ? <Main /> : <Navigate replace to="/login" />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/bookpost" element={isAdmin ? <BookPost /> : <Navigate replace to="/login" />} /> //routing control
			<Route path="/review/:bookId" element={<Review />} />
		</Routes>
	);
}

export default App;
