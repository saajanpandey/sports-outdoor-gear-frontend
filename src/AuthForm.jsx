import React from "react";

export default function AutoForm() {
    const [isLogin, setIsLogin] = React.useState(true);
    return (
        <div className="container">
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Signup</button>
                </div>
                {isLogin ? <>
                    <div className="form">
                        <h2>Login Form</h2>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <a href='#'> Forgot Password?</a>
                        <button>Login</button>
                        <p>Not a member? <a href='#' onClick={() => setIsLogin(false)}> SignUp Now</a>
                        </p>

                    </div>
                </> : <>
                    <div className="form">
                        <h2>SignUp Form</h2>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Confirm Password" required />
                        <button>Login</button>
                    </div>
                </>
                }
            </div>
        </div>

    );
}