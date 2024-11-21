import React, { useEffect, useState } from "react";
import TagsInput from "./inputs/TagsInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import Required from "./Required";
import SocialMediaInput from "./inputs/SocialMediaInput";
//import '/src/css/components/forms/PersonalDetailsForm.css'

const PersonalDetailsForm = ({ data, updateData, validate }: any) => {
    const [fullNameValidation, setFullNameValidation] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);

    const validateFullName = (name: string) => {
        if (!name) {
            validate(false);
            return false;
        }
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(name)) {
            validate(false);
            return false;
        }

        validate(true);
        return true;
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            validate(false);
            return false;
        }
        if (!regex.test(email)) {
            validate(false);
            return false;
        }

        validate(true);
        return true;
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const full_name = e.target.value;
        setFullNameValidation(validateFullName(full_name));
        updateData({ ...data, full_name });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmailValidation(validateEmail(email));
        updateData({ ...data, email });
    };

    const handlePhoneNumberChange = (phone: string) => {
        updateData({ ...data, phone_number: phone });
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
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
        handleFullNameChange({ target: { value: data.full_name } } as React.ChangeEvent<HTMLInputElement>);
        handleEmailChange({ target: { value: data.email } } as React.ChangeEvent<HTMLInputElement>);
    }, []);

    return (
        <div className="form-container">
            <label>
                <Required isValid={fullNameValidation}>Full Name</Required>
                <input
                    type="text"
                    value={data.full_name}
                    onChange={(e) => handleFullNameChange(e)}
                />
            </label>
            <label>
                <Required isValid={emailValidation}>Email</Required>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => handleEmailChange(e)}
                />
            </label>
            <label>
                Photo Upload:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                />
            </label>
            {data.photos_link && (
                <div>
                    <p>Preview:</p>
                    <img
                        src={data.photos_link}
                        alt="User Uploaded"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                </div>
            )}
            <label>
                Gender:
                <select
                    value={data.gender}
                    onChange={(e) =>
                        updateData({ ...data, gender: e.target.value })
                    }
                >
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                    <option value={'other'}>Other</option>
                </select>
            </label>
            <label>
                Date of Birth:
                <input
                    type="date"
                    value={data.date_of_birth}
                    onChange={(e) =>
                        updateData({ ...data, date_of_birth: e.target.value })
                    }
                />
            </label>
            <label>
                Country:
                <input
                    type="text"
                    value={data.country}
                    onChange={(e) =>
                        updateData({ ...data, country: e.target.value })
                    }
                />
            </label>
            <label>
                City:
                <input
                    type="text"
                    value={data.city}
                    onChange={(e) => updateData({ ...data, city: e.target.value })}
                />
            </label>
            <label>
                Street:
                <input
                    type="text"
                    value={data.street}
                    onChange={(e) =>
                        updateData({ ...data, street: e.target.value })
                    }
                />
            </label>
            <label>
                Consider relocation:
                <input
                    type="checkbox"
                    checked={data.relocate}
                    onChange={(e) =>
                        updateData({ ...data, relocate: e.target.checked })
                    }
                />
            </label>
            <label>
                Hobbies:
                <TagsInput
                    tags={data.names_of_hobby}
                    setTags={(newHobbies) =>
                        updateData({ ...data, names_of_hobby: newHobbies })
                    }
                />
            </label>
            <label>
                Social Media Links:
                <SocialMediaInput
                    socialMedia={data.social_media}
                    setSocialMedia={(newSocialMedia) =>
                        updateData({ ...data, social_media: newSocialMedia })
                    }
                />
            </label>
            <label>
                Phone Number:
                <PhoneInput
                    country={"ua"}
                    value={data.phone_number}
                    onChange={handlePhoneNumberChange}
                    enableSearch={true}
                    inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                    }}
                />
            </label>
        </div>
    );
};

export default PersonalDetailsForm;

