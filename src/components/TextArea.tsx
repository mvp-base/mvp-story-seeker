interface ITextArea {
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
}

export function TextArea({
  id = 'textarea',
  value = '',
  onChange,
  rows = 3,
  maxLength = 200,
  placeholder = 'Enter your text here (max 200 characters)',
}: ITextArea) {
  return (
    <div className="relative w-full md:w-[80%] xl:w-[50%]">
      <div
        className={`absolute inset-0 bg-black border-4 border-black translate-x-1 translate-y-1`}
      ></div>

      <div className="relative border-4 border-black bg-gray-200 z-20 px-1 focus-within:-translate-x-1 focus-within:-translate-y-1 transition-transform duration-300">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          className="text-sm md:text-md bg-transparent p-3 max-h-[300px] min-h-[100px] w-full box-border focus:outline-none group"
        />
      </div>
    </div>
  );
}
