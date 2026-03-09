export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  title: string;
  className?: string;
}
