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
            <h2>Summary</h2>
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
