import { HashLoader } from '@lidakai/react-spinners';

interface ILoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size, className }: ILoadingSpinnerProps) => (
  <div className={`flex items-center justify-center ${className ?? ''}`}>
    <HashLoader size={size ?? 100} color={'aqua'} />
  </div>
);
