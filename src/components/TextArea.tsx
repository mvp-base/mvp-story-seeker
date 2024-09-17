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
    <div className="relative flex flex-col">
      <div className="absolute inset-0 bg-black z-10 translate-x-1 translate-y-1"></div>

      <div className="relative border-4 border-black bg-gray-300 z-20 px-1">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          className="bg-transparent p-3 max-h-[400px] w-full box-border focus:outline-none"
        />
      </div>
    </div>
  );
}
