import { TextArea } from '@/components/TextArea';
import { Button } from '@/components/Button';

interface IForm {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
  submitByEnter?: boolean;
}

export default function Form({
  handleSubmit,
  handleTextChange,
  submitByEnter,
  text,
}: IForm) {
  const enableSubmit = text.trim().length !== 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (submitByEnter && event.key === 'Enter') {
      event.preventDefault();
      if (enableSubmit) {
        const submitEvent = new Event('submit', { bubbles: true });
        event.currentTarget.form.dispatchEvent(submitEvent);
      }
    }
  };

  return (
    <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
      <TextArea
        id="inputField"
        value={text}
        maxLength={500}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        rows={5}
        placeholder="Just ask for a recomendation (max 500 characters)"
      />
      <Button
        type="submit"
        height="w-[160px]"
        width="h-[40px]"
        className="mt-4"
        isDisabled={!enableSubmit}
      />
    </form>
  );
}
