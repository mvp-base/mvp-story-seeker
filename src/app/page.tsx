'use client';

import Form from '@/components/Form';
import Processing from '@/components/Processing';
import { useState } from 'react';

enum EState {
  Idle = 'idle',
  Processing = 'processing',
  Processed = 'processed',
}

export default function Home() {
  const [text, setText] = useState('');
  const [state, setState] = useState(EState.Idle);

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
    <div className="flex flex-col items-center ">
      <h1 className="text-3xl font-bold">Story Seeker</h1>
      {state === EState.Idle && (
        <>
          <h2 className="text-xl self-center">
            Say Goodbye to Endless Searching :)
          </h2>
          <Form
            text={text}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
          />
        </>
      )}
      {state === EState.Processing && (
        <>
          <h1 className="text-xl self-center">Processing...</h1>
          <Processing />
        </>
      )}
      {state === EState.Processed && (
        <>
          <h1 className="text-xl self-center">Enjoy!</h1>
        </>
      )}
    </div>
  );
}
