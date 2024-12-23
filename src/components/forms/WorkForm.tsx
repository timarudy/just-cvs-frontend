import WorkExperienceInput from "./inputs/WorkExperienceInput";
import "/src/css/components/forms/WorkForm.css"

const WorkForm = ({ data, updateData }: any) => {
    return (
        <div className="form-container-work">
            <label>
                <p>work experience:</p>
                <WorkExperienceInput
                    experiences={data}
                    setExperiences={(newExperiences) =>
                        updateData(newExperiences)
                    }
                />
            </label>
        </div>
    );
};

export default WorkForm;
