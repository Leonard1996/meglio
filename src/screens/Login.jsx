import React, { useEffect } from "react"
import GreeniaLogo from "../assets/images/greenia-logo.png";
import Password from "../assets/images/password.png";
import User from "../assets/images/user.png";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../app/store";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth);
    // const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        const checkAuth = () => {
            if (authUser.token) {
                navigate('/');
            }
        }
        checkAuth();
    }, [authUser.token]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(authActions.startLogin());
        dispatch(authActions.login({ email, password }));
    }

    // console.log(authUser.isLoading);

    return (
        <div className="Auth-form-container d-flex justify-content-center bg-img">
            <div onSubmit={handleSubmit} className="Auth-form container-form">
                <div className="Auth-form-content">
                    <div className="d-flex justify-content-center"><img src={GreeniaLogo} alt=""/></div>
                    <h3 className="Auth-form-title">Accedi al tuo account</h3>
                    <div className="form-group mt-3">
                        <label>Username/Email</label>
                        <div className="input-group inp-login">
                            <img className="input-img" src={User} alt=""/>
                            <input
                                onChange={({target: {value}}) => setEmail(value)}
                                type="email"
                                id="username"
                                value={email}
                                autoComplete="off"
                                required={true}
                                className="form-control inpt mt-1"/>
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label>Password</label>
                        <div className="input-group inp-login">
                            <img className="input-img" src={Password} alt=""/>
                            <input
                                onChange={({target: {value}}) => setPassword(value)}
                                type="password"
                                id="password"
                                value={password}
                                required={true}
                                className="form-control mt-1 inpt"/>
                        </div>
                    </div>
                    <div className="mt-3">
                        {authUser.isLoading ? 
                            <button className="btn btn-primary btn-secondary w-100">Attendere prego...</button>
                            : 
                            <button onClick={handleSubmit} className="btn btn-primary btn-login w-100">Login</button>
                        }
                    </div>
                    {error && (
                        <p className="justify-content-center d-grid gap-2 mt-3 mt-2 link-danger">
                            {errorMessage}
                        </p>
                    )}
                    <p className="forgot-password justify-content-center d-grid gap-2 mt-3 mt-2">
                        <a href="#">Forgot password?</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
