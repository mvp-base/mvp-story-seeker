'use client';

import Form from '@/components/Form';
import Processing from '@/components/Processing';
import { Recommendations } from '@/components/Recommendations';

import { EState } from '@/utils/enums';
import { logger } from '@/utils/logger';

import { useState } from 'react';

interface IRequestGenerateSuggestion {
  type: 'REQUEST_GENERATE_SUGGESTION';
  query: string;
}

export default function Home() {
  const [requestId, setRequestId] = useState(0);
  const [text, setText] = useState('');
  const [state, setState] = useState(EState.Idle);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    logger(`[RqId:${requestId}] New outgoing API request...`);
    event.preventDefault();
    setState(EState.Processing);
    setError(null);

    const message: IRequestGenerateSuggestion = {
      type: 'REQUEST_GENERATE_SUGGESTION',
      query: text,
    };

    try {
      logger(`[RqId:${requestId}] Sending request for: ${text}`);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STORYSEEKER_SERVICE_URL}/suggestions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        }
      );

      logger(`[RqId:${requestId}] Response recieved`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const parsedResult = JSON.parse(result);
      logger(`[RqId:${requestId}] Received suggestions: ${result}`);
      if (
        (!parsedResult.suggestions.books ||
          parsedResult.suggestions.books.length === 0) &&
        (!parsedResult.suggestions.movies ||
          parsedResult.suggestions.movies.length === 0)
      ) {
        setState(EState.Idle);
        setError('There are suggestions for your request');
      } else {
        setRecommendations(parsedResult.suggestions);
        setState(EState.Processed);
      }
    } catch (e) {
      logger(`[RqId:${requestId}] ${e.message}`);
      setError(e.message);
      setState(EState.Idle);
    }

    setText('');
    setRequestId((prev) => prev + 1);
  }

  return (
    <div className="flex flex-grow flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Story Seeker
      </h1>
      <h2 className="text-lg md:text-xl text-center">{state}</h2>
      <div className="flex flex-grow items-center justify-center w-full">
        {state === EState.Idle && (
          <Form
            text={text}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
          />
        )}
        {state === EState.Processing && <Processing />}
        {state === EState.Processed && (
          <Recommendations
            setState={setState}
            recommendations={recommendations}
          />
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
