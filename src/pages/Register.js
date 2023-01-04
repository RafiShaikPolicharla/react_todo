// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseLoginAccounts from '../firebase/FirebaseLoginAccounts';
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from '../context/AuthContext';
const Register = () => {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleReEnterPasswod, setVisibleReEnterPassword] = useState(false);
    const { signup,currentUser } = useAuth();
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    useEffect(()=>{
        currentUser && navigate("/dashboard")
    },[])
    const handleSumbit = async (e) => {
        e.preventDefault();
        // const auth = getAuth()
        setLoading(true);
        const userName = `${user.firstname} ${user.lastname}`;
        await signup(user.email, user.password)
            .then(userCredentials => {
                const user = userCredentials.user;
                updateProfile(auth.currentUser, {
                    displayName: userName
                })
                    .then(sucess => navigate("/dashboard"))
            }
            ).catch(err => alert(err.message))
            .finally(setLoading(false));
        console.log({ userDetails: user });
    }

    return (
        <div>
            <div className="Auth-form-container" onSubmit={handleSumbit}>
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Register</h3>

                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                className="form-control mt-1"
                                placeholder="e.g Virat"
                                required={true}
                                pattern="^[a-zA-Z0-9]{3,20}$"
                                title="Username should be 3-16 characters and shouldn't include any special character!"
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                className="form-control mt-1"
                                placeholder="e.g kohli"
                                required={true}
                                pattern="^[a-zA-Z0-9]{3,20}$"
                                title="Username should be 3-16 characters and shouldn't include any special character!"
                                onChange={onInputChange}
                            />
                        </div>
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
                        <div className="form-group mt-3">
                            <label>Re-Enter Password</label>
                            <div style={{ display: 'flex', gap: "10px" }}>
                                <input
                                    type={`${visibleReEnterPasswod ? "text" : "password"}`}
                                    className="form-control mt-1"
                                    placeholder="Confirm Password"
                                    title="Passwords don't match!"
                                    label="Confirm Password"
                                    pattern={user.password}
                                    required={true}
                                />
                                <div className='eye-password'>
                                    {
                                        visibleReEnterPasswod
                                            ?
                                            <AiOutlineEye onClick={() => setVisibleReEnterPassword(false)} />
                                            :
                                            <AiOutlineEyeInvisible onClick={() => setVisibleReEnterPassword(true)} />
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button disabled={loading} type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <div className="text-right mt-3 mb-3">
                            Already registered?
                            <Link style={{ marginLeft: "5px" }} to="/login"  >
                                Sign In
                            </Link>
                        </div>
                    </div>
                    <div >
                        <FirebaseLoginAccounts />
                    </div>
                </form>
            </div>


        </div>
    )
}

export default Register