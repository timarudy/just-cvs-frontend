import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import SummaryForm from "./SummaryForm";
import SkillsForm from "./SkillsForm";
import WorkForm from "./WorkForm";
import EducationForm from "./EducationForm";
import Notification from "../Notification";
import "/src/css/components/forms/MemberForm.css";

import { extractSocialMediaValues, extractTagValues } from "../../extensions/arrayExtensions";
import axios from "axios";

import { CVData, FormDataType } from "../../types/userTypes";

const MemberForm = () => {
    const sectionsNumber: number = 5;
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState<FormDataType>({
        personal_details: {
            full_name: "",
            photos_link: "",
            gender: "",
            date_of_birth: "",
            country: "",
            city: "",
            street: "",
            relocate: false,
            social_media: [],
            email: "",
            names_of_hobby: [],
            phone_number: "",
        },
        summary: {
            description: "",
        },
        skills: {
            hard_skills: [],
            soft_skills: [],
            language: [],
        },
        work_experience: [],
        general_education: {
            education: [],
            publication: [],
        },
    });

    const [formValid, setFormValid] = useState(false);

    const [notification, setNotification] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | "info">("info");

    // Show notification
    const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
        setNotification(message);
        setNotificationType(type);
        setTimeout(() => setNotification(null), 3000);
    };

    const updateFormData = (section: string, newData: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: newData,
        }));
    };

    const validateRequiredFields = (isValid: boolean) => {
        setFormValid(isValid);
    };

    const handleNext = () => {
        if (formValid) {
            setCurrentStep(currentStep + 1);
        } else {
            showNotification("Please fill in all required fields.", "error");
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        if (formValid) {
            const cvData: CVData = {
                photos_link: formData.personal_details.photos_link || null,
                full_name: formData.personal_details.full_name,
                date_of_birth: formData.personal_details.date_of_birth,
                gender: formData.personal_details.gender,
                place_of_residence: `${formData.personal_details.city}, ${formData.personal_details.country} ${formData.personal_details.street}`,
                relocate: formData.personal_details.relocate,
                names_of_hobby: extractTagValues(formData.personal_details.names_of_hobby),
                phone_number: formData.personal_details.phone_number,
                email: formData.personal_details.email,
                summary: formData.summary.description,
                hard_skills: extractTagValues(formData.skills.hard_skills),
                soft_skills: extractTagValues(formData.skills.soft_skills),
                social_media: extractSocialMediaValues(formData.personal_details.social_media),
                language: formData.skills.language,
                work_experience: formData.work_experience.map((job) => ({
                    position: job.position,
                    place_of_work: job.place_of_work,
                    onboarding_date: job.onboarding_date,
                    offboarding_date: job.offboarding_date,
                })),
                education: formData.general_education.education,
                publication: formData.general_education.publication,
            };

            try {
                const response = await axios.post("http://127.0.0.1:8000/cv-details/", cvData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                showNotification("Successfully submitted!", "success");
                console.log("Successfully submitted:", response.data);
            } catch (error) {
                console.error("Error submitting data:", error);
                showNotification("Failed to submit data. Please try again.", "error");
            }
        } else {
            showNotification("Please fill in all required fields.", "error");
        }
    };

    return (
        <div style={{ position: "relative" }}>
            {notification && (
                <Notification
                    message={notification}
                    type={notificationType}
                    onClose={() => setNotification(null)}
                />
            )}

            {currentStep === 1 && (
                <PersonalDetailsForm
                    data={formData.personal_details}
                    updateData={(newData: any) => updateFormData("personal_details", newData)}
                    validate={validateRequiredFields}
                    showNotification={showNotification} // pass the function down
                />
            )}
            {currentStep === 2 && (
                <SummaryForm
                    data={formData.summary}
                    updateData={(newData: any) => updateFormData("summary", newData)}
                    validate={validateRequiredFields}
                />
            )}
            {currentStep === 3 && (
                <SkillsForm
                    data={formData.skills}
                    updateData={(newData: any) => updateFormData("skills", newData)}
                    validate={validateRequiredFields}
                />
            )}
            {currentStep === 4 && (
                <WorkForm
                    data={formData.work_experience}
                    updateData={(newExperiences: any) => updateFormData("work_experience", newExperiences)}
                />
            )}
            {currentStep === 5 && (
                <EducationForm
                    data={formData.general_education}
                    updateData={(newData: any) => updateFormData("general_education", newData)}
                />
            )}

            <div>
                {currentStep > 1 && <button onClick={handlePrevious}>Previous</button>}
                {currentStep < sectionsNumber && <button onClick={handleNext}>Next</button>}
                {currentStep === sectionsNumber && <button onClick={handleSubmit}>Submit</button>}
            </div>
        </div>
    );
};

export default MemberForm;
