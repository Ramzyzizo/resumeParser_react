import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Weather from './weather';
import FormGroup from './formGroup';
import { endpoint } from '../schemas/endpoint.js'


const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [authenticated, setauthenticated] = useState(null);
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    address: '',
    birthdate: '',
    marital: '',
    military: '',
    education: '',
    education_date: '',
    skills: '',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const update = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      'email': email,
      'token': token,
    };

    fetch(`${endpoint}/api/v1/update`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ formValues, data })
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
        sessionStorage.removeItem('user');
        navigate('/login');
          
        } else {
          console.log(data.response);
          setSuccess(true)
          setTimeout(() => {
          setSuccess(true)
            setSuccess(false);
          }, 3000);
          setIsLoading(false);

        }
      })
      .catch(error => {
        setError(data.errors);
        setIsLoading(false);
      });
  };



  useEffect(() => {
    document.title = 'Profile';
  }, []);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      const userData = JSON.parse(loggedInUser);
      setEmail(userData.email);
      setToken(userData.token);
      const email = userData.email;
      const token = userData.token;
      const send_data = {
        'email': email,
        'token': token,
      };
      // Fetch data here
      fetch(`${endpoint}/api/v1/get_user_data`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(send_data)
      })
        .then(response => response.json())
        .then(data => {
          if (data.errors) {
            sessionStorage.removeItem('user');
            navigate('/login');
          } else {
            setFormValues((prevFormValues) => ({
              ...prevFormValues,
              name: data.name,
              phone: data.phone,
              address: data.adress,
              birthdate: data.birthdate,
              marital: data.marital_status,
              military: data.military_status,
              education: data.education,
              education_date: data.education_date,
              skills: data.skills,
            }));
            setIsLoading(false)
          }
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    } else {
      navigate('/');
    }
  }, []);

  return (
    <section>
      <Navbar email={email} />
      <Weather />
      <section id='App'>
        {isLoading ? (
          <div className="loader">
            <div className="loader-wheel"></div>
            <br />
            <div className="loader-text"></div>
          </div>
        ) : (
          <>
          </>
        )}

        {success ? (
          <div className="success">
            <div className="success-text"></div>
            </div>
        ) : (
          <></>   
        )}
            <div className="register">
              <div className='title'>
                <h2 style={{ display: 'block' }}>Your resume data</h2>
              </div>
              <br />
              {Object.keys(error).length > 0 && (
                <div className="validation-summary">
                  <ul>
                    {Object.values(error).map((error, index) => (
                      <li className='error' key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}


              <form onSubmit={update} className="container" action=''>
                <div className="flex ">
                  <div className="col-left">
                    <FormGroup name="name" data={formValues.name} handleChange={handleChange} />
                    <FormGroup name="address" data={formValues.address} handleChange={handleChange} />
                    <FormGroup label="Marital Status" name="marital" data={formValues.marital} handleChange={handleChange} />
                    <FormGroup name="education" data={formValues.education} handleChange={handleChange} />
                    {
                      formValues.skills.length > 0 ? (
                        formValues.skills.map((skill, index) => (
                          index % 2 === 0 ? (
                            <React.Fragment key={index}>
                              <FormGroup
                                name={`Skill[${index + 1}]`}
                                label="skill"
                                data={skill.name}
                                handleChange={(e) => {
                                  const updatedSkills = [...formValues.skills];
                                  updatedSkills[index].name = e.target.value;
                                  setFormValues({
                                    ...formValues,
                                    skills: updatedSkills,
                                  });
                                }} />
                              <FormGroup
                                name="level"
                                data={skill.level}
                                handleChange={(e) => {
                                  const updatedSkills = [...formValues.skills];
                                  updatedSkills[index].level = e.target.value;
                                  setFormValues({
                                    ...formValues,
                                    skills: updatedSkills,
                                  });
                                }} />
                            </React.Fragment>
                          ) : <></>
                        ))
                      ) : <></>
                    }

                  </div>
                  <div className="col-right">
                    <FormGroup name="phone" data={formValues.phone} handleChange={handleChange} />
                    <FormGroup name="birthdate"
                      data={formValues.birthdate} handleChange={handleChange} />
                    <FormGroup name="military" label="Military Status" data={formValues.military} handleChange={handleChange} />
                    <FormGroup name="education_date" label="Education Date"
                      data={formValues.education_date} handleChange={handleChange} />

                    {
                      formValues.skills.length > 0 ? (
                        formValues.skills.map((skill, index) => (
                          index % 2 !== 0 ? (
                            <React.Fragment key={index}>
                              <FormGroup name={`Skill (${index + 1})`} data={skill.name}
                                handleChange={(e) => {
                                  const updatedSkills = [...formValues.skills];
                                  updatedSkills[index].name = e.target.value;
                                  setFormValues({
                                    ...formValues,
                                    skills: updatedSkills,
                                  });
                                }} />
                              <FormGroup name="level" data={skill.level}
                                handleChange={(e) => {
                                  const updatedSkills = [...formValues.skills];
                                  updatedSkills[index].level = e.target.value;
                                  setFormValues({
                                    ...formValues,
                                    skills: updatedSkills,
                                  });
                                }} />
                            </React.Fragment>
                          ) : <></>
                        ))
                      ) : <></>
                    }

                  </div>

                </div>
                <div>
                  <button id="form" type="submit" className="btn">Update</button>
                </div>
              </form>
            </div>
          </section>
    </section >
      );
}
      export default Profile;