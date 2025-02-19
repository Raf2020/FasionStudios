type InputProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
};

const Input = ({ label, value, setValue }: InputProps) => {
  return (
    <div className="w-full">
      <p className="pb-2 text-black text-base font-semibold">{label}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        className="w-full h-12 px-5 rounded-lg border border-neutral-200 focus:outline-none"
      />
    </div>
  );
};

export default Input;
