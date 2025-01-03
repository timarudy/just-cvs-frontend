import React from 'react';

interface RequiredProps {
    isValid: boolean,
    children: React.ReactNode;
}

const Required: React.FC<RequiredProps> = ({ children, isValid }) => {
    return (
        <span style={{ color: isValid ? 'white' : 'red' }}>
            {children} {isValid ? '' : <span style={{ color: 'red' }}>*</span>}
        </span>
    );
};

export default Required;
