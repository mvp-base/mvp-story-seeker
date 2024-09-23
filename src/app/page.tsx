'use client';

import Form from '@/components/Form';
import Processing from '@/components/Processing';
import { Recommendations } from '@/components/Recommendations';

import { useState } from 'react';

enum EState {
  Idle = 'Say Goodbye to Endless Searching :)',
  Processing = 'Processing...',
  Processed = 'Enjoy!',
}

export default function Home() {
  const [text, setText] = useState('');
  const [state, setState] = useState(EState.Processed);

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(EState.Processing);
    setTimeout(() => {
      console.log('yo');
      setState(EState.Processed);
    }, 5000);
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
        {state === EState.Processed && <Recommendations />}
      </div>
    </div>
  );
}
