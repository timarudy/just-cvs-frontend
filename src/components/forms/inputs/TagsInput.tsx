import React, { useState } from 'react';

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
        <div className='tags-input'>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <br />
            <div>
                {tags.map((tagObj) => (
                    <div key={tagObj.id} className="tag">
                        {tagObj.tag}
                        <button type="button" onClick={() => removeTag(tagObj.id)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsInput;