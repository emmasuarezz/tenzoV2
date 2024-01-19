import "../styles/CSS/input.css";

type InputProps = {
  placeholder: string;
  required: boolean;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

function Input({ placeholder, required, type, value, onChange }: InputProps) {
  return (
    <div className="input-wrapper">
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          console.log(value);
        }}
      />
    </div>
  );
}

export default Input;
