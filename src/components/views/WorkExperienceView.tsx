import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";
import "/src/css/components/views/WorkExperienceView.css";

const WorkExperienceView = ({ data }: { data: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data.work_experience);
    const [notification, setNotification] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

    // Construct the API URL dynamically for work experience
    const getApiUrl = () => {
        const { origin, pathname } = window.location;

        // Extract the ID from the pathname (e.g., /work-experience/1)
        const id = pathname.split("/")[2];
        const apiOrigin = origin.replace(/:\d+/, ":8000"); // Replace with port 8000

        return `${apiOrigin}/work-experience/${id}/`;
    };

    // Show notification
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
        } catch (error) {
            console.error("Error saving work experience:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data.work_experience);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <div id="view-container-work">
                        <h2>work experience</h2>
                        {formData.map((experience: any, index: number) => (
                            <div id="work-mod-inputs" key={index}>
                                <input
                                    type="text"
                                    value={experience.position}
                                    onChange={(e) => {
                                        const updatedFormData = [...formData];
                                        updatedFormData[index].position = e.target.value;
                                        setFormData(updatedFormData);
                                    }}
                                />
                                <input
                                    type="text"
                                    value={experience.place_of_work}
                                    onChange={(e) => {
                                        const updatedFormData = [...formData];
                                        updatedFormData[index].place_of_work = e.target.value;
                                        setFormData(updatedFormData);
                                    }}
                                />
                                <input
                                    type="date"
                                    value={experience.onboarding_date}
                                    onChange={(e) => {
                                        const updatedFormData = [...formData];
                                        updatedFormData[index].onboarding_date = e.target.value;
                                        setFormData(updatedFormData);
                                    }}
                                />
                                <input
                                    type="date"
                                    value={experience.offboarding_date || ""}
                                    onChange={(e) => {
                                        const updatedFormData = [...formData];
                                        updatedFormData[index].offboarding_date = e.target.value;
                                        setFormData(updatedFormData);
                                    }}
                                />
                                <hr />
                            </div>
                        ))}
                    </div>
                    
                    <div className="form-nav-buttons">
                        <button onClick={handleSave}>save</button>
                        <button onClick={handleCancel}>cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div id="view-container-work">
                        <h2>work experience</h2>
                        <ul>
                            {formData.map((experience: any, index: number) => (
                                <li key={index}>
                                    <strong>{experience.position}</strong> at {experience.place_of_work} {" "}
                                    ({experience.onboarding_date} - {" "}
                                    {experience.offboarding_date || "present"})
                                    <hr />
                                </li>
                            ))}
                        </ul>
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
