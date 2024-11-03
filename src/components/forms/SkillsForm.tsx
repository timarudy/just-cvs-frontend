import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import TagsInput from "./inputs/TagsInput";
import LanguageSkillsInput from "./inputs/LanguageSkillsInput";

const SkillsForm = ({ data, updateData }: any) => {
    return (
        <div className="form-container">
            <label>
                Hard Skills:
                <TagsInput
                    tags={data.hard_skills}
                    setTags={(newHardSkills) =>
                        updateData({ ...data, hard_skills: newHardSkills })
                    }
                />
            </label>
            <label>
                Soft Skills:
                <TagsInput
                    tags={data.soft_skills}
                    setTags={(newSoftSkills) =>
                        updateData({ ...data, soft_skills: newSoftSkills })
                    }
                />
            </label>
            <label>
                Languages:
                <LanguageSkillsInput
                    languages={data.language}
                    setLanguages={(newLanguages) =>
                        updateData({ ...data, languages: newLanguages })
                    }
                />
            </label>
        </div>
    );
};

export default SkillsForm;
