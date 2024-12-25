import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "/src/css/components/Header.css";

interface HeaderProps {
    onCancelEdit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCancelEdit }) => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const isCVPage = location.pathname.includes("/cv-details/");

    const handleNavigation = () => {
        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    return (
        <header>
            <div className="logo">
                <h1>just-cvs</h1>
            </div>
            <nav>
                <Link to="/" onClick={handleNavigation}>
                    all CVs
                </Link>

                <Link to="/member-form" onClick={handleNavigation}>
                    create CV
                </Link>

                {isCVPage && id && (
                    <>
                        <Link to={`/cv-details/${id}/personal-details`} onClick={handleNavigation}>
                            personal details
                        </Link>
                        <Link to={`/cv-details/${id}/summary`} onClick={handleNavigation}>
                            summary
                        </Link>
                        <Link to={`/cv-details/${id}/skills`} onClick={handleNavigation}>
                            skills
                        </Link>
                        <Link to={`/cv-details/${id}/work-experience`} onClick={handleNavigation}>
                            work experience
                        </Link>
                        <Link to={`/cv-details/${id}/education`} onClick={handleNavigation}>
                            education
                        </Link>
                    </>
                )}
            </nav>
            <div className="brand-logo">
                <img
                    src="https://storage.googleapis.com/just-cvs-bucket/users_avatars/logo.png"
                    width={70}
                    height={70}
                    alt="logo"
                />
            </div>
        </header>
    );
};

export default Header;
