import React, { useState } from 'react';
import "/src/css/components/forms/inputs/TagsInput.css"


export interface TagType {
    id: string,
    tag: string,
}

interface TagsInputProps {
    tags: TagType[];
    setTags: (tags: TagType[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newInputValue = inputValue.trim();

            if (newInputValue !== '') {
                if (!tags.some((tagObj) => tagObj.tag === newInputValue)) {
                    const newId = crypto.randomUUID();
                    const newTag: TagType = {
                        id: newId,
                        tag: newInputValue,
                    };
                    setTags([...tags, newTag]);
                    setInputValue('');
                }
            }
        }
    };

    const removeTag = (id: string) => {
        const updatedTags = tags.filter((tag) => tag.id !== id);
        setTags(updatedTags);
    };

    return (
        <div className='subtopic-input'>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={15}
            />
            <br />
            <div id="tag-subtopic-list">
                {tags.map((tagObj) => (
                    <div key={tagObj.id} id="tag-subtopic-entry">
                        <button id="remove-button" type="button" onClick={() => removeTag(tagObj.id)}>
                            &times;
                        </button>
                        {tagObj.tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsInput;