import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import Required from "./Required";
import "/src/css/components/forms/SummaryForm.css"

const SummaryForm = ({ data, updateData, validate }: any) => {
    const [descriptionValidation, setDescriptionValidation] = useState(false);

    const validateDescription = (description: string) => {
        if (!description || description.length > 500) {
            validate(false);
            return false;
        }
        validate(true);
        return true;
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const description = e.target.value;
        setDescriptionValidation(validateDescription(description));
        updateData({ ...data, description });
    };

    useEffect(() => {
        handleDescriptionChange({ target: { value: data.description } } as React.ChangeEvent<HTMLTextAreaElement>);
    }, []);

    return (
        <div className="form-container">
            <h1 id="summary-h1">Summary</h1>
            <h2 id="summary-h2">Here you can describe yourself, your personal motivation, career goals and what you can offer your potential employer:</h2>
            <label>
                <Required isValid={descriptionValidation}>Your summary</Required>
                <textarea 
                    className="summary-input"
                    value={data.description}
                    onChange={(e) => handleDescriptionChange(e)}
                    maxLength={500}
                    rows={4}
                />
                <span id="counter">{data.description.length}/500</span>
            </label>
        </div>
    );
};

export default SummaryForm;