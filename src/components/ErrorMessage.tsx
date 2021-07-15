import Alert from '@material-ui/lab/Alert';

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }: ErrorMessageProps) => (
  <Alert severity="error">{message}</Alert>
);
