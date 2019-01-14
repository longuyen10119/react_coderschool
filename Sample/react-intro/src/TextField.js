import React, { Component } from 'react';
import styles from './style.js';

const TextField = ({name, onChange, onBlur, error, label}) => (
    <div style={styles.inputGroup}>
        <label>
            {label}
            <input 
                style={styles.input}
                type="text"
                name={name}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <div style={styles.error}>{error}</div>}
        </label>
    </div>
);
export default TextField;