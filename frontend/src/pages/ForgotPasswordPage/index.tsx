import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { acrylicBase, themeAwareText, colors } from '../../styles/theme';
import { AcrylicButton, AcrylicInput } from '../../components/shared';
import { LoadingSpinner, PageTransition, StaggerContainer, StaggerItem, AnimatedButton, AnimatedInput } from '../../components/ui';

const ForgotPasswordPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, 
    rgba(139, 69, 19, 0.1) 0%, 
    rgba(245, 101, 101, 0.1) 50%,
    rgba(251, 191, 36, 0.1) 100%
  );
`;

const ForgotPasswordLeftSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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

const ForgotPasswordRightSection = styled.div`
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

const ForgotPasswordCard = styled(motion.div)`
  ${acrylicBase}
  width: 100%;
  max-width: 480px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
`;

const ForgotPasswordHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ForgotPasswordTitle = styled(motion.h2)`
  ${themeAwareText}
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ForgotPasswordSubtitle = styled(motion.p)`
  ${themeAwareText}
  opacity: 0.7;
  font-size: 1rem;
  line-height: 1.5;
`;

const ForgotPasswordForm = styled(motion.form)`
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

const InfoBox = styled(motion.div)`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #1e40af;
  padding: 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
  
  .dark & {
    color: #60a5fa;
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.4);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #047857;
  padding: 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
  
  .dark & {
    color: #34d399;
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.4);
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

const BackToLoginLink = styled(motion.div)`
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

const successCardVariants = {
  initial: { opacity: 0, scale: 0.8, rotateY: 180 },
  in: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      delay: 0.2
    }
  }
};

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <PageTransition direction="up">
        <ForgotPasswordPageContainer>
          <ForgotPasswordLeftSection
            variants={brandVariants}
            initial="initial"
            animate="in"
          >
            <BrandSection>
              <BrandLogo
                initial={{ scale: 0, rotate: 360 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
              >
                🔑
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
                Khôi phục mật khẩu dễ dàng và bảo mật
              </BrandSubtitle>
            </BrandSection>
          </ForgotPasswordLeftSection>

          <ForgotPasswordRightSection>
            <ForgotPasswordCard
              variants={successCardVariants}
              initial="initial"
              animate="in"
            >
              <StaggerContainer staggerDelay={0.1}>
                <ForgotPasswordHeader>
                  <StaggerItem>
                    <ForgotPasswordTitle>Email đã được gửi!</ForgotPasswordTitle>
                  </StaggerItem>
                  <StaggerItem>
                    <ForgotPasswordSubtitle>
                      Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến email của bạn
                    </ForgotPasswordSubtitle>
                  </StaggerItem>
                </ForgotPasswordHeader>

                <StaggerItem>
                  <SuccessMessage
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    📧 Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu. 
                    Nếu không thấy email, hãy kiểm tra thư mục spam.
                  </SuccessMessage>
                </StaggerItem>

                <StaggerItem>
                  <BackToLoginLink
                    whileHover={{ scale: 1.02, x: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link to="/login">← Quay lại đăng nhập</Link>
                  </BackToLoginLink>
                </StaggerItem>
              </StaggerContainer>
            </ForgotPasswordCard>
          </ForgotPasswordRightSection>
        </ForgotPasswordPageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition direction="up">
      <ForgotPasswordPageContainer>
        <ForgotPasswordLeftSection
          variants={brandVariants}
          initial="initial"
          animate="in"
        >
          <BrandSection>
            <BrandLogo
              initial={{ scale: 0, rotate: 360 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
            >
              🔑
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
              Khôi phục mật khẩu dễ dàng và bảo mật
            </BrandSubtitle>
          </BrandSection>
        </ForgotPasswordLeftSection>

        <ForgotPasswordRightSection>
          <ForgotPasswordCard
            variants={cardVariants}
            initial="initial"
            animate="in"
          >
            <StaggerContainer staggerDelay={0.1}>
              <ForgotPasswordHeader>
                <StaggerItem>
                  <ForgotPasswordTitle>Quên mật khẩu?</ForgotPasswordTitle>
                </StaggerItem>
                <StaggerItem>
                  <ForgotPasswordSubtitle>
                    Không sao cả! Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn để đặt lại mật khẩu
                  </ForgotPasswordSubtitle>
                </StaggerItem>
              </ForgotPasswordHeader>

              <StaggerItem>
                <InfoBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  💡 Chúng tôi sẽ gửi một liên kết khôi phục mật khẩu đến email bạn đã đăng ký. 
                  Liên kết này sẽ có hiệu lực trong 1 giờ.
                </InfoBox>
              </StaggerItem>

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

              <ForgotPasswordForm onSubmit={handleSubmit}>
                <StaggerItem>
                  <InputGroup>
                    <AnimatedInput
                      type="email"
                      label="Email đã đăng ký"
                      placeholder="Nhập email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </StaggerItem>

                <StaggerItem>
                  <AnimatedButton
                    type="submit"
                    variant="warning"
                    fullWidth
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="sm" text="Đang gửi email..." />
                    ) : (
                      'Gửi hướng dẫn khôi phục'
                    )}
                  </AnimatedButton>
                </StaggerItem>
              </ForgotPasswordForm>

              <StaggerItem>
                <BackToLoginLink
                  whileHover={{ scale: 1.02, x: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link to="/login">← Quay lại đăng nhập</Link>
                </BackToLoginLink>
              </StaggerItem>
            </StaggerContainer>
          </ForgotPasswordCard>
        </ForgotPasswordRightSection>
      </ForgotPasswordPageContainer>
    </PageTransition>
  );
}

export default ForgotPasswordPage; 