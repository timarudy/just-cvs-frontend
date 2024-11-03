import WorkExperienceInput from "./inputs/WorkExperienceInput";

const WorkForm = ({ data, updateData }: any) => {
    return (
        <div className="form-container">
            <label>
                Work Experience:
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
