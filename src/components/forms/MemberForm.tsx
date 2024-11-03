import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { CVData, FormDataType } from "../../types/userTypes";
import SummaryForm from "./SummaryForm";
import SkillsForm from "./SkillsForm";
import { extractSocialMediaValues, extractTagValues } from "../../extensions/arrayExtensions";
import WorkForm from "./WorkForm";
import EducationForm from "./EducationForm";
import axios from "axios";

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
        }
    });


    const [formValid, setFormValid] = useState(false);

    const updateFormData = (section: string, newData: any) => {
        setFormData(prevData => ({
            ...prevData,
            [section]: newData
        }));
    };

    const validateRequiredFields = (isValid: boolean) => {
        setFormValid(isValid);
    };

    const handleNext = () => {
        if (formValid) {
            setCurrentStep(currentStep + 1);
        } else {
            alert('Please fill in all required fields.');
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
                gender: formData.personal_details.gender as 'Male' | 'Female' | 'Other',
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

            const cvDataTrial = {
                photos_link: "/Users/timurrudenko/JustCVs/just-cvs/images/user_avatar_1.png",
                full_name: "John Doe",
                date_of_birth: "1990-01-01",
                gender: "Male",
                place_of_residence: "New York",
                relocate: true,
                names_of_hobby: ["Reading", "Coding", "table tenis"],
                phone_number: "+123456789",
                email: "johnoe@example.com",
                summary: "Bla bla bla",
                hard_skills: ["Python", "Django", "DRF"],
                soft_skills: ["Communication", "Problem-solving"],
                social_media: [
                    {
                        name_of_social_media: "xvideo",
                        url: "https://xvideo.com/johndoe"
                    }
                ],
                language: [
                    {
                        name_of_language: "Poland",
                        level_of_language: "Fluent",
                        certification: null
                    },
                    {
                        name_of_language: "Spanish",
                        level_of_language: "Advanced",
                        certification: "https://x.com/johndoe"
                    }
                ],
                work_experience: [
                    {
                        position: "Software Engineer",
                        place_of_work: "Tech Corp",
                        onboarding_date: "2015-01-01",
                        offboarding_date: "-"
                    }
                ],
                education: [
                    {
                        educational_organisation: "XYZ University",
                        year_of_start: 2010,
                        year_of_end: 2014
                    }
                ],
                publication: [
                    {
                        name_of_publication: "Research Paper",
                        date_of_publication: "2020-05-01",
                        publication_link: null
                    }
                ]
            };


            try {
                const response = await axios.post("http://127.0.0.1:8000/cv-details/", cvDataTrial, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("Successfully submitted:", response.data);
            } catch (error) {
                console.error("Error submitting data:", error);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div>
            {currentStep === 1 && (
                <PersonalDetailsForm
                    data={formData.personal_details}
                    updateData={(newData: any) => updateFormData('personal_details', newData)}
                    validate={validateRequiredFields}
                />
            )}
            {currentStep === 2 && (
                <SummaryForm
                    data={formData.summary}
                    updateData={(newData: any) => updateFormData('summary', newData)}
                    validate={validateRequiredFields}
                />
            )}
            {currentStep === 3 && (
                <SkillsForm
                    data={formData.skills}
                    updateData={(newData: any) => updateFormData('skills', newData)}
                    validate={validateRequiredFields}
                />
            )}
            {currentStep === 4 && (
                <WorkForm
                    data={formData.work_experience}
                    updateData={(newExperiences: any) => updateFormData('work_experience', newExperiences)}
                />
            )}
            {currentStep === 5 && (
                <EducationForm
                    data={formData.general_education}
                    updateData={(newData: any) => updateFormData('general_education', newData)}
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
