import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";
import EducationForm from "../forms/EducationForm";
import "/src/css/components/views/EducationView.css";

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

    const updateFormData = (newData: any) => {
        setFormData((prevState: any) => ({
            ...prevState,
            ...newData,
        }));
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <EducationForm
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
                    <div id="view-container-edu">
                        <h2>Education</h2>
                        <ul>
                            {formData.education.length === 0 ? (
                                <p>No education records</p>
                            ) : (
                                formData.education.map((edu: any, index: number) => (
                                    <li key={index}>
                                        <strong>{edu.educational_organisation}</strong> -{" "}
                                        {edu.year_of_start} to {edu.year_of_end || "present"}
                                        <hr />
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div id="view-container-pub">
                        <h2>Publications</h2>
                        <ul>
                            {formData.publication.length === 0 ? (
                                <p>No publications</p>
                            ) : (
                                formData.publication.map((pub: any, index: number) => (
                                    <li key={index}>
                                        <strong>{pub.title}</strong> - {pub.year}
                                        <hr />
                                    </li>
                                ))
                            )}
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

export default EducationView;
