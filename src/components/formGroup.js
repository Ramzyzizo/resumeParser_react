import React from 'react';

const FormGroup = (props) => {
    const {name, data,handleChange,label=name} = props;
return(
    <div className='form-group'>
        <label htmlFor={label}>{label}</label>
        <input
            onChange={handleChange}
            value={data}
            type="text" name={name} placeholder={data ?? name}
            required
        />
    </div >
);
};
export default FormGroup;
