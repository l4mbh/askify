import styled from 'styled-components';
import { acrylicEffect } from '../../styles/sharedStyles';

// Container chính cho RegisterPage sử dụng shared acrylic effect
export const RegisterContainer = styled.div`
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

// Title cho trang register
export const RegisterTitle = styled.h2`
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
export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

// Login link
export const LoginLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  
  a {
    color: #10b981;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`; 