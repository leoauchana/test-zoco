import './Shared.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LoadingSpinner({ message, size = 'medium' }: LoadingSpinnerProps) {
  return (
    <div className="spinner-container">
      <div className={`spinner spinner--${size}`}></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
}