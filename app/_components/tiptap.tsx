'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapToolbar from './tiptap-toolbar'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write content here! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none focus:border-none focus:ring-0 border-none outline-none',
      },
    },
  })

  return (
    <div className='w-full h-full mt-6 relative'>
      {/* Toolbar */}
     <div className='mb-5'>
     <TiptapToolbar editor={editor} />
    </div>
      
      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        placeholder='Write content here...'
        className='w-full [\u0026_.ProseMirror]:outline-none [\u0026_.ProseMirror]:border-none [\u0026_.ProseMirror]:focus:outline-none [\u0026_.ProseMirror]:focus:border-none [\u0026_.ProseMirror]:focus:ring-0 [\u0026_.ProseMirror]:min-h-[200px] [\u0026_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [\u0026_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [\u0026_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [\u0026_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [\u0026_.ProseMirror_p.is-editor-empty:first-child::before]:h-0'
      />
    </div>
  )
}

export default Tiptap