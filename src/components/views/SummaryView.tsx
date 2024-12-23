import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";

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
            <h2>Summary</h2>
            {isEditing ? (
                <>
                    <textarea
                        value={formData}
                        onChange={(e) => setFormData(e.target.value)}
                        rows={5}
                        cols={50}
                    />
                    <div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p>{formData}</p>
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

export default SummaryView;
