import React from 'react';

const Button = ({className, type, name, callback}) => {
    return (
        <button className={className} type={type} onClick={callback}>
            {name}
        </button>
    );
};

export default Button;