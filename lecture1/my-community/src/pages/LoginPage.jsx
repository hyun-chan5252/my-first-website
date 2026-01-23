import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { supabase } from '../utils/supabase';

/**
 * LoginPage 컴포넌트
 *
 * 로그인 페이지
 * - 아이디, 비밀번호 입력
 * - 로그인 성공 시 게시물 목록 페이지로 이동
 * - 회원가입 페이지로 이동 버튼
 */
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (fetchError || !data) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/posts');
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.125rem' }
            }}
          >
            hell스터디
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="아이디"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleSignUpClick}
              sx={{ py: 1.5 }}
            >
              회원가입하러 가기
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
