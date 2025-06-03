import styled from 'styled-components';
import { acrylicInputEffect } from '../../styles/sharedStyles';

// Props cho AcrylicInput
interface AcrylicInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Styled AcrylicInput component
const StyledAcrylicInput = styled.input`
  ${acrylicInputEffect}
  padding: 0.75rem;
  color: #1f2937;
  font-size: 1rem;
  outline: none;
  width: 100%;
  
  .dark & {
    color: #f9fafb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: rgba(107, 114, 128, 0.7);
    
    .dark & {
      color: rgba(156, 163, 175, 0.7);
    }
  }
`;

// AcrylicInput component
function AcrylicInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className,
  ...props
}: AcrylicInputProps) {
  return (
    <StyledAcrylicInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={className}
      {...props}
    />
  );
}

export default AcrylicInput; 