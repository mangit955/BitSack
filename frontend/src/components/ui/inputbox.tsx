interface InputProps {
  placeholder: string;
  ref?: React.Ref<HTMLInputElement>;
}
export function Input({ placeholder, ref }: InputProps) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={"text"}
        className="text-gray-600 px-4 py-2 shadow-sm border border-slate-300 rounded m-2 hover:bg-slate-200"
        ref={ref}
      ></input>
    </div>
  );
}
