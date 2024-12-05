import React, { useState } from 'react';
import "/src/css/components/forms/inputs/PublicationsInput.css"

export interface Publication {
    id: string;
    name_of_publication: string;
    date_of_publication: string;
    publication_link: string | null;
}

interface PublicationInputProps {
    publications: Publication[];
    setPublications: (publications: Publication[]) => void;
}

const PublicationInput: React.FC<PublicationInputProps> = ({ publications, setPublications }) => {
    const [title, setTitle] = useState('');
    const [publicationLink, setPublicationLink] = useState('');
    const [year, setYear] = useState('');

    const handleAddPublication = () => {
        const newPublication: Publication = {
            id: crypto.randomUUID(),
            name_of_publication: title.trim(),
            date_of_publication: year.trim(),
            publication_link: publicationLink.trim(),
        };

        if (newPublication.name_of_publication) {
            setPublications([...publications, newPublication]);
            setTitle('');
            setPublicationLink('');
            setYear('');
        }

        console.log(newPublication);
    };

    const removePublication = (id: string) => {
        setPublications(publications.filter((pub) => pub.id !== id));
    };

    return (
        <div>
            <div className="label-inputs">
                <input
                    type="text"
                    value={title}
                    placeholder="Publication Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    value={publicationLink}
                    placeholder="Publication Link"
                    onChange={(e) => setPublicationLink(e.target.value)}
                />
                <input
                    type="text"
                    value={year}
                    placeholder="Year"
                    onChange={(e) => setYear(e.target.value)}
                />
                <button type="button" onClick={handleAddPublication}>
                    add
                </button>
            </div>

            <div id="pub-list">
                {publications.map((pub) => (
                    <div key={pub.id}>
                        <div id="fancy-lines-ed">‎</div>
                        <button id="remove-button" type="button" onClick={() => removePublication(pub.id)}>
                            &times;
                        </button>
                        {pub.name_of_publication} ({pub.date_of_publication})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublicationInput;
