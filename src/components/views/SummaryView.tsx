import React, { useEffect, useState } from "react";
import axios from "axios";
import Notification from "../Notification";
import SummaryForm from "../forms/SummaryForm";

const SummaryView = ({ data }: { data: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data);
    const [isValid, setIsValid] = useState(false);
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
        if (!validateForm()) {
            showNotification("Please correct the errors before saving.", "error");
            return;
        }

        try {
            const url = getApiUrl();
            await axios.put(url, formData);

            const response = await axios.get(url);
            setFormData(response.data);

            setIsEditing(false);
            showNotification("Summary updated successfully!", "success");
        } catch (error) {
            console.error("Error saving summary:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const updateFormData = (newData: any) => {
        setFormData((prevState: any) => ({ ...prevState, ...newData }));
    };    

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data);
    };

    const validateForm = () => {
        const validateSummary = (description: string) => description.length > 0 && description.length <= 500;
        return validateSummary(formData);
    };

    useEffect(() => {
        setIsValid(validateForm());
    }, [formData]);

    return (
        <div>
            {isEditing ? (
                <>
                    <SummaryForm
                        data={{
                            description: formData
                        }}
                        updateData={updateFormData}
                        validate={setIsValid}
                        showNotification={(message: string) => showNotification(message, "info")}
                    />
                    <div>
                        <button onClick={handleSave} disabled={!isValid}>
                            Save
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
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
