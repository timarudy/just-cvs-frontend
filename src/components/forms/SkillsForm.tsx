import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import TagsInput from "./inputs/TagsInput";
import LanguageSkillsInput from "./inputs/LanguageSkillsInput";
import "/src/css/components/forms/SkillsForm.css"

const mockLanguages = [
    {
        id: crypto.randomUUID(),
        name_of_language: "English",
        level_of_language: "Native",
        certification: null
    },
    {
        id: crypto.randomUUID(),
        name_of_language: "Spanish",
        level_of_language: "Intermediate",
        certification: null
    },
    {
        id: crypto.randomUUID(),
        name_of_language: "French",
        level_of_language: "Beginner",
        certification: "long long long long long long string"
    }
];

const SkillsForm = ({ data, updateData }: any) => {
    return (
        <div className="form-container-skills">
            <div className="skills-subflex">
                <label id="hard-skills">
                    hard skills
                    <TagsInput
                        tags={data.hard_skills}
                        setTags={(newHardSkills) =>
                            updateData({ ...data, hard_skills: newHardSkills })
                        }
                    />
                </label>
                <label id="soft-skills">
                    soft skills
                    <TagsInput
                        tags={data.soft_skills}
                        setTags={(newSoftSkills) =>
                            updateData({ ...data, soft_skills: newSoftSkills })
                        }
                    />
                </label>
            </div>
            <div className="language-subflex">
                <label>
                    <p id="language-label">languages</p>
                    <LanguageSkillsInput
                        languages={data.languages || mockLanguages}  // mock setup
                        setLanguages={(newLanguages) =>
                            updateData({ ...data, languages: newLanguages }) 
                        }
                    />
                </label>
            </div>
{/* 
            <div className="language-subflex">
                <label>
                    <p id="language-label">languages:</p>
                    <LanguageSkillsInput
                        languages={data.languages} 
                        setLanguages={(newLanguages) =>
                            updateData({ ...data, languages: newLanguages })
                        }
                    />
                </label>
            </div>
 */}
        </div>
    );
};

export default SkillsForm;
