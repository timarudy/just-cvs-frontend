import React, { useState } from 'react';
import "/src/css/components/forms/inputs/EducationInput.css"

export interface Education {
    id: string;
    educational_organisation: string;
    year_of_start: string;
    year_of_end: string;
}

interface EducationInputProps {
    education: Education[];
    setEducation: (education: Education[]) => void;
}

const EducationInput: React.FC<EducationInputProps> = ({ education, setEducation }) => {
    const [institution, setInstitution] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    const handleAddEducation = () => {
        const newEntry: Education = {
            id: crypto.randomUUID(),
            educational_organisation: institution.trim(),
            year_of_start: startYear.trim(),
            year_of_end: endYear.trim(),
        };

        if (newEntry.educational_organisation) {
            setEducation([...education, newEntry]);
            setInstitution('');
            setStartYear('');
            setEndYear('');
        }
    };

    const removeEducation = (id: string) => {
        setEducation(education.filter((edu) => edu.id !== id));
    };

    return (
        <div>
            <div className="label-inputs">
                <input
                    type="text"
                    value={institution}
                    placeholder="Institution"
                    onChange={(e) => setInstitution(e.target.value)}
                />
                <input
                    type="text"
                    value={startYear}
                    placeholder="Start Year"
                    onChange={(e) => setStartYear(e.target.value)}
                />
                <input
                    type="text"
                    value={endYear}
                    placeholder="End Year"
                    onChange={(e) => setEndYear(e.target.value)}
                />
                <button type="button" onClick={handleAddEducation}>
                    add
                </button>
            </div>

            <div id="ed-list">
                {education.map((edu) => (
                    <div key={edu.id}>
                        <div id="fancy-lines-ed">‎</div>
                         <button id="remove-button" type="button" onClick={() => removeEducation(edu.id)}>
                            &times;
                        </button>
                        {edu.educational_organisation} ({edu.year_of_start} - {edu.year_of_end})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationInput;
