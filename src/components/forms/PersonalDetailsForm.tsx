import React, { useEffect, useState } from "react";
import TagsInput from "./inputs/TagsInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icons/css/flag-icons.min.css";
import Required from "./Required";
import SocialMediaInput from "./inputs/SocialMediaInput";

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

    //     const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         const fullName = e.target.value;
    //         setFullNameValidation(validateFullName(fullName));
    //         updateData({ ...data, fullName });
    //     };

    //     const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         const email = e.target.value;
    //         setEmailValidation(validateEmail(email));
    //         updateData({ ...data, email });
    //     };

    //     const handlePhoneNumberChange = (phone: string) => {
    //         updateData({ ...data, phoneNumber: phone });
    //     };

    //     useEffect(() => {
    //         handleFullNameChange({ target: { value: data.fullName } } as React.ChangeEvent<HTMLInputElement>);
    //         handleEmailChange({ target: { value: data.email } } as React.ChangeEvent<HTMLInputElement>);
    //     }, []);

    //     return (
    //         <div className="form-container">
    //             <label>
    //                 <Required isValid={fullNameValidation}>Full Name</Required>:
    //                 <input
    //                     type="text"
    //                     value={data.fullName}
    //                     onChange={(e) => handleFullNameChange(e)}
    //                 />
    //             </label>
    //             <label>
    //                 <Required isValid={emailValidation}>Email</Required>:
    //                 <input
    //                     type="email"
    //                     value={data.email}
    //                     onChange={(e) => handleEmailChange(e)}
    //                 />
    //             </label>
    //             <label>
    //                 Photo Link:
    //                 <input
    //                     type="text"
    //                     value={data.photoLink}
    //                     onChange={(e) =>
    //                         updateData({ ...data, photoLink: e.target.value })
    //                     }
    //                 />
    //             </label>
    //             <label>
    //                 Gender:
    //                 <select
    //                     value={data.gender}
    //                     onChange={(e) =>
    //                         updateData({ ...data, gender: e.target.value })
    //                     }
    //                 >
    //                     <option value={"Male"}>Male</option>
    //                     <option value={"Female"}>Female</option>
    //                     <option value={"Other"}>Other</option>
    //                 </select>
    //             </label>
    //             <label>
    //                 Date of Birth:
    //                 <input
    //                     type="date"
    //                     value={data.dateOfBirth}
    //                     onChange={(e) =>
    //                         updateData({ ...data, dateOfBirth: e.target.value })
    //                     }
    //                 />
    //             </label>
    //             <label>
    //                 Country:
    //                 <input
    //                     type="text"
    //                     value={data.country}
    //                     onChange={(e) =>
    //                         updateData({ ...data, country: e.target.value })
    //                     }
    //                 />
    //             </label>
    //             <label>
    //                 City:
    //                 <input
    //                     type="text"
    //                     value={data.city}
    //                     onChange={(e) => updateData({ ...data, city: e.target.value })}
    //                 />
    //             </label>
    //             <label>
    //                 Street:
    //                 <input
    //                     type="text"
    //                     value={data.street}
    //                     onChange={(e) =>
    //                         updateData({ ...data, street: e.target.value })
    //                     }
    //                 />
    //             </label>
    //             <label>
    //                 Consider relocation:
    //                 <input
    //                     type="checkbox"
    //                     checked={data.relocate}
    //                     onChange={(e) =>
    //                         updateData({ ...data, relocate: e.target.checked })
    //                     }
    //                 />
    //             </label>
    //             <label>
    //                 Hobbies:
    //                 <TagsInput
    //                     tags={data.hobbies}
    //                     setTags={(newHobbies) =>
    //                         updateData({ ...data, hobbies: newHobbies })
    //                     }
    //                 />
    //             </label>
    //             <label>
    //                 Social Media Links:
    //                 <SocialMediaInput
    //                     socialMedia={data.socialMedia}
    //                     setSocialMedia={(newSocialMedia) =>
    //                         updateData({ ...data, socialMedia: newSocialMedia })
    //                     }
    //                 />
    //             </label>
    //             <label>
    //                 Phone Number:
    //                 <PhoneInput
    //                     country={"ua"} // Default country
    //                     value={data.phoneNumber}
    //                     onChange={handlePhoneNumberChange}
    //                     enableSearch={true}
    //                     inputProps={{
    //                         name: "phone",
    //                         required: true,
    //                         autoFocus: true,
    //                     }}
    //                 />
    //             </label>
    //         </div>
    //     );
    // };

    // export default PersonalDetailsForm;

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

    useEffect(() => {
        handleFullNameChange({ target: { value: data.full_name } } as React.ChangeEvent<HTMLInputElement>);
        handleEmailChange({ target: { value: data.email } } as React.ChangeEvent<HTMLInputElement>);
    }, []);

    return (
        <div className="form-container">
            <label>
                <Required isValid={fullNameValidation}>Full Name</Required>:
                <input
                    type="text"
                    value={data.full_name}
                    onChange={(e) => handleFullNameChange(e)}
                />
            </label>
            <label>
                <Required isValid={emailValidation}>Email</Required>:
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => handleEmailChange(e)}
                />
            </label>
            <label>
                Photo Link:
                <input
                    type="text"
                    value={data.photos_link}
                    onChange={(e) =>
                        updateData({ ...data, photos_link: e.target.value })
                    }
                />
            </label>
            <label>
                Gender:
                <select
                    value={data.gender}
                    onChange={(e) =>
                        updateData({ ...data, gender: e.target.value })
                    }
                >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Other"}>Other</option>
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
                    country={"ua"} // Default country
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

