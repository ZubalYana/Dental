import React, { useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

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
      <h1>Create Your Newsletter</h1>
      {/* <div id="editor"></div> */}
      <button >Save Newsletter</button>
    </div>
  );
}

export default React.memo(NewsletterScreen);
