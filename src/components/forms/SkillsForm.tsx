import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import TagsInput from "./inputs/TagsInput";
import LanguageSkillsInput from "./inputs/LanguageSkillsInput";
import "/src/css/components/forms/SkillsForm.css"

const SkillsForm = ({ data, updateData }: any) => {
    return (
        <div className="form-container-skills">
            <div className="skills-subflex">
                <label id="hard-skills">
                    hard skills:
                    <TagsInput
                        tags={data.hard_skills}
                        setTags={(newHardSkills) =>
                            updateData({ ...data, hard_skills: newHardSkills })
                        }
                    />
                </label>
                <label id="soft-skills">
                    soft skills:
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
                    <p id="language-label">languages:</p>
                    <LanguageSkillsInput
                        languages={data.language}
                        setLanguages={(newLanguages) =>
                            updateData({ ...data, languages: newLanguages })
                        }
                    />
                </label>
            </div>
        </div>
    );
};

export default SkillsForm;
