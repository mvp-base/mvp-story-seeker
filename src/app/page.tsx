'use client';

import Form from '@/components/Form';
import Processing from '@/components/Processing';
import { Recommendations } from '@/components/Recommendations';
import { Notification } from '@/components/Notification';
import { EState } from '@/utils/enums';
import { logger } from '@/utils/logger';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IApiResponse } from '@/utils/types';

import 'react-toastify/dist/ReactToastify.css';

interface IRequestGenerateSuggestion {
  type: 'REQUEST_GENERATE_SUGGESTION';
  query: string;
}

export default function Home() {
  const [requestId, setRequestId] = useState(0);
  const [text, setText] = useState('');
  const [state, setState] = useState(EState.Idle);
  const [recommendations, setRecommendations] = useState(null);

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    logger(`[RqId:${requestId}] New outgoing API request...`);
    setState(EState.Processing);

    const message: IRequestGenerateSuggestion = {
      type: 'REQUEST_GENERATE_SUGGESTION',
      query: text,
    };

    try {
      logger(`[RqId:${requestId}] Sending request for: ${text}`);

      const response = await fetch(`https://api.matejv.com/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const rawResponse = await response.text();
      logger(`[RqId:${requestId}] Raw Response: ${rawResponse}`);

      let result: IApiResponse;
      try {
        result = JSON.parse(rawResponse);
        logger(`[RqId:${requestId}] Parsed JSON: ${JSON.stringify(result)}`);
      } catch (jsonParseError) {
        throw new Error(`Error parsing JSON: ${jsonParseError.message}`);
      }

      if (
        (!result.suggestions.books || result.suggestions.books.length === 0) &&
        (!result.suggestions.movies || result.suggestions.movies.length === 0)
      ) {
        setState(EState.Idle);
        toast(<Notification type="warning" message="No suggestions :(" />);
      } else {
        setRecommendations(result.suggestions);
        setState(EState.Processed);
      }

    } catch (e) {
      logger(`[RqId:${requestId}] Error: ${e.message}`);
      toast(<Notification type="error" message={e.message} />);
      setState(EState.Idle);
    }

    setText('');
    setRequestId((prev) => prev + 1);


  }

  return (
    <div className="flex flex-grow flex-col items-center w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Story Seeker
      </h1>
      <h2 className="text-lg md:text-xl text-center">{state}</h2>
      <div className="flex flex-col flex-grow items-center justify-center w-full">
        {state === EState.Idle && (
          <Form
            text={text}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
            submitByEnter={true}
          />
        )}
        {state === EState.Processing && <Processing />}
        {state === EState.Processed && (
          <Recommendations
            setState={setState}
            recommendations={recommendations}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          toastClassName="toast-transparent"
        />
      </div>
    </div>
  );
}
