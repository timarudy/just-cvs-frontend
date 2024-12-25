import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";
import "/src/css/components/views/SkillsView.css";
import SkillsForm from "../forms/SkillsForm";
import { extractTagValues } from "../../extensions/arrayExtensions";

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

    console.log(formData.language);

    const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = async () => {
        try {
            const cvData = {
                hard_skills: extractTagValues(formData.hard_skills),
                soft_skills: extractTagValues(formData.soft_skills),
                language: formData.language,
            };

            const url = getApiUrl();
            await axios.put(url, cvData);
            const response = await axios.get(url);

            setFormData(response.data);
            setIsEditing(false);
            showNotification("Skills updated successfully!", "success");

            window.location.reload();
        } catch (error) {
            console.error("Error saving skills:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data);
    };

    const updateFormData = (newData: Partial<typeof formData>) => {
        setFormData((prevState: any) => ({
            ...prevState,
            ...newData,
        }));
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <SkillsForm
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
                    <div id="view-container-skills">
                        <div id="skills-display">
                            <div id="hard-skills">
                                <h2>hard skills</h2>
                                <ul>
                                    {extractTagValues(formData.hard_skills).map((skill: string, index: number) => (
                                        <li className="skills" key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div id="soft-skills">
                                <h2>soft skills</h2>
                                <ul>
                                    {extractTagValues(formData.soft_skills).map((skill: string, index: number) => (
                                        <li className="skills" key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2>languages</h2>
                                <ul>
                                    {formData.language.map((language: { name_of_language: string; level_of_language: string }, index: number) => (
                                        <li className="languages" key={index}>
                                            {language.name_of_language} - {language.level_of_language}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
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

export default SkillsView;
