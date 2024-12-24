import { useState, useEffect } from "react";
import axios from "axios";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import Notification from "../Notification";

const PersonalDetailsView = ({ data }: { data: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(data);
    const [isValid, setIsValid] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

    const getApiUrl = () => {
        const { origin, pathname } = window.location;

        const apiPath = pathname.split("/").slice(0, 3).join("/");
        const apiOrigin = origin.replace(/:\d+/, ":8000");
        return `${apiOrigin}${apiPath}/`;
    };

    const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => setNotification(null), 3000);
    };

    const validateForm = () => {
        const validateFullName = (name: string) => /^[a-zA-Z\s]+$/.test(name);
        const validateEmail = (email: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validateDateOfBirth = (dob: string) => !!dob;

        return (
            validateFullName(formData.full_name) &&
            validateEmail(formData.email) &&
            validateDateOfBirth(formData.date_of_birth)
        );
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
            showNotification("Personal details updated successfully!", "success");
        } catch (error) {
            console.error("Error saving personal details:", error);
            showNotification("Failed to save changes. Please try again.", "error");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data);
    };

    const updateFormData = (newData: any) => {
        setFormData(newData);
    };

    useEffect(() => {
        setIsValid(validateForm());
    }, [formData]);

    return (
        <div>
            <h2>Personal Details</h2>
            {isEditing ? (
                <>
                    <PersonalDetailsForm
                        data={formData}
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
                    <p><img src={formData.photos_link} alt="avatar" /></p>
                    <p>
                        <strong>Full Name:</strong> {formData.full_name}
                    </p>
                    <p>
                        <strong>Date of Birth:</strong> {formData.date_of_birth}
                    </p>
                    <p>
                        <strong>Gender:</strong> {formData.gender}
                    </p>
                    <p>
                        <strong>Address:</strong> {formData.city}, {formData.country},{" "}
                        {formData.street}
                    </p>
                    <p>
                        <strong>Relocation:</strong>{" "}
                        {formData.relocate ? "Possible" : "Not possible"}
                    </p>
                    <p>
                        <strong>Hobbies:</strong>{" "}
                        {formData.names_of_hobby.join(", ")}
                    </p>
                    <p>
                        <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {formData.phone_number}
                    </p>
                    <p>
                        <strong>Social Media:</strong>
                    </p>
                    <ul>
                        {formData.social_media.map((link: any, index: number) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.platform}
                                </a>
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

export default PersonalDetailsView;
