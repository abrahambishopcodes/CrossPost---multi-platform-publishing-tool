import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from '@/components/ui/button'
import { Bold, Italic } from 'lucide-react'
import { Editor } from '@tiptap/react'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/tiptap-utils'

// Spacer component to push items to the right
const Spacer = () => <div className="flex-1" />

interface TiptapToolbarProps {
  editor: Editor | null
}

export default function TiptapToolbar({ editor }: TiptapToolbarProps) {
  if (!editor) {
    return null
  }

  const tools = [
    {
      Icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: () => editor.isActive('bold')
    },
    {
      Icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: () => editor.isActive('italic')
    }
  ]

  return (
    <div className='bg-card-bg w-[350px] h-12 rounded-lg flex items-center px-4 gap-2'>
      {tools.map((tool, index) => (
        <Toggle
          key={index}
          onClick={tool.action}
          className={cn(
            'h-8 w-8 p-0',
            tool.active() ? 'bg-accent text-accent-foreground' : 'bg-transparent'
          )}
        >
          <tool.Icon className="h-4 w-4" />
        </Toggle>
      ))}
    </div>
  )
}