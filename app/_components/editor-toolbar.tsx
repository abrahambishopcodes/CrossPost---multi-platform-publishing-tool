import {
  Bold,
  Italic,
  Link,
  ListOrdered,
  ListIcon,
  CodeIcon,
  Heading,
  Image,
  SparklesIcon,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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

  interface Tool {
    Icon: LucideIcon;
    action: () => void;
    active: () => boolean;
    dropdown?: boolean;
    items?: {
      label: string;
      Icon?: LucideIcon;
      action: () => void;
      active: () => boolean;
    }[];
  }

  const tools: Tool[][] = [
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
        dropdown: true,
        items: [
          {
            label: "Heading 1",
            Icon: Heading1,
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: () => editor.isActive("heading", { level: 1 }),
          },
          {
            label: "Heading 2",
            Icon: Heading2,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: () => editor.isActive("heading", { level: 2 }),
          },
          {
            label: "Heading 3",
            Icon: Heading3,
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            active: () => editor.isActive("heading", { level: 3 }),
          },
        ],
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
        action: () => {},
        active: () => false,
      },
    ],
    [
      {
        Icon: SparklesIcon,
        action: () => {},
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
            tool.dropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Toggle
                    pressed={tool.active()}
                    className="h-8 w-8 p-0 hover:bg-white/20 data-[state=on]:*:text-black!"
                  >
                    <tool.Icon className="h-4 w-4 text-neutral-400" />
                  </Toggle>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#131214] border-grey-border min-w-[150px]">
                  {tool.items?.map((item, index) => (
                    <DropdownMenuItem
                      key={`tool-item-${index}`}
                      onClick={item.action}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer transition-colors focus:bg-white/10 focus:text-white",
                        item.active() ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                      )}
                    >
                      {item?.Icon && (<item.Icon className={cn("h-4 w-4", item.active() ? "text-white" : "text-neutral-400")} />)}
                      <span className="text-sm">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )
          ))}
        </div>
      ))}
    </div>
  );
}
