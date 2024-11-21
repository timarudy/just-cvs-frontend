import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import Required from "./Required";
import "/src/css/components/forms/SummaryForm.css"

const SummaryForm = ({ data, updateData, validate }: any) => {
    const [descriptionValidation, setDescriptionValidation] = useState(false);

    const validateDescription = (description: string) => {
        if (!description) {
            validate(false);
            return false;
        }
        if (description.length > 500) {
            validate(false);
            return false;
        }

        validate(true);
        return true;
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const description = e.target.value;
        setDescriptionValidation(validateDescription(description));
        updateData({ ...data, description });
    };

    useEffect(() => {
        handleDescriptionChange({ target: { value: data.description } } as React.ChangeEvent<HTMLInputElement>);
    }, []);

    return (
        <div className="form-container">
            <h1>
                Summary
            </h1>
            <h2>
                Here you can describe yourself, your personal motivation, career goals and what you can offer your potential employer:
            </h2>
            <label>
                <Required isValid={descriptionValidation}>Your summary</Required>
                <input className="summary-input"
                    type="text"
                    value={data.description}
                    onChange={(e) => handleDescriptionChange(e)}
                    maxLength={500}
                />
                <span className="counter">{data.description.length}/500</span>
            </label>
        </div>
    );
};

export default SummaryForm;
