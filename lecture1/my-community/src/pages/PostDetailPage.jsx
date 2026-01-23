import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { supabase } from '../utils/supabase';

/**
 * PostDetailPage 컴포넌트
 *
 * 게시물 상세 페이지
 * - 상단: 뒤로가기 버튼
 * - 게시물 제목, 내용, 작성자, 작성시간
 * - 좋아요 버튼 + 좋아요 수
 * - 댓글 영역: 댓글 수, 댓글 입력, 댓글 목록
 */
function PostDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchPost();
      fetchComments();
      checkLikeStatus();
    }
  }, [id, user]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        navigate('/posts');
        return;
      }

      setPost(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(data || []);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const checkLikeStatus = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', id)
        .eq('user_id', user.id)
        .single();

      setIsLiked(!!data);
    } catch (err) {
      setIsLiked(false);
    }
  };

  const handleBack = () => {
    navigate('/posts');
  };

  const handleLike = async () => {
    if (!user) return;

    try {
      if (isLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', id)
          .eq('user_id', user.id);

        await supabase
          .from('posts')
          .update({ likes_count: post.likes_count - 1 })
          .eq('id', id);

        setPost({ ...post, likes_count: post.likes_count - 1 });
        setIsLiked(false);
      } else {
        await supabase
          .from('likes')
          .insert([{ post_id: id, user_id: user.id }]);

        await supabase
          .from('posts')
          .update({ likes_count: post.likes_count + 1 })
          .eq('id', id);

        setPost({ ...post, likes_count: post.likes_count + 1 });
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          content: newComment.trim(),
          post_id: id,
          author_id: user.id,
          author_name: user.username
        }]);

      if (error) {
        console.error('Error adding comment:', error);
        return;
      }

      await supabase
        .from('posts')
        .update({ comments_count: post.comments_count + 1 })
        .eq('id', id);

      setPost({ ...post, comments_count: post.comments_count + 1 });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user || isLoading) {
    return (
      <Box sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  if (!post) return null;

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
            게시물
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Paper elevation={2} sx={{ borderRadius: 2, p: { xs: 2, md: 4 }, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            {post.title}
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            color: 'text.secondary'
          }}>
            <Typography variant="body2">{post.author_name}</Typography>
            <Typography variant="body2">{formatDate(post.created_at)}</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              mb: 3
            }}
          >
            {post.content}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleLike}
              color={isLiked ? 'error' : 'default'}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              좋아요 {post.likes_count}개
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ borderRadius: 2, p: { xs: 2, md: 4 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            댓글 {comments.length}개
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmitComment}
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3
            }}
          >
            <TextField
              fullWidth
              placeholder="댓글을 입력하세요"
              variant="outlined"
              size="small"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!newComment.trim() || isSubmitting}
            >
              등록
            </Button>
          </Box>

          {comments.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
            </Typography>
          ) : (
            <Box>
              {comments.map((comment, index) => (
                <Box
                  key={comment.id}
                  sx={{
                    py: 2,
                    borderBottom: index < comments.length - 1 ? 1 : 0,
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 1
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {comment.author_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(comment.created_at)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {comment.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
