import React, { useState } from 'react';
import "/src/css/components/forms/inputs/SocialMediaInput.css"

export interface SocialMedia {
    id: string;
    name_of_social_media: string;
    url: string;
}

interface SocialMediaInputProps {
    socialMedia: SocialMedia[];
    setSocialMedia: (socialMedia: SocialMedia[]) => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({ socialMedia, setSocialMedia }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const handleAddSocialMedia = () => {
        const trimmedName = name.trim();
        const trimmedUrl = url.trim();

        if (trimmedName !== '' && trimmedUrl !== '') {
            if (!socialMedia.some((sm) => sm.name_of_social_media === trimmedName && sm.url === trimmedUrl)) {
                const newId = crypto.randomUUID();
                const newEntry: SocialMedia = {
                    id: newId,
                    name_of_social_media: trimmedName,
                    url: trimmedUrl,
                };
                setSocialMedia([...socialMedia, newEntry]);
                setName('');
                setUrl('');
            }
        }
    };

    const removeSocialMedia = (id: string) => {
        const updatedList = socialMedia.filter((sm) => sm.id !== id);
        setSocialMedia(updatedList);
    };

    return (
        <div className="social-media-label">
            <input
                type="text"
                value={name}
                placeholder="Social Media Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="url"
                value={url}
                placeholder="URL"
                onChange={(e) => setUrl(e.target.value)}
            />
            <button id="add-button" type="button" onClick={handleAddSocialMedia}>
                Add
            </button>
            <div id="sm-list">
                {socialMedia.map((sm) => (
                    <div key={sm.id} className="social-media-entry">
                        <button id="remove-button" type="button" onClick={() => removeSocialMedia(sm.id)}>
                            &times;
                        </button>
                        {sm.name_of_social_media}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialMediaInput;
