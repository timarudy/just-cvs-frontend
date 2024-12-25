import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";
import WorkForm from "../forms/WorkForm";
import "/src/css/components/views/WorkExperienceView.css";

const WorkExperienceView = ({ data }: { data: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data.work_experience);
    const [notification, setNotification] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

    const getApiUrl = () => {
        const { origin, pathname } = window.location;
        const id = pathname.split("/")[2];
        const apiOrigin = origin.replace(/:\d+/, ":8000");
        return `${apiOrigin}/work-experience/${id}/`;
    };

    const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = async () => {
        try {
            const url = getApiUrl();
            const updatedData = { work_experience: formData };

            await axios.put(url, updatedData);

            const response = await axios.get(url);
            setFormData(response.data.work_experience);

            setIsEditing(false);
            showNotification("Work experience updated successfully!", "success");

            window.location.reload();
        } catch (error) {
            console.error("Error saving work experience:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data.work_experience);
    };

    const updateFormData = (newExperiences: any) => {
        setFormData(newExperiences);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <WorkForm
                        data={formData}
                        updateData={updateFormData}
                    />
                    <div className="form-nav-buttons">
                        <button onClick={handleSave}>save</button>
                        <button onClick={handleCancel}>cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div id="view-container-work">
                        <h2>work experience</h2>
                        {formData.length === 0 ? (
                            <p>No work experience</p>
                        ) : (
                            <ul>
                                {formData.map((experience: any, index: number) => (
                                    <li key={index}>
                                        <strong>{experience.position}</strong> at {experience.place_of_work}{" "}
                                        ({experience.onboarding_date} -{" "}
                                        {experience.offboarding_date || "present"})
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button className="view-nav-buttons" onClick={() => setIsEditing(true)}>modify</button>
                </>
            )}
            {notification && (
                <Notification
                    message={notification}
                    type={notificationType}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};

export default WorkExperienceView;
