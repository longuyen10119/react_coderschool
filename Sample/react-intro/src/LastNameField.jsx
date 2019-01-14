import React from 'react';
import TextField from './TextField';

const LastNameField = ({...rest}) =>(
    <TextField 
        name="lastName"
        label="Last Name:"
        {...rest} />
);
export default LastNameField;