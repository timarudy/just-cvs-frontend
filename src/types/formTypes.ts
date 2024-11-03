export interface PersonalDetails {
    id: number;
    fullName: string;
    gender: 'Male' | 'Female';
    dateOfBirth: string;
    placeOfResidence: string;
    relocate: boolean;
}

export interface Hobby {
    name: string;
}

export interface Summary {
    description: string;
}

export interface Contacts {
    email: string;
    telephone: string;
    socialMedia: string[];
}

export interface Education {
    universities: Record<string, string>[];
    courses: Record<string, string>[];
}

export interface Publication {
    title: string;
    date: string;
}

export interface Skill {
    name: string;
}

export interface Language {
    name: string;
    level: string;
}

export interface Job {
    position: string;
    company: string;
    onboardingDate: string;
    offboardingDate: string;
}
