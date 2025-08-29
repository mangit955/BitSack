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
        className="text-white px-4 py-2 shadow-sm rounded m-2 hover:bg-[#00afa7]"
        ref={ref}
      ></input>
    </div>
  );
}
