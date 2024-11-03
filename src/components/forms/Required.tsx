import React from 'react';

interface RequiredProps {
    isValid: boolean,
    children: React.ReactNode; // The label text
}

const Required: React.FC<RequiredProps> = ({ children, isValid }) => {
    return (
        <span style={{ color: isValid ? 'black' : 'red' }}>
            {children} {isValid ? '' : <span style={{ color: 'red' }}>*</span>}
        </span>
    );
};

export default Required;
