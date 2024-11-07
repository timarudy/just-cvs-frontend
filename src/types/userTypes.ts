import { Education } from "../components/forms/inputs/EducationInput";
import { Publication } from "../components/forms/inputs/PublicationsInput";
import { SocialMedia } from "../components/forms/inputs/SocialMediaInput";
import { TagType } from "../components/forms/inputs/TagsInput";

export interface UserType {
    id: number;
    name: string;
    dateOfBirth: string;
    avatarLink: string;
    languages: string[];
};

export interface FormDataType {
    personal_details: UserPersonalDetailsInternalType;
    summary: UserSummaryType;
    skills: UserSkillsInternalType;
    work_experience: UserWorkExperienceType[];
    general_education: UserEducationGeneralType;
}

export interface UserEducationGeneralType {
    education: Education[];
    publication: Publication[];
}

export interface UserPublicationType {
    name_of_publication: string;
    date_of_publication: string;
    publication_link: string | null;
}

export interface UserPreliminaryType {
    id: number;
    full_name: string;
    dateOfBirth: string;
    avatarLink: string;
};

export interface UserPersonalDetailsInternalType {
    full_name: string;
    photos_link: string;
    gender: string;
    date_of_birth: string;
    relocate: boolean;
    social_media: SocialMedia[];
    email: string;
    names_of_hobby: TagType[];
    phone_number: string;
    country: string,
    city: string,
    street: string,
}

export interface UserPersonalDetailsType {
    full_name: string;
    photos_link: string;
    gender: string;
    date_of_birth: string;
    place_of_residence: string;
    relocate: boolean;
    social_media: SocialMediaType[];
    email: string;
    names_of_hobby: string[];
    phone_number: string;
}

export interface UserSummaryType {
    description: string;
}

export interface UserSkillsInternalType {
    hard_skills: TagType[];
    soft_skills: TagType[];
    language: LanguageType[];
}

export interface UserSkillsType {
    hard_skills: string[];
    soft_skills: string[];
    language: LanguageType[];
}

export interface UserWorkExperienceType {
    position: string,
    place_of_work: string,
    onboarding_date: string,
    offboarding_date: string,
}

export interface SocialMediaType {
    name_of_social_media: string;
    url: string;
}

export interface LanguageType {
    name_of_language: string;
    level_of_language: string;
    certification?: string | null;
}

export interface UserEducationType {
    educational_organisation: string;
    year_of_start: number;
    year_of_end: number;
}

export interface CVData {
    photos_link: string | null;
    full_name: string;
    date_of_birth: string;
    gender: 'Male' | 'Female' | 'Other';
    place_of_residence: string;
    relocate: boolean;
    names_of_hobby: string[];
    phone_number: string;
    email: string;
    summary: string;
    hard_skills: string[];
    soft_skills: string[];
    social_media: SocialMediaType[];
    language: LanguageType[];
    work_experience: UserWorkExperienceType[];
    education: Education[];
    publication: Publication[];
}