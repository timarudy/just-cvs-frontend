import React from 'react';
import EducationInput, { Education } from './inputs/EducationInput';
import "/src/css/components/forms/EducationForm.css"

interface EducationFormProps {
    data: { education: Education[] };
    updateData: (newData: any) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
    return (
        <div className="form-container-ed">
            <label>
                <p>education</p>
                <EducationInput
                    education={data.education}
                    setEducation={(newEducation) =>
                        updateData({ ...data, education: newEducation })
                    }
                />
            </label>
        </div>
    );
};

export default EducationForm;
