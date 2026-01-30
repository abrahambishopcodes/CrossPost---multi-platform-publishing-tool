import {
  Bold,
  Italic,
  Link,
  ListOrdered,
  ListIcon,
  CodeIcon,
  Heading,
  Image,
  SparklesIcon
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    if (!editor) return;

    // Re-render on editor updates to reflect active states
    const handleUpdate = () => forceUpdate({});

    editor.on("transaction", handleUpdate);
    editor.on("selectionUpdate", handleUpdate);

    return () => {
      editor.off("transaction", handleUpdate);
      editor.off("selectionUpdate", handleUpdate);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  const tools = [
    [
      {
        Icon: Bold,
        action: () => editor.chain().focus().toggleBold().run(),
        active: () => editor.isActive("bold"),
      },
      {
        Icon: Italic,
        action: () => editor.chain().focus().toggleItalic().run(),
        active: () => editor.isActive("italic"),
      },
      {
        Icon: Link,
        action: () => editor.chain().focus().toggleLink().run(),
        active: () => editor.isActive("link"),
      },
    ],
    [
      {
        Icon: Heading,
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: () => editor.isActive("heading", { level: 1 }),
      },
      {
        Icon: ListOrdered,
        action: () => editor.chain().focus().toggleOrderedList().run(),
        active: () => editor.isActive("orderedList"),
      },
      {
        Icon: ListIcon,
        action: () => editor.chain().focus().toggleBulletList().run(),
        active: () => editor.isActive("bulletList"),
      },
    ],
    [
      {
        Icon: CodeIcon,
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        active: () => editor.isActive("codeBlock"),
      },
      {
        Icon: Image,
        // action: () => editor.chain().focus().toggleImage().run(),
        active: () => editor.isActive("image"),
      },
    ],
    [
      {
        Icon: SparklesIcon,
        // action: () => editor.chain().focus().toggleSparkles().run(),
        active: () => false,
      }
    ]
  ];

  return (
    <div className="bg-[#131214] w-full h-12 rounded-lg flex items-center px-4 gap-2 border border-grey-border">
      {tools.map((toolGroup, index) => (
        <div className={cn(
          "flex items-center gap-1 pr-2",
          index !== tools.length - 1 && "border-r border-gray-800"
        )} key={`tool-group-${index}`}>
          {toolGroup.map((tool, index) => (
            <Toggle
              key={`tool-${index}`}
              pressed={tool.active()}
              onPressedChange={tool.action}
              className="h-8 w-8 p-0 hover:bg-white/20 data-[state=on]:*:text-black!"
            >
              <tool.Icon className={
                cn(
                  "h-4 w-4 text-neutral-400",
                  tool.Icon === SparklesIcon && "text-purple-500"
                )
              } />
            </Toggle>
          ))}
        </div>
      ))}
    </div>
  );
}
