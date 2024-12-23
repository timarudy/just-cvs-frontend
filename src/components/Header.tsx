import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "/src/css/components/Header.css";

interface HeaderProps {
    onCancelEdit: () => void; // Callback to handle canceling edits
}

const Header: React.FC<HeaderProps> = ({ onCancelEdit }) => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const isCVPage = location.pathname.includes("/cv-details/");

    // Function to handle navigation and cancel modifications
    const handleNavigation = () => {
        if (onCancelEdit) {
            onCancelEdit(); // Call the cancel function if available
        }
    };

    return (
        <header>
            <div className="logo">
                <h1>just-cvs</h1>
            </div>
            <nav>
                {/* Navigation for all CVs */}
                <Link to="/" onClick={handleNavigation}>
                    all CVs
                </Link>

                {/* Navigation for creating a CV */}
                <Link to="/member-form" onClick={handleNavigation}>
                    create CV
                </Link>

                {/* Show CV-specific navigation only if on a CV page */}
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
