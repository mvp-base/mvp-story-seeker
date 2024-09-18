'use client';

import { useState } from 'react';
import { TextArea } from '@/components/TextArea';
import { Button } from '@/components/Button';

export default function Home() {
  const [text, setText] = useState('');

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('yo');
  }

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-3xl font-bold">Story Seeker</h1>
      <h2 className="text-xl self-center">
        Say Goodbye to Endless Searching :)
      </h2>

      <form className="flex flex-col items-center mt-24 w-[50%]" onSubmit={handleSubmit}>
        <TextArea
          id="inputField"
          value={text}
          maxLength={500}
          onChange={handleTextChange}
          rows={5}
          placeholder="Just ask for a recomendation (max 500 characters)"
        />
        <Button height='w-[160px]' width='h-[40px]' className = "mt-4"/>
        {/* <button
          className="mt-4 p-2 bg-purple-500 text-white rounded"
          type="submit"
        >
          OK
        </button> */}
      </form>
    </div>
  );
}
