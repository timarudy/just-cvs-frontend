import React, { useState } from 'react';
import "/src/css/components/forms/inputs/LanguageSkillsInput.css"

export interface LanguageSkill {
    id: string;
    name_of_language: string;
    level_of_language: string;
}

interface LanguageSkillsInputProps {
    languages: LanguageSkill[];
    setLanguages: (languages: LanguageSkill[]) => void;
}

const LanguageSkillsInput: React.FC<LanguageSkillsInputProps> = ({ languages, setLanguages }) => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');

    const handleAddLanguage = () => {
        const trimmedName = name.trim();
        const trimmedLevel = level.trim();

        if (trimmedName !== '' && trimmedLevel !== '') {
            const newId = crypto.randomUUID();
            const newEntry: LanguageSkill = {
                id: newId,
                name_of_language: trimmedName,
                level_of_language: trimmedLevel,
            };
            setLanguages([...languages, newEntry]);
            setName('');
            setLevel('');
        }
    };

    const removeLanguage = (id: string) => {
        const updatedLanguages = languages.filter((lang) => lang.id !== id);
        setLanguages(updatedLanguages);
    };

    return (
        <div id='language-disp'>
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
                <button type="button" onClick={handleAddLanguage}>
                    add
                </button>
                
            </div>
            <div id='lang_list'>
                {languages.map((lang) => (
                    <div key={lang.id} className="language-entry">
                        <div id="fancy-lines">‎</div>
                        {lang.name_of_language} ({lang.level_of_language})
                        <button id='remove-button' onClick={() => removeLanguage(lang.id)}>&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageSkillsInput;
