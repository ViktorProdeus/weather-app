import React from 'react';
import ButtonMui from '@mui/material/Button';

const Button = ({size, color, type, name, callback, variant}) => {
    return (
        <ButtonMui variant={variant} size={size} color={color} type={type} onClick={callback}>
            {name}
        </ButtonMui>
    );
};

export default Button;