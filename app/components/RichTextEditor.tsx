"use client";

import { useState, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function RichTextEditor({ value, onChange, className = '' }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [QuillEditor, setQuillEditor] = useState<any>(null);
  
  // Load the ReactQuill component only on the client side
  useEffect(() => {
    async function loadQuill() {
      try {
        // Dynamic import of ReactQuill
        const ReactQuill = (await import('react-quill')).default;
        setQuillEditor(() => ReactQuill);
        setMounted(true);
      } catch (error) {
        console.error('Failed to load Quill editor:', error);
      }
    }
    
    loadQuill();
  }, []);
  
  // The toolbar configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean']
    ]
  };
  
  // Loading placeholder
  if (!mounted || !QuillEditor) {
    return (
      <div className="border border-accent p-4 bg-background-light text-text-primary min-h-[200px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">Loading editor...</div>
        </div>
      </div>
    );
  }
  
  // Render the editor once it's loaded
  return (
    <QuillEditor
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
      className={`quill-editor ${className}`}
    />
  );
}
