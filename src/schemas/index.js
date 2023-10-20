import * as Yup from 'yup';

var passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
 
export const registerSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(5),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(5).matches(passwordRules,{message:"create a stronger password"}),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
          CV: Yup.mixed()
          .required('CV is required')
    });