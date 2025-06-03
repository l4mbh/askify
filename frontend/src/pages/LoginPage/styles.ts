import styled from 'styled-components';
import { acrylicEffect, acrylicInputEffect } from '../../styles/sharedStyles';

// Container chính cho LoginPage sử dụng shared acrylic effect
export const LoginContainer = styled.div`
  ${acrylicEffect}
  padding: 3rem;
  margin: 2rem;
  width: 100%;
  max-width: 400px;
  color: #1f2937;
  
  .dark & {
    color: #f9fafb;
  }

  @media (max-width: 640px) {
    margin: 1rem;
    padding: 2rem;
  }
`;

// Title cho trang login
export const LoginTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 640px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

// Form wrapper
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Input styling sử dụng shared acrylic input effect
export const InputField = styled.input`
  ${acrylicInputEffect}
  padding: 0.75rem;
  color: #1f2937;
  font-size: 1rem;
  outline: none;
  
  .dark & {
    color: #f9fafb;
  }
`;

// Button styling - deprecated, nên dùng AcrylicButton component
export const LoginButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(59, 130, 246, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(37, 99, 235, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
`; 