import React from 'react';
import EducationInput, { Education } from './inputs/EducationInput';
import PublicationInput, { Publication } from './inputs/PublicationsInput';
import "/src/css/components/forms/EducationForm.css"

interface EducationFormProps {
    data: { education: Education[]; publication: Publication[] };
    updateData: (newData: any) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
    return (
        <div className="form-container-ed">
            <label>
                <p>education:</p>
                <EducationInput
                    education={data.education}
                    setEducation={(newEducation) =>
                        updateData({ ...data, education: newEducation })
                    }
                />
            </label>
            <label>
                <p>publications:</p>
                <PublicationInput
                    publications={data.publication}
                    setPublications={(newPublications) =>
                        updateData({ ...data, publication: newPublications })
                    }
                />
            </label>
        </div>
    );
};

export default EducationForm;
