import type { ButtonProps } from '../types/Button.interface';

const Button = ({ disabled, type, title, onClick }: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {title}
      </button>
    </>
  );
};

export default Button;
