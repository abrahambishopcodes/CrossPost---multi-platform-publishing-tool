'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from './editor-toolbar'
import CodeBlock from '@tiptap/extension-code-block'

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          HTMLAttributes: {
            class: "text-blue-600 underline cursor-pointer hover:text-blue-800"
          }
        }
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 p-4 rounded-lg'
        },
        defaultLanguage: "javascript"
      })
    ],
    content: '<p>Write content here! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none focus:border-none focus:ring-0 border-none outline-none pb-10',
      },
    },
  })

  return (
    <div className='w-full h-full mt-6 relative'>
      {/* Toolbar */}
     <div className='mb-5'>
     <EditorToolbar editor={editor} />
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

export default Editor