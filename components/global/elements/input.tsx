type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  password?: boolean;
};

const Input = ({
  label,
  placeholder,
  value,
  setValue,
  password,
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <p className="pb-2 text-black text-base font-semibold">{label}</p>
      )}
      <input
        type={password ? "password" : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label ?? placeholder}
        className="w-full h-12 px-5 rounded-lg border border-neutral-200 focus:outline-none"
      />
    </div>
  );
};

export default Input;
