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
  Heading3,
  LucideIcon
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [_, forceUpdate] = useState({});
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    isLink?: boolean;
    isImage?: boolean;
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
        isLink: true,
        action: () => {}, 
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
        isImage: true,
        action: () => {},
        active: () => editor.isActive("image"),
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

  const setLink = () => {
    const link = linkInputRef.current?.value;
    if (link) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: link }).run();
      if (linkInputRef.current) linkInputRef.current.value = '';
      setIsLinkOpen(false);
    }
  }

  const setImage = () => {
    const url = imageUrlRef.current?.value;
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      if (imageUrlRef.current) imageUrlRef.current.value = '';
      setIsImageOpen(false);
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: url }).run();
      setIsImageOpen(false);
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  }

  return (
    <div className="bg-[#131214] w-full h-12 rounded-lg flex items-center px-4 gap-2 border border-grey-border">
      {tools.map((toolGroup, index) => (
        <div className={cn(
          "flex items-center gap-1 pr-2",
          index !== tools.length - 1 && "border-r border-gray-800"
        )} key={`tool-group-${index}`}>
          {toolGroup.map((tool, index) => (
            tool.isLink ? (
              <DropdownMenu open={isLinkOpen} onOpenChange={setIsLinkOpen}>
                <DropdownMenuTrigger asChild>
                  <Toggle
                    pressed={tool.active()}
                    className="h-8 w-8 p-0 hover:bg-white/20 data-[state=on]:bg-white/10"
                  >
                    <tool.Icon className={cn(
                      "h-4 w-4",
                      tool.active() ? "text-white" : "text-neutral-400"
                    )} />
                  </Toggle>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#131214] border-grey-border p-3 min-w-[300px] flex flex-col gap-3">
                  <Input 
                    placeholder="Paste link"
                    ref={linkInputRef} 
                    className="bg-transparent border-gray-800 focus-visible:ring-0 focus-visible:border-white text-white h-8" 
                  />
                  <div className="flex items-center gap-2">
                    <Button
                    onClick={() => setLink()}
                     className="h-7 text-xs bg-white text-black hover:bg-neutral-200 w-full">
                      Insert
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : tool.isImage ? (
               <DropdownMenu open={isImageOpen} onOpenChange={setIsImageOpen}>
                <DropdownMenuTrigger asChild>
                  <Toggle
                    pressed={tool.active()}
                    className="h-8 w-8 p-0 hover:bg-white/20 data-[state=on]:bg-white/10"
                  >
                    <tool.Icon className={cn(
                      "h-4 w-4",
                      tool.active() ? "text-white" : "text-neutral-400"
                    )} />
                  </Toggle>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#131214] border-grey-border p-3 min-w-[300px] flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                     <p className="text-xs text-neutral-400">Add Image from URL</p>
                     <Input 
                      placeholder="Paste image URL"
                      ref={imageUrlRef} 
                      className="bg-transparent border-gray-800 focus-visible:ring-0 focus-visible:border-white text-white h-8" 
                    />
                    <Button
                      onClick={() => setImage()}
                      className="h-7 text-xs bg-white text-black hover:bg-neutral-200 w-full mb-2">
                        Insert Image
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#131214] px-2 text-neutral-500">Or upload</span>
                    </div>
                  </div>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />

                  <Button
                    onClick={triggerFileUpload}
                    variant="ghost"
                    className="h-7 text-xs hover:bg-white/10 text-neutral-300 hover:text-white w-full border border-gray-800">
                      Upload from Computer
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : tool.dropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Toggle
                    pressed={tool.active()}
                    className="h-8 w-8 p-0 hover:bg-white/20 data-[state=on]:bg-white/10"
                  >
                    <tool.Icon className={cn(
                      "h-4 w-4",
                      tool.active() ? "text-white" : "text-neutral-400"
                    )} />
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
                className="h-8 w-8 p-0 hover:bg-white/20 data-[state=on]:bg-white/10"
              >
                <tool.Icon className={
                  cn(
                    "h-4 w-4",
                    tool.Icon === SparklesIcon 
                      ? "text-purple-500" 
                      : (tool.active() ? "text-white" : "text-neutral-400")
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
