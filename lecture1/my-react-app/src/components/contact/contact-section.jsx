import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ContactInfo from './contact-info';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';

/**
 * ContactSection 컴포넌트
 * Contact 섹션 메인 컴포넌트 - 연락처 정보와 방명록을 포함
 *
 * Props:
 * @param {string} email - 이메일 주소 [Optional, 기본값: 'contact@example.com']
 * @param {string} phone - 전화번호 [Optional]
 * @param {string} location - 위치 정보 [Optional]
 * @param {object} socialLinks - SNS 링크 객체 [Optional]
 *
 * Example usage:
 * <ContactSection
 *   email="hello@example.com"
 *   location="Seoul, Korea"
 *   socialLinks={{ github: 'https://github.com/username' }}
 * />
 */
function ContactSection({
  email = 'contact@example.com',
  phone = '',
  location = 'Seoul, Korea',
  socialLinks = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
}) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleGuestbookSubmit = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Contact
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 500,
              mx: 'auto',
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            궁금한 점이 있으시거나 연락이 필요하시면 아래 연락처로 문의해주세요.
            방명록도 남겨주시면 감사하겠습니다!
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <ContactInfo
                email={email}
                phone={phone}
                location={location}
                socialLinks={socialLinks}
              />
              <GuestbookForm onSubmitSuccess={handleGuestbookSubmit} />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <GuestbookList refreshKey={refreshKey} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactSection;
