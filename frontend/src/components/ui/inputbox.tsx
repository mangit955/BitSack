interface InputProps {
  placeholder: string;
  ref?: any;
}
export function Input({ placeholder, ref }: InputProps) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2 border border-slate-400 rounded m-2"
        ref={ref}
      ></input>
    </div>
  );
}
