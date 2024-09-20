import { TextArea } from '@/components/TextArea';
import { Button } from '@/components/Button';

interface IForm {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
}

export default function Form({ handleSubmit, handleTextChange, text }: IForm) {
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <TextArea
        id="inputField"
        value={text}
        maxLength={500}
        onChange={handleTextChange}
        rows={5}
        placeholder="Just ask for a recomendation (max 500 characters)"
      />
      <Button
        type="submit"
        height="w-[160px]"
        width="h-[40px]"
        className="mt-4"
      />
    </form>
  );
}
