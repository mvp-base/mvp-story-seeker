'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('yo');
  }

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  return (
    <div>
      <h1 className="" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        Story Seeker
      </h1>
      <h2 className="" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        Say Goodbye to Endless Searching :)
      </h2>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="inputField"
          style={{ display: 'block', marginBottom: '8px' }}
        >
          Your Input:
        </label>
        <textarea
          id="inputField"
          value={text}
          onChange={handleTextChange}
          rows={3} 
          maxLength={200}
          style={{ width: '50%', padding: 12, maxHeight: '400px', boxSizing: 'border-box' }}
          placeholder="Enter your text here (max 200 characters)"
        />
        <button type="submit">OK</button>
      </form>
    </div>
  );
}
