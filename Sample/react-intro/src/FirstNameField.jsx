import React from 'react';
import TextField from './TextField';

const FirstNameField = ({...rest}) =>(
    <TextField 
        name="firstName"
        label="First Name:"
        {...rest} />
);
export default FirstNameField;