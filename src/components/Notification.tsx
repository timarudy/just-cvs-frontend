import React from "react";
import "/src/css/components/Notification.css";

interface NotificationProps {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = "info", onClose }) => {
    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
            <button onClick={onClose}>&times;</button>
        </div>
    );
};

export default Notification;
