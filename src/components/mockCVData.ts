export const mockCVData = {
    // Personal Details
    photos_link: "https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png",
    full_name: "John Developer",
    date_of_birth: "1999-05-15",
    gender: "male",
    city: "San Francisco",
    country: "United States",
    street: "123 Tech Street",
    relocate: true,
    names_of_hobby: ["Coding", "Photography", "Rock Climbing"],
    email: "john.dev@example.com",
    phone_number: "+1 (555) 123-4567",
    social_media: [
        {
            platform: "LinkedIn",
            url: "https://linkedin.com/in/johndeveloper1"
        },
        {
            platform: "GitHub",
            url: "https://github.com/johndev1"
        },
        {
            platform: "Twitter",
            url: "https://twitter.com/johndev1"
        }
    ],

    // Summary
    summary: "Passionate second-year Computer Science student with hands-on experience in full-stack development. Quick learner with strong problem-solving skills and a keen interest in emerging technologies. Looking for opportunities to grow and contribute to innovative projects.",

    // Skills
    hard_skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "Git"
    ],
    soft_skills: [
        "Problem Solving",
        "Team Collaboration",
        "Communication",
        "Time Management",
        "Adaptability"
    ],

    // Work Experience
    work_experience: [
        {
            position: "Junior Frontend Developer",
            place_of_work: "Tech Startup Inc.",
            onboarding_date: "2023-06-01",
            offboarding_date: null
        },
        {
            position: "Web Development Intern",
            place_of_work: "Digital Solutions Corp",
            onboarding_date: "2023-01-15",
            offboarding_date: "2023-05-30"
        }
    ],

    // Education
    education: [
        {
            educational_organisation: "Tech University",
            year_of_start: 2022,
            year_of_end: 2026
        },
        {
            educational_organisation: "Coding Bootcamp Academy",
            year_of_start: 2022,
            year_of_end: 2022
        }
    ],
    
    // Publications (part of education view)
    publication: []
};

// Function to simulate API response delay
export const simulateApiResponse = (data: any, delay: number = 500): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), delay);
    });
};