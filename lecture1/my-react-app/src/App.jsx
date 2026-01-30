import Box from '@mui/material/Box';
import ContactSection from './components/contact/contact-section';

function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ContactSection
        email="contact@example.com"
        location="Seoul, Korea"
        socialLinks={{
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        }}
      />
    </Box>
  );
}

export default App;
