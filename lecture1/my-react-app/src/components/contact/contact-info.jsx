import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

/**
 * ContactInfo 컴포넌트
 * 연락처 정보와 SNS 링크를 카드 형태로 표시
 *
 * Props:
 * @param {string} email - 이메일 주소 [Optional, 기본값: 'contact@example.com']
 * @param {string} phone - 전화번호 [Optional, 기본값: '']
 * @param {string} location - 위치 정보 [Optional, 기본값: '']
 * @param {object} socialLinks - SNS 링크 객체 [Optional, 기본값: {}]
 *
 * Example usage:
 * <ContactInfo
 *   email="hello@example.com"
 *   socialLinks={{ github: 'https://github.com/username' }}
 * />
 */
function ContactInfo({
  email = 'contact@example.com',
  phone = '',
  location = '',
  socialLinks = {}
}) {
  const contactItems = [
    { icon: <EmailIcon />, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: <PhoneIcon />, label: 'Phone', value: phone, href: `tel:${phone}` },
    { icon: <LocationOnIcon />, label: 'Location', value: location, href: null }
  ].filter(item => item.value);

  const socialIcons = [
    { icon: <GitHubIcon />, key: 'github', label: 'GitHub' },
    { icon: <LinkedInIcon />, key: 'linkedin', label: 'LinkedIn' },
    { icon: <TwitterIcon />, key: 'twitter', label: 'Twitter' },
    { icon: <InstagramIcon />, key: 'instagram', label: 'Instagram' }
  ].filter(item => socialLinks[item.key]);

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        borderRadius: 3,
        height: '100%'
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 3,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}
        >
          연락처
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {contactItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.8,
                    display: 'block',
                    fontSize: '0.75rem'
                  }}
                >
                  {item.label}
                </Typography>
                {item.href ? (
                  <Typography
                    component="a"
                    href={item.href}
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {item.value}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                    {item.value}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {socialIcons.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.8,
                display: 'block',
                mb: 1.5,
                fontSize: '0.75rem'
              }}
            >
              소셜 미디어
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialIcons.map((item) => (
                <IconButton
                  key={item.key}
                  component="a"
                  href={socialLinks[item.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'inherit',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ContactInfo;
