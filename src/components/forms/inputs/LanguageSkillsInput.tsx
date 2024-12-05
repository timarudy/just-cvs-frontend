import React, { useState } from 'react';
import "/src/css/components/forms/inputs/LanguageSkillsInput.css"

export interface LanguageSkill {
    id: string;
    name_of_language: string;
    level_of_language: string;
    certification?: string | null;
}

interface LanguageSkillsInputProps {
    languages: LanguageSkill[];
    setLanguages: (languages: LanguageSkill[]) => void;
}

const LanguageSkillsInput: React.FC<LanguageSkillsInputProps> = ({ languages, setLanguages }) => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [certification, setCertification] = useState<string | null>(null);

    const handleAddLanguage = () => {
        const trimmedName = name.trim();
        const trimmedLevel = level.trim();

        if (trimmedName !== '' && trimmedLevel !== '') {
            const newId = crypto.randomUUID();
            const newEntry: LanguageSkill = {
                id: newId,
                name_of_language: trimmedName,
                level_of_language: trimmedLevel,
                certification: certification || null,
            };
            setLanguages([...languages, newEntry]);
            setName(''); // Clear inputs after adding
            setLevel('');
            setCertification(null);
        }
    };

    const removeLanguage = (id: string) => {
        const updatedLanguages = languages.filter((lang) => lang.id !== id);
        setLanguages(updatedLanguages);
    };

    const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCertification(URL.createObjectURL(file)); // Using URL as a placeholder
        } else {
            setCertification(null);
        }
    };

    return (
        <div className="language-skills-input">
            <input
                type="text"
                value={name}
                placeholder="Language"
                onChange={(e) => setName(e.target.value)}
                maxLength={25}
            />
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
            </select>
            <input
                type="file"
                onChange={handleCertificationChange}
                placeholder="Upload Certification (optional)"
            />
            <button type="button" onClick={handleAddLanguage}>
                add
            </button>
            <div>
                {languages.map((lang) => (
                    <div key={lang.id} className="language-entry">
                        {lang.name_of_language} ({lang.level_of_language})
                        {lang.certification && <span> - Certification: {lang.certification}</span>}
                        <button type="button" onClick={() => removeLanguage(lang.id)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageSkillsInput;
