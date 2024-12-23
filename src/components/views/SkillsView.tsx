import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";

const SkillsView = ({ data }: { data: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data);
    const [notification, setNotification] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

    const getApiUrl = () => {
        const { origin, pathname } = window.location;
        const id = pathname.split("/")[2];
        const apiOrigin = origin.replace(/:\d+/, ":8000");
        return `${apiOrigin}/skills/${id}/`;
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
            setFormData(response.data.skills);
            setIsEditing(false);
            showNotification("Skills updated successfully!", "success");
        } catch (error) {
            console.error("Error saving skills:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data);
    };

    return (
        <div>
            <h2>Skills</h2>
            {isEditing ? (
                <>
                    <label>
                        Hard Skills:
                        <input
                            type="text"
                            value={formData.hard_skills.join(", ")}
                            onChange={(e) =>
                                setFormData({ ...formData, hard_skills: e.target.value.split(", ") })
                            }
                        />
                    </label>
                    <label>
                        Soft Skills:
                        <input
                            type="text"
                            value={formData.soft_skills.join(", ")}
                            onChange={(e) =>
                                setFormData({ ...formData, soft_skills: e.target.value.split(", ") })
                            }
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>Hard Skills</h3>
                    <ul>
                        {formData.hard_skills.map((skill: string, index: number) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                    <h3>Soft Skills</h3>
                    <ul>
                        {formData.soft_skills.map((skill: string, index: number) => (
                            <li key={index}>{skill}</li>
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

export default SkillsView;
