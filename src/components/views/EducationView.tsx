import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";

const EducationView = ({ data }: { data: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data || { education: [], publication: [] });
    const [notification, setNotification] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

    const getApiUrl = () => {
        const { origin, pathname } = window.location;
        const id = pathname.split("/")[2];
        const apiOrigin = origin.replace(/:\d+/, ":8000");
        return `${apiOrigin}/education/${id}/`;
    };

    const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = async () => {
        try {
            const url = getApiUrl();
            await axios.put(url, formData);
            const response = await axios.get(url);
            setFormData(response.data); // Update all data from the response
            setIsEditing(false);
            showNotification("Education updated successfully!", "success");
        } catch (error) {
            console.error("Error saving education:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data || { education: [], publication: [] }); // Reset to original data
    };

    return (
        <div>
            <h2>Education</h2>
            {isEditing ? (
                <>
                    {formData.education.map((edu: any, index: number) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={edu.educational_organisation}
                                onChange={(e) => {
                                    const updatedData = [...formData.education];
                                    updatedData[index].educational_organisation = e.target.value;
                                    setFormData({ ...formData, education: updatedData });
                                }}
                                placeholder="Educational Organisation"
                            />
                            <input
                                type="number"
                                value={edu.year_of_start || ""}
                                onChange={(e) => {
                                    const updatedData = [...formData.education];
                                    updatedData[index].year_of_start = e.target.value;
                                    setFormData({ ...formData, education: updatedData });
                                }}
                                placeholder="Start Year"
                            />
                            <input
                                type="number"
                                value={edu.year_of_end || ""}
                                onChange={(e) => {
                                    const updatedData = [...formData.education];
                                    updatedData[index].year_of_end = e.target.value;
                                    setFormData({ ...formData, education: updatedData });
                                }}
                                placeholder="End Year"
                            />
                            <hr />
                        </div>
                    ))}
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <ul>
                        {formData.education.map((edu: any, index: number) => (
                            <li key={index}>
                                <strong>{edu.educational_organisation}</strong> -{" "}
                                {edu.year_of_start} to {edu.year_of_end || "Present"}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setIsEditing(true)}>Modify</button>
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

export default EducationView;
