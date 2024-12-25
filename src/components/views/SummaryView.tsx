import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";
import "/src/css/components/views/SummaryView.css";

const SummaryView = ({ data }: { data: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data);
    const [notification, setNotification] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

    const getApiUrl = () => {
        const { origin, pathname } = window.location;
        const id = pathname.split("/")[2];
        const apiOrigin = origin.replace(/:\d+/, ":8000");
        return `${apiOrigin}/summary/${id}/`;
    };

    const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = async () => {
        try {
            const url = getApiUrl();
            await axios.put(url, { summary: formData });
            const response = await axios.get(url);
            setFormData(response.data.summary);
            setIsEditing(false);
            showNotification("Summary updated successfully!", "success");
        } catch (error) {
            console.error("Error saving summary:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <div id="view-container-summary">
                        <h1>Summary</h1>
                        <textarea
                            className="summary-input"
                            value={formData}
                            onChange={(e) => setFormData(e.target.value)}
                            maxLength={500}
                            rows={4}
                        />
                    </div>
                    <div className="form-nav-buttons">
                        <button onClick={handleSave}>save</button>
                        <button onClick={handleCancel}>cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div id="view-container-summary">
                        <h1>Summary</h1>
                        <div id="summary-display">
                            <img id="pd-avatar" src="https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png" alt="avatar" style={{ maxWidth: "300px", maxHeight: "300px" }}/>   {/*  FIX!!! */}
                            <p>{formData}</p>
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

export default SummaryView;
