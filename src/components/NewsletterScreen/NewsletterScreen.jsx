import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles

export default function NewsletterScreen() {
  const editorRef = useRef(null); // Reference for the editor container
  const quillRef = useRef(null); // Reference for the Quill instance

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow', // Quill theme
        placeholder: 'Write your newsletter here...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'], // Formatting buttons
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            ['link', 'image'], // Links and images
          ],
        },
      });
    }
    return () => {
      quillRef.current = null; // Clean up
    };
  }, []);

  const handleSave = () => {
    const content = quillRef.current.root.innerHTML; // Get the editor content
    console.log('Newsletter content:', content);
    // Save the content (e.g., send to a server or save locally)
  };

  return (
    <div>
      <h1>Create Your Newsletter</h1>
      <div ref={editorRef} style={{ height: '300px', marginBottom: '20px' }} />
      <button onClick={handleSave}>Save Newsletter</button>
    </div>
  );
}
