import React, { useState } from 'react'
import bgImg from '../assets/img1.jpg';
import { Link,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { endpoint } from '../schemas/endpoint.js'
import { loginSchema } from '../schemas/loginrules';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(null);
    const [error, setError] = useState({});

    const onSubmit = async (values, actions,) => {
        setIsLoading(true);

        const data = {
            'email': values.email,
            'password': values.password,
        };
        fetch(`${endpoint}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    setError(data.errors);
            setIsLoading(false);

                } else {
                    sessionStorage.setItem('user', JSON.stringify(data));
                    console.log('Done');
                    navigate('/profile');
                }
            })
            .catch(error => {
                console.error(error);
            setIsLoading(false);

            });
    };
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit
    });
    useEffect(() => {
        document.title = 'Login';
    }, []);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("user");
        if (loggedInUser) {
            navigate('/profile');
        } else {
      setauthenticated(loggedInUser);
      }
  }, []);
        return (
            <section id='App'>
                  {isLoading ? (
                    <div class="loader">
                    <div class="loader-wheel"></div>
                    <br />
                    <div class="loader-text"></div>
                    </div>
                ) : (
                    <>
                    </>
                )}
                <div className="register">
                    <div className="col-1">
                        <h2>Login Now</h2>
                        <span>Enjoy the service</span>
                        <form onSubmit={handleSubmit} id="form" className='flex flex-col' action="">
                            <input
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text" name="email" placeholder="Email"
                                className={errors.email && touched.email ? "input-error" : ""}
                            />
                            {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                            {Object.keys(error).length > 0 && (
                                <div className="validation-summary">
                                    <p className='error'>{error}</p>
                                </div>
                            )}
                            <input
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password" name="password" placeholder="Password"
                                className={errors.password && touched.password ? "input-error" : ""}
                            />
                            {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                            <button type='submit' className='btn'>Login</button>
                            <p>Don't have an account? <Link to="/">Register</Link></p>
                        </form>
                    </div>
                    <div className="col-2">
                        <img src={bgImg} alt="background" />
                    </div>
                </div>
            </section>
        )
}
export default LoginForm;