import { useState, useEffect } from "react";
import axios from "axios";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import Notification from "../Notification";
import "/src/css/components/views/PersonalDetailsView.css";
import { extractSocialMediaValues, extractTagValues } from "../../extensions/arrayExtensions";
import { CVData, UserWorkExperienceType } from "../../types/userTypes";


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

        const cvData = {
            photos_link: formData.photos_link || null,
            full_name: formData.full_name,
            date_of_birth: formData.date_of_birth,
            gender: formData.gender,
            place_of_residence: `${formData.city}, ${formData.country} ${formData.street}`,
            relocate: formData.relocate,
            names_of_hobby: extractTagValues(formData.names_of_hobby),
            phone_number: formData.phone_number,
            email: formData.email,
            social_media: extractSocialMediaValues(formData.social_media),
        };

        if (!validateForm()) {
            showNotification("Please correct the errors before saving.", "error");
            return;
        }

        try {
            const url = getApiUrl();
            await axios.put(url, cvData);

            const response = await axios.get(url);
            setFormData(response.data);

            setIsEditing(false);
            showNotification("Personal details updated successfully!", "success");

            window.location.reload();
        } catch (error) {
            console.error("Error saving personal details:", error);
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

    useEffect(() => {
        setIsValid(validateForm());
    }, [formData]);

    return (
        <div>
            {isEditing ? (
                <>
                    <PersonalDetailsForm
                        data={formData}
                        updateData={updateFormData}
                        validate={setIsValid}
                        showNotification={(message: string) => showNotification(message, "info")}
                    />
                    <div className="form-nav-buttons">
                        <button onClick={handleSave} disabled={!isValid}>
                            save
                        </button>
                        <button onClick={handleCancel}>cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div id="view-container-pd">
                        <div className="left-column">
                            <p><img id="pd-avatar" src={formData.photos_link} alt="avatar" style={{ maxWidth: "300px", maxHeight: "300px" }} /></p>
                            <div className="data-field">
                                <div className="data-label">phone number</div>
                                <div className="data-value">{formData.phone_number}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">email</div>
                                <div className="data-value">{formData.email}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">social media links</div>
                                <ul className="data-value-sm">
                                    {formData.social_media.map((link: any, index: number) => (
                                        <li key={index} id="view-sm-entry">
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
                            </div>
                        </div>
                        <div className="right-column">
                            <div className="data-field">
                                <div className="data-label">full name</div>
                                <div className="data-value">{formData.full_name}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">gender</div>
                                <div className="data-value">{formData.gender}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">date of birth</div>
                                <div className="data-value">{formData.date_of_birth}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">country</div>
                                <div className="data-value">{formData.country}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">city</div>
                                <div className="data-value">{formData.city}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">street</div>
                                <div className="data-value">{formData.street}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">relocation</div>
                                <div className="data-value">{formData.relocate ? "possible" : "not possible"}</div>
                            </div>
                            <div className="data-field">
                                <div className="data-label">hobbies</div>
                                <div className="data-value">{extractTagValues(formData.names_of_hobby).join(", ")}</div>
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

export default PersonalDetailsView;
