import React, { useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './NewsletterScreen.css';

function NewsletterScreen() {

  // useEffect(() => {
  //   const quill = new Quill('#editor', {
  //     modules: {
  //       toolbar: [
  //         [{ header: [1, 2, false] }],
  //         ['bold', 'italic', 'underline'],
  //         ['image', 'code-block'],
  //       ],
  //     },
  //     placeholder: 'Compose an epic...',
  //     theme: 'snow', // or 'bubble'
  //   });
  // }, []);


  return (
    <div>
      <h2>Create Your Newsletter</h2>
      <textarea id="newsLetterText" placeholder='Compose an epic...'></textarea>
      <button >Save Newsletter</button>
    </div>
  );
}

export default React.memo(NewsletterScreen);
