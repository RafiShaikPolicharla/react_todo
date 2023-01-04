import React, { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import FirebaseLoginAccounts from "../firebase/FirebaseLoginAccounts";
import "./styles/authentication.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const SET_EMAIL_COOKIE = "todo_email";
const SET_PASSWORD_COOKIE = "todo_password";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [rememberMe, setRememberMe] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const { currentUser, login } = useAuth();
    const navigate = useNavigate();

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function delete_cookie(name) {
        document.cookie = name +'=; Path=http://localhost/login; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    useEffect(() => {
        currentUser && navigate("/dashboard");
        const email = getCookie(SET_EMAIL_COOKIE)
        const password = getCookie(SET_PASSWORD_COOKIE)
        setUser({email,password})
        if(email && password)
        {
            setRememberMe(true);
        }
        console.log({email,password});
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login(user.email, user.password)
            .then(userCreditional => {
                if(rememberMe)
                {
                    document.cookie = `${SET_EMAIL_COOKIE}=` + user.email + ";path=http://localhost/login";
                    document.cookie = `${SET_PASSWORD_COOKIE}=` + user.password + ";path=http://localhost/login";
                }
                else
                {
                    delete_cookie(SET_EMAIL_COOKIE);
                    delete_cookie(SET_PASSWORD_COOKIE);
                }
                navigate("/dashboard")
            })
            .catch(err => alert(err.message))
            .finally(setLoading(false));
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            title="It should be a valid email address!"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            required={true}
                            onChange={onInputChange}
                            value={user.email}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <div style={{ display: 'flex', gap: "10px" }}>
                            <input
                                type={`${visiblePassword ? "text" : "password"}`}
                                name="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                title="Password should be 8-20 characters and  include at least 1 letter, 1 number and 1 special character!"
                                label="Password"
                                pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                                required={true}
                                onChange={onInputChange}
                                value={user.password}
                            />
                            <div className='eye-password'>
                                {
                                    visiblePassword
                                        ?
                                        <AiOutlineEye onClick={() => setVisiblePassword(false)} />
                                        :
                                        <AiOutlineEyeInvisible onClick={() => setVisiblePassword(true)} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button disabled={loading} type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className=" mt-3 d-flex align-items-center">
                        <input onChange={() => setRememberMe(!rememberMe)} checked={rememberMe} type="checkbox" />
                        <span style={{ marginLeft: "5px" }}>Remember me</span>
                    </div>

                    <div className=" text-right mt-3 mb-3" >
                        Create an Account ?
                        <Link to="/register" style={{ marginLeft: "5px" }} >Register</Link>
                    </div>
                </div>
                <div >
                    <FirebaseLoginAccounts />
                </div>
            </form>
        </div>
    )
}

export default Login;