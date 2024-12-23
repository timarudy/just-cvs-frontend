import { useEffect, useState } from "react";
import { useParams, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalDetailsView from "./views/PersonalDetailsView";
import SummaryView from "./views/SummaryView";
import SkillsView from "./views/SkillsView";
import WorkExperienceView from "./views/WorkExperienceView";
import EducationView from "./views/EducationView";

const MemberCVPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cvData, setCVData] = useState<any>(null);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/cv-details/${id}/`);
                setCVData(response.data);
                console.log(response.data);

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
