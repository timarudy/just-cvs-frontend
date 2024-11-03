import React, { useState } from 'react';

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
                Add
            </button>
            <div>
                {education.map((edu) => (
                    <div key={edu.id}>
                        {edu.educational_organisation} ({edu.year_of_start} - {edu.year_of_end})
                        <button type="button" onClick={() => removeEducation(edu.id)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationInput;
