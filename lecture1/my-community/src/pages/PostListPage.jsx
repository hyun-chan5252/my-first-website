import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddIcon from '@mui/icons-material/Add';
import { supabase } from '../utils/supabase';

/**
 * PostListPage 컴포넌트
 *
 * 게시물 목록 페이지
 * - 상단: 로그인한 아이디 + 로그아웃 버튼
 * - 게시물 목록 (10개씩 페이지네이션)
 * - 게시물 작성 버튼
 */
function PostListPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 10;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { count } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

      setTotalPages(Math.ceil((count || 0) / postsPerPage));

      const from = (page - 1) * postsPerPage;
      const to = from + postsPerPage - 1;

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleCreatePost = () => {
    navigate('/posts/create');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!user) return null;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            hell스터디
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              {user.username}님 환영합니다
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            게시물 목록
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreatePost}
          >
            글쓰기
          </Button>
        </Box>

        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {isLoading ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">로딩 중...</Typography>
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                아직 게시물이 없습니다. 첫 게시물을 작성해보세요!
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {posts.map((post, index) => (
                <ListItemButton
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  sx={{
                    py: 2,
                    px: 3,
                    borderBottom: index < posts.length - 1 ? 1 : 0,
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {truncateText(post.content, 80)}
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flexWrap: 'wrap'
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        {post.author_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(post.created_at)}
                      </Typography>
                      <Chip
                        icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                        label={post.likes_count}
                        size="small"
                        variant="outlined"
                        sx={{ height: 24 }}
                      />
                      <Chip
                        icon={<ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />}
                        label={post.comments_count}
                        size="small"
                        variant="outlined"
                        sx={{ height: 24 }}
                      />
                    </Box>
                  </Box>
                </ListItemButton>
              ))}
            </List>
          )}
        </Paper>

        {totalPages > 1 && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3
          }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PostListPage;
