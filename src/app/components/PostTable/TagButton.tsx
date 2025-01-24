"use client";

const TagButton = ({
  tag,
  handleTagClick,
}: {
  tag: { id: string; name: string };
  handleTagClick: (tag: string) => void;
}) => {
  return (
    <button
      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs mr-2"
      onClick={() => handleTagClick(tag.name)}
    >
      {tag.name}
    </button>
  );
};

export default TagButton;
