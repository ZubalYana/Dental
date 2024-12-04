import React, { useState } from 'react';
import './NewsletterScreen.css';

function NewsletterScreen() {
  const [newsletterText, setNewsletterText] = useState('');

  const handleSaveNewsletter = async () => {
    if (!newsletterText.trim()) {
      alert('Please compose a newsletter before saving.');
      return;
    }

    try {
      const response = await fetch('/api/sendNewsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newsletterText }),
      });

      if (response.ok) {
        alert('Newsletter sent successfully!');
        setNewsletterText('');
      } else {
        alert('Failed to send the newsletter.');
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Your Newsletter</h2>
      <textarea
        id="newsLetterText"
        placeholder="Compose an epic..."
        value={newsletterText}
        onChange={(e) => setNewsletterText(e.target.value)}
      ></textarea>
      <button className="saveNewsletter" onClick={handleSaveNewsletter}>
        Save Newsletter
      </button>
    </div>
  );
}

export default React.memo(NewsletterScreen);
