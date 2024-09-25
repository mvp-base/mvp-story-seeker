'use client';

import Form from '@/components/Form';
import Processing from '@/components/Processing';
import { Recommendations } from '@/components/Recommendations';

import { useState } from 'react';

interface IRequestGenerateSuggestion {
  type: 'REQUEST_GENERATE_SUGGESTION';
  query: string;
}

export enum EState {
  Idle = 'Say Goodbye to Endless Searching :)',
  Processing = 'Processing...',
  Processed = 'Enjoy!',
}

export default function Home() {
  const [text, setText] = useState('');
  const [state, setState] = useState(EState.Idle);

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(EState.Processing);

    const message: IRequestGenerateSuggestion = {
      type: 'REQUEST_GENERATE_SUGGESTION',
      query: text,
    };

    try {
      const response = await fetch('http://localhost:8080/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response:', result);
      setState(EState.Processed);
    } catch (e) {
      console.error('Error:', e);
      setState(EState.Idle);
    }
  }

  return (
    <div className="flex flex-grow flex-col items-center">
      <h1 className="text-3xl font-bold">Story Seeker</h1>
      <h2 className="text-xl self-center">{state}</h2>
      <div className="flex flex-grow items-center justify-center">
        {state === EState.Idle && (
          <Form
            text={text}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
          />
        )}
        {state === EState.Processing && <Processing />}
        {state === EState.Processed && <Recommendations setState={setState} />}
      </div>
    </div>
  );
}
