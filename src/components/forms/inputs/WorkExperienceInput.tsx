import React, { useState } from 'react';

export interface WorkExperience {
    id: string;
    position: string;
    place_of_work: string;
    onboarding_date: string;
    offboarding_date?: string | null;
}

interface WorkExperienceInputProps {
    experiences: WorkExperience[];
    setExperiences: (experiences: WorkExperience[]) => void;
}

const WorkExperienceInput: React.FC<WorkExperienceInputProps> = ({ experiences, setExperiences }) => {
    const [workplace, setWorkplace] = useState('');
    const [position, setPosition] = useState('');
    const [onboardingDate, setOnboardingDate] = useState('');
    const [offboardingDate, setOffboardingDate] = useState<string | null>(null);

    const handleAddExperience = () => {
        if (workplace.trim() && position.trim() && onboardingDate) {
            const newExperience: WorkExperience = {
                id: crypto.randomUUID(),
                position: position.trim(),
                place_of_work: workplace.trim(),
                onboarding_date: onboardingDate,
                offboarding_date: offboardingDate || '-',
            };

            console.log(newExperience);

            setExperiences([...experiences, newExperience]);
            setWorkplace('');
            setPosition('');
            setOnboardingDate('');
            setOffboardingDate(null);
        }
    };

    const removeExperience = (id: string) => {
        const updatedExperiences = experiences.filter((exp) => exp.id !== id);
        setExperiences(updatedExperiences);
    };

    return (
        <div className="work-experience-input">
            <input
                type="text"
                value={workplace}
                placeholder="Workplace"
                onChange={(e) => setWorkplace(e.target.value)}
                required
            />
            <input
                type="text"
                value={position}
                placeholder="Position"
                onChange={(e) => setPosition(e.target.value)}
                required
            />
            <input
                type="date"
                value={onboardingDate}
                placeholder="Onboarding Date"
                onChange={(e) => setOnboardingDate(e.target.value)}
                required
            />
            <input
                type="date"
                value={offboardingDate || ''}
                placeholder="Offboarding Date (optional)"
                onChange={(e) => setOffboardingDate(e.target.value)}
            />
            <button type="button" onClick={handleAddExperience}>Add</button>

            <div>
                {experiences.map((exp) => (
                    <div key={exp.id} className="experience-entry">
                        {exp.place_of_work} - {exp.position}
                        ({exp.onboarding_date} to {exp.offboarding_date})
                        <button type="button" onClick={() => removeExperience(exp.id)}>&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkExperienceInput;
