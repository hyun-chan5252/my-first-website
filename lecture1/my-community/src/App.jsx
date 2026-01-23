import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage';

/**
 * App 컴포넌트
 *
 * hell스터디 커뮤니티의 메인 라우팅 컴포넌트
 */
function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/create" element={<PostCreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
