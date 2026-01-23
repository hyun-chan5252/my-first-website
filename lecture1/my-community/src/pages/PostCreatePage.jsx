import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../utils/supabase';

/**
 * PostCreatePage 컴포넌트
 *
 * 게시물 작성 페이지
 * - 상단: 뒤로가기 버튼
 * - 제목, 내용 입력
 * - 업로드 버튼
 */
function PostCreatePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleBack = () => {
    navigate('/posts');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert([{
          title: title.trim(),
          content: content.trim(),
          author_id: user.id,
          author_name: user.username
        }])
        .select()
        .single();

      if (insertError) {
        setError('게시물 작성 중 오류가 발생했습니다.');
        setIsSubmitting(false);
        return;
      }

      navigate(`/posts/${data.id}`);
    } catch (err) {
      setError('게시물 작성 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

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
            글쓰기
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Paper elevation={2} sx={{ borderRadius: 2, p: { xs: 2, md: 4 } }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="제목"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <TextField
              fullWidth
              label="내용"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={12}
              sx={{ mb: 3 }}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ py: 1.5 }}
            >
              {isSubmitting ? '업로드 중...' : '업로드'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PostCreatePage;
