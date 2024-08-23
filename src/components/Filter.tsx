import React from 'react';

interface FilterProps {
  activeTag: string;
  onChange: (tag: string) => void;
}

const Filter: React.FC<FilterProps> = ({ activeTag, onChange }) => {
  const tags = ['For Sale', 'For Rent', 'Short-let', 'Lands'];

  return (
    <div className="flex border-[1px] border-gray-300 p-[2px] rounded-[7px] bg-background-2 gap-6">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={` text-[14px] rounded-[7px] p-2 ${
            activeTag === tag ? 'bg-primary-100 text-primary' : ' text-gray-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Filter;
