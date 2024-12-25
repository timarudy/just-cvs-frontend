import { useEffect, useState } from "react";
import { useParams, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalDetailsView from "./views/PersonalDetailsView";
import SummaryView from "./views/SummaryView";
import SkillsView from "./views/SkillsView";
import WorkExperienceView from "./views/WorkExperienceView";
import EducationView from "./views/EducationView";
import { UserWorkExperienceType } from "../types/userTypes";
import { createSocialMediaObjects, createTagObjects} from "../extensions/arrayExtensions";

const MemberCVPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cvData, setCVData] = useState<any>(null);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/cv-details/${id}/`);

                const datas = {
                    photos_link: response.data.photos_link || null,
                    full_name: response.data.full_name,
                    date_of_birth: response.data.date_of_birth,
                    gender: response.data.gender,
                    place_of_residence: `${response.data.city}, ${response.data.country} ${response.data.street}`,
                    relocate: response.data.relocate,
                    names_of_hobby: createTagObjects(response.data.names_of_hobby),
                    phone_number: response.data.phone_number,
                    email: response.data.email,
                    summary: response.data.summary,
                    hard_skills: createTagObjects(response.data.hard_skills),
                    soft_skills: createTagObjects(response.data.soft_skills),
                    social_media: createSocialMediaObjects(response.data.social_media),
                    language: response.data.language,
                    work_experience: response.data.work_experience.map((job: UserWorkExperienceType) => ({
                        position: job.position,
                        place_of_work: job.place_of_work,
                        onboarding_date: job.onboarding_date,
                        offboarding_date: job.offboarding_date,
                    })),
                    education: response.data.education,
                    publication: response.data.publication,
                };

                setCVData(datas);

                navigate("personal-details");
            } catch (error) {
                console.error("Error fetching CV data:", error);
            }
        };
        fetchCV();
    }, [id, navigate]);

    if (!cvData) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path="personal-details" element={<PersonalDetailsView data={cvData} />} />
            <Route path="summary" element={<SummaryView data={cvData.summary} />} />
            <Route path="skills" element={<SkillsView data={cvData} />} />
            <Route path="work-experience" element={<WorkExperienceView data={cvData} />} />
            <Route path="education" element={<EducationView data={cvData} />} />
        </Routes>
    );
};

export default MemberCVPage;
