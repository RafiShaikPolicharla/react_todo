import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log({ user });
      setLogin(!!user);
      // this.setState({ isSignedIn: !!user })
    })
  }, [])

  // login
  // register
  // dashboard

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<PrivateRoute><Homepage /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
