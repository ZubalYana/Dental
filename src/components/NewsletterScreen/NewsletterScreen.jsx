import React, { useState } from 'react';
import './NewsletterScreen.css';

function NewsletterScreen() {
  const [newsletterText, setNewsletterText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendNewsletter = async () => {
    if (!newsletterText.trim()) {
      alert('Please compose a newsletter before sending.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newsletterText }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Newsletter sent successfully!');
        setNewsletterText('');
      } else {
        alert(`Failed to send the newsletter: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('An error occurred while sending the newsletter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-screen">
      <h2>Create Your Newsletter</h2>
      <textarea
        id="newsLetterText"
        placeholder="Compose your newsletter here..."
        value={newsletterText}
        onChange={(e) => setNewsletterText(e.target.value)}
        disabled={loading}
      ></textarea>
      <button className="saveNewsletter" onClick={handleSendNewsletter} disabled={loading}>
        {loading ? 'Sending...' : 'Send Newsletter'}
      </button>
    </div>
  );
}

export default React.memo(NewsletterScreen);
