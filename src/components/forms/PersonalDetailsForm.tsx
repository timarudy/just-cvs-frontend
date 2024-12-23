import React, { useEffect, useState } from "react";
import TagsInput from "./inputs/TagsInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import Required from "./Required";
import SocialMediaInput from "./inputs/SocialMediaInput";
import "/src/css/components/forms/PersonalDetailsForm.css";

const PersonalDetailsForm = ({ data, updateData, validate, showNotification }: any) => {
    const [fullNameValidation, setFullNameValidation] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [dateOfBirthValidation, setDateOfBirthValidation] = useState(false);

    const validateFullName = (name: string) => {
        if (!name) return false;
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(name);
    };

    const validateEmail = (email: string) => {
        if (!email) return false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateDateOfBirth = (dob: string) => {
        if (!dob) return false;
        return true;
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const full_name = e.target.value;
        setFullNameValidation(validateFullName(full_name));
        updateData({ ...data, full_name });
    };

    const handlePhoneNumberChange = (phone: string) => {
        updateData({ ...data, phone_number: phone });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmailValidation(validateEmail(email));
        updateData({ ...data, email });
    };

    const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date_of_birth = e.target.value;
        setDateOfBirthValidation(validateDateOfBirth(date_of_birth));
        updateData({ ...data, date_of_birth });
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                showNotification("Please upload a valid image file.");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                updateData({ ...data, photos_link: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        setFullNameValidation(validateFullName(data.full_name));
        setEmailValidation(validateEmail(data.email));
        setDateOfBirthValidation(validateDateOfBirth(data.date_of_birth));
    }, []);

    useEffect(() => {
        if (
            fullNameValidation &&
            emailValidation &&
            dateOfBirthValidation
        ) {
            validate(true);
        } else {
            validate(false);
        }
    }, [
        fullNameValidation,
        emailValidation,
        dateOfBirthValidation,
        validate
    ]);

    return (
        <div className="form-container-pd">
            <div className="left-column">
                {data.photos_link && (
                    <div>
                        <label>preview</label>
                        <img
                            id="pre-avatar"
                            src={data.photos_link}
                            alt="User Uploaded"
                            style={{ maxWidth: "300px", maxHeight: "300px" }}
                        />
                    </div>
                )}
                <label>
                    photo upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                    />
                </label>
                <label id="phone-label">
                    phone number
                    <PhoneInput
                        country={"ua"}
                        value={data.phone_number}
                        enableSearch={true}
                        onChange={handlePhoneNumberChange}
                        inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                        }}
                    />
                </label>
                <label>
                    <Required isValid={emailValidation}>email</Required>
                    <input
                        type="email"
                        value={data.email}
                        onChange={handleEmailChange}
                    />
                </label>
                <label>
                    social media links
                    <SocialMediaInput
                        socialMedia={data.social_media}
                        setSocialMedia={(newSocialMedia) =>
                            updateData({ ...data, social_media: newSocialMedia })
                        }
                    />
                </label>
            </div>

            <div className="right-column">
                <label>
                    <Required isValid={fullNameValidation}>full name</Required>
                    <input
                        type="text"
                        value={data.full_name}
                        onChange={handleFullNameChange}
                    />
                </label>
                <label>
                    gender:
                    <select
                        value={data.gender || "male"}
                        onChange={(e) =>
                            updateData({ ...data, gender: e.target.value })
                        }
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <label>
                    <Required isValid={dateOfBirthValidation}>date of birth</Required>
                    <input
                        type="date"
                        required
                        value={data.date_of_birth}
                        onChange={handleDateOfBirthChange}
                    />
                </label>

                <label>
                    country
                    <input
                        type="text"
                        value={data.country}
                        onChange={(e) =>
                            updateData({ ...data, country: e.target.value })
                        }
                    />
                </label>
                <label>
                    city
                    <input
                        type="text"
                        value={data.city}
                        onChange={(e) =>
                            updateData({ ...data, city: e.target.value })
                        }
                    />
                </label>
                <label>
                    street
                    <input
                        type="text"
                        value={data.street}
                        onChange={(e) =>
                            updateData({ ...data, street: e.target.value })
                        }
                    />
                </label>
                <label id="reloc">
                    consider relocation
                    <input id="reloc-cb"
                        type="checkbox"
                        checked={data.relocate}
                        onChange={(e) =>
                            updateData({ ...data, relocate: e.target.checked })
                        }
                    />
                </label>
                <label id="hobbies">
                    <p id="hobbies-hobbies">hobbies</p>
                    <div>
                        <TagsInput
                            tags={data.names_of_hobby}
                            setTags={(newHobbies) =>
                                updateData({ ...data, names_of_hobby: newHobbies })
                            }
                        />
                    </div>
                    
                </label>
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
