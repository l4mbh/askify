import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { acrylicBase, acrylicButton, themeAwareText, colors } from '../../styles/theme';
import { AcrylicButton, AcrylicInput } from '../../components/shared';
import { LoadingSpinner, PageTransition, StaggerContainer, StaggerItem, AnimatedButton, AnimatedInput } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';

const RegisterPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.1) 0%, 
    rgba(34, 197, 94, 0.1) 50%,
    rgba(59, 130, 246, 0.1) 100%
  );
`;

const RegisterLeftSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const BrandSection = styled(motion.div)`
  text-align: center;
  color: white;
  z-index: 2;
`;

const BrandLogo = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const BrandTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const BrandSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 400px;
`;

const RegisterRightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    padding: 20px;
  }
`;

const RegisterCard = styled(motion.div)`
  ${acrylicBase}
  width: 100%;
  max-width: 480px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const RegisterTitle = styled(motion.h2)`
  ${themeAwareText}
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const RegisterSubtitle = styled(motion.p)`
  ${themeAwareText}
  opacity: 0.7;
  font-size: 1rem;
`;

const RegisterForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  ${themeAwareText}
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.8;
`;

const PasswordRequirements = styled(motion.div)`
  font-size: 0.8rem;
  opacity: 0.7;
  ${themeAwareText}
  
  ul {
    margin: 8px 0 0 0;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 4px;
  }
`;

const TermsCheckbox = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 10px 0;
  
  input[type="checkbox"] {
    margin-top: 3px;
    accent-color: #10b981;
  }
  
  label {
    ${themeAwareText}
    font-size: 0.9rem;
    line-height: 1.5;
    
    a {
      color: ${colors.light.text.accent};
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
      
      .dark & {
        color: ${colors.dark.text.accent};
      }
    }
  }
`;

const SocialLoginSection = styled(motion.div)`
  margin: 30px 0;
`;

const SocialLoginTitle = styled.div`
  ${themeAwareText}
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 20px;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: ${colors.light.border.divider};
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
  
  .dark &::before,
  .dark &::after {
    background: ${colors.dark.border.divider};
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialButton = styled(motion.button)`
  ${acrylicButton}
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
`;

const GoogleButton = styled(SocialButton)`
  background: white;
  color: #4285f4;
  border: 2px solid #4285f4;
  
  &:hover {
    background: #4285f4;
    color: white;
  }
`;

const FacebookButton = styled(SocialButton)`
  background: #1877f2;
  color: white;
  border: 2px solid #1877f2;
  
  &:hover {
    background: #166fe5;
  }
`;

const LoginLink = styled(motion.div)`
  ${themeAwareText}
  text-align: center;
  font-size: 0.9rem;
  
  a {
    color: ${colors.light.text.accent};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
    
    .dark & {
      color: ${colors.dark.text.accent};
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

// Animation variants
const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.8 },
  in: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      delay: 0.2
    }
  }
};

const brandVariants = {
  initial: { opacity: 0, x: -50 },
  in: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      staggerChildren: 0.1
    }
  }
};

const socialButtonVariants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    
    if (!acceptTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Register with ${provider}`);
  };

  return (
    <PageTransition direction="left">
      <RegisterPageContainer>
        <RegisterLeftSection
          variants={brandVariants}
          initial="initial"
          animate="in"
        >
          <BrandSection>
            <BrandLogo
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
            >
              🎯
            </BrandLogo>
            <BrandTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Askify
            </BrandTitle>
            <BrandSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Bắt đầu hành trình học hỏi và chia sẻ kiến thức cùng cộng đồng
            </BrandSubtitle>
          </BrandSection>
        </RegisterLeftSection>

        <RegisterRightSection>
          <RegisterCard
            variants={cardVariants}
            initial="initial"
            animate="in"
          >
            <StaggerContainer staggerDelay={0.08}>
              <RegisterHeader>
                <StaggerItem>
                  <RegisterTitle>Tạo tài khoản mới</RegisterTitle>
                </StaggerItem>
                <StaggerItem>
                  <RegisterSubtitle>Tham gia cộng đồng học hỏi ngay hôm nay</RegisterSubtitle>
                </StaggerItem>
              </RegisterHeader>

              {error && (
                <StaggerItem>
                  <ErrorMessage
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {error}
                  </ErrorMessage>
                </StaggerItem>
              )}

              <RegisterForm onSubmit={handleSubmit}>
                <StaggerItem>
                  <InputGroup>
                    <AnimatedInput
                      type="text"
                      name="name"
                      label="Họ và tên"
                      placeholder="Nhập họ và tên của bạn"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </StaggerItem>

                <StaggerItem>
                  <InputGroup>
                    <AnimatedInput
                      type="email"
                      name="email"
                      label="Email"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </StaggerItem>

                <StaggerItem>
                  <InputGroup>
                    <AnimatedInput
                      type="password"
                      name="password"
                      label="Mật khẩu"
                      placeholder="Tạo mật khẩu"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <PasswordRequirements
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.5 }}
                    >
                      Mật khẩu nên có:
                      <ul>
                        <li>Ít nhất 6 ký tự</li>
                        <li>Bao gồm chữ và số</li>
                        <li>Có ký tự đặc biệt</li>
                      </ul>
                    </PasswordRequirements>
                  </InputGroup>
                </StaggerItem>

                <StaggerItem>
                  <InputGroup>
                    <AnimatedInput
                      type="password"
                      name="confirmPassword"
                      label="Xác nhận mật khẩu"
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </StaggerItem>

                <StaggerItem>
                  <TermsCheckbox
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="acceptTerms">
                      Tôi đồng ý với <Link to="/terms">Điều khoản sử dụng</Link> và <Link to="/privacy">Chính sách bảo mật</Link>
                    </label>
                  </TermsCheckbox>
                </StaggerItem>

                <StaggerItem>
                  <AnimatedButton
                    type="submit"
                    variant="success"
                    fullWidth
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="sm" text="Đang tạo tài khoản..." />
                    ) : (
                      'Tạo tài khoản'
                    )}
                  </AnimatedButton>
                </StaggerItem>
              </RegisterForm>

              <SocialLoginSection>
                <StaggerItem>
                  <SocialLoginTitle>Hoặc đăng ký bằng</SocialLoginTitle>
                </StaggerItem>
                <StaggerItem>
                  <SocialButtons>
                    <GoogleButton 
                      onClick={() => handleSocialLogin('google')}
                      variants={socialButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </GoogleButton>
                    <FacebookButton 
                      onClick={() => handleSocialLogin('facebook')}
                      variants={socialButtonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </FacebookButton>
                  </SocialButtons>
                </StaggerItem>
              </SocialLoginSection>

              <StaggerItem>
                <LoginLink
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                </LoginLink>
              </StaggerItem>
            </StaggerContainer>
          </RegisterCard>
        </RegisterRightSection>
      </RegisterPageContainer>
    </PageTransition>
  );
}

export default RegisterPage; 