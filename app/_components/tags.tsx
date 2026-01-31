import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { Input, InputWrapper } from "@/components/ui/input";

const Tags = () => {
  const [isTagInputOpen, setIsTagInputOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(["#tag1", "#tag2", "#tag3"]);
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTag = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
    setTags([...tags, newTag]);
    setInputValue("");
    setIsTagInputOpen(false);
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <div
            className="bg-white/10 border border-grey-border p-2 min-w-18 rounded-lg justify-between text-xs flex items-center gap-1"
            key={index}
          >
            {tag}
            <X 
              className="text-neutral-400 hover:text-neutral-200 cursor-pointer w-3 h-3 pointer-events-auto" 
              onClick={() => removeTag(index)}
            />
          </div>
        ))}

        {isTagInputOpen ? (
          <form onSubmit={onSubmit}>
            <InputWrapper className="bg-transparent border-gray-800 focus-visible:ring-0 focus-visible:border-white text-white h-8 max-w-[250px]">
              <Input
                placeholder="Add tag, start with #"
                className="text-white!"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              <X 
                onClick={() => setIsTagInputOpen(false)} 
                className="size-4 text-white cursor-pointer hover:text-neutral-300" 
              />
            </InputWrapper>
          </form>
        ) : (
          <p 
            onClick={() => setIsTagInputOpen(true)} 
            className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-200 cursor-pointer h-8 px-2"
          >
            <Plus className="size-4" />
            Add tag
          </p>
        )}
      </div>
    </div>
  );
};

export default Tags;
