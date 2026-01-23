import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../utils/supabase';

/**
 * SignUpPage 컴포넌트
 *
 * 회원가입 페이지
 * - 상단 네비게이션에 뒤로가기 버튼
 * - 아이디, 비밀번호 입력
 * - 회원가입 성공 시 로그인 페이지로 이동
 */
function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate('/login');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (username.length < 3) {
      setError('아이디는 3자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    if (password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();

      if (existingUser) {
        setError('이미 사용 중인 아이디입니다.');
        setIsLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert([{ username, password }]);

      if (insertError) {
        setError('회원가입 중 오류가 발생했습니다.');
        setIsLoading(false);
        return;
      }

      setSuccess('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            회원가입
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 }
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
              variant="h5"
              component="h1"
              align="center"
              sx={{ mb: 4, fontWeight: 600 }}
            >
              hell스터디 가입하기
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSignUp}>
              <TextField
                fullWidth
                label="아이디"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
                required
                helperText="3자 이상 입력해주세요"
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
                helperText="4자 이상 입력해주세요"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ py: 1.5 }}
              >
                {isLoading ? '가입 중...' : '회원가입 하기'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default SignUpPage;
