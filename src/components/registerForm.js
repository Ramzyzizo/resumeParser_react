import {React, useState } from 'react'
import bgImg from '../assets/img1.jpg';
import { Link,useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { registerSchema } from '../schemas';
import { endpoint } from '../schemas/endpoint.js'


const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Register';

    }, []);
    const [authenticated, setauthenticated] = useState(null);

    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [error, setError] = useState({});

    const onSubmit = async (values, actions,) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('name', values.name);
        formData.append('password', values.password);
        formData.append('password_confirmation', values.confirmPassword);
        formData.append('CV', values.CV);
          
        fetch(`${endpoint}/api/v1/register`, {
          method: 'POST',
            body:formData
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
            setIsLoading(false);
            
            console.error(error);
        });            
      };
      
    const {values,touched,errors,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues: {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            CV:"",
        },
        validationSchema: registerSchema,
        onSubmit
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleChange({
          target: {
            name: 'CV',
            value: file,
          },
        });
    };
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("user");
      if (!loggedInUser) {
        setauthenticated(loggedInUser);
      }else {
        navigate('/profile');
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
                    <h2>Register Now</h2>
                    <span>Enjoy the service</span>
                    
                    {Object.keys(error).length > 0 && (
                            <div className="validation-summary">
                            <ul>
                                {Object.values(error).map((error, index) => (
                                <li className='error' key={index}>{error}</li>
                                ))}
                            </ul>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} id="form" className="flex flex-col"  enctype="multipart/form-data">
                        <input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text" name="name" placeholder="name"
                            className={errors.email && touched.email? "input-error" : ""}
                        />
                        {errors.email && touched.email && <p className='error'>{ errors.name}</p>}
                        <input
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="email" name="email" placeholder="Email"
                            className={errors.email && touched.email? "input-error" : ""}
                        />
                        {errors.email && touched.email && <p className='error'>{ errors.email}</p>}

                        <input
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password" name="password" placeholder="Password" 
                            className={errors.password && touched.password? "input-error" : ""}
                        />
                        {errors.password && touched.password && <p className='error'>{ errors.password}</p>}

                        <input
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password" name="confirmPassword" placeholder="Confirm Password" 
                            className={errors.confirmPassword && touched.confirmPassword? "input-error" : ""}
                            />
                        {errors.confirmPassword && touched.confirmPassword && <p className='error'>{ errors.confirmPassword}</p>}

                            <div className="flex">
                            <label htmlFor="CV">Upload CV as PDF</label>
                            <input
                                onChange={handleFileChange}
                                onBlur={handleBlur}
                                type="file" name="CV" accept="application/pdf"
                                className={errors.CV && touched.CV? "input-error" : ""}
                            />
                        {errors.CV && touched.CV && <p className='error'>{ errors.CV}</p>}
                            
                            </div>

                            <button type="submit" className="btn">Sign Up</button>
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </form>
                </div>
                <div className="col-2">
                    <img src={bgImg} alt="background" />
                </div>
            </div>
        </section>
    )
}
export default RegisterForm;
