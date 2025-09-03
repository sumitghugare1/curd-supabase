"use client";

import { createFaqAction } from '@/services/server/faqs';

export default function CreateFaqForm() {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await createFaqAction(formData);
    event.target.reset();
    alert('FAQ created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
      <div>
        <label htmlFor="question">Question</label>
        <input id="question" name="question" type="text" style={{ width: '100%', padding: '8px' }} required />
      </div>
      <div>
        <label htmlFor="answer">Answer</label>
        <textarea id="answer" name="answer" rows={5} style={{ width: '100%', padding: '8px' }} required />
      </div>
      <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>Add FAQ</button>
    </form>
  );
}