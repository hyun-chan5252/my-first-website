import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import { supabase } from '../../lib/supabase';

/**
 * GuestbookList 컴포넌트
 * 방명록 목록 표시
 *
 * Props:
 * @param {number} refreshKey - 목록 새로고침 트리거 키 [Optional, 기본값: 0]
 *
 * Example usage:
 * <GuestbookList refreshKey={refreshCounter} />
 */
function GuestbookList({ refreshKey = 0 }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuestbook();
  }, [refreshKey]);

  const fetchGuestbook = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (fetchError) throw fetchError;
      setEntries(data || []);
    } catch (err) {
      setError(err.message || '방명록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#1976d2', '#388e3c', '#f57c00', '#7b1fa2',
      '#c2185b', '#0097a7', '#455a64', '#5d4037'
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} elevation={0} sx={{ bgcolor: 'grey.50', borderRadius: 2 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" height={24} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        {error}
      </Alert>
    );
  }

  if (entries.length === 0) {
    return (
      <Card
        elevation={0}
        sx={{
          bgcolor: 'grey.50',
          borderRadius: 2,
          textAlign: 'center',
          py: 6
        }}
      >
        <Typography color="text.secondary">
          아직 작성된 방명록이 없습니다.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          첫 번째 방명록을 남겨보세요!
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 1,
          fontSize: { xs: '1.25rem', md: '1.5rem' }
        }}
      >
        방명록 ({entries.length})
      </Typography>

      {entries.map((entry) => (
        <Card
          key={entry.id}
          elevation={0}
          sx={{
            bgcolor: 'grey.50',
            borderRadius: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 2
            }
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: getAvatarColor(entry.author_name),
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                {getInitial(entry.author_name)}
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    {entry.author_name}
                  </Typography>

                  {entry.organization && (
                    <Chip
                      icon={<BusinessIcon sx={{ fontSize: '0.875rem !important' }} />}
                      label={entry.organization}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 22,
                        '& .MuiChip-label': {
                          px: 1,
                          fontSize: '0.7rem'
                        }
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: 'text.primary',
                    mb: 1.5,
                    lineHeight: 1.6
                  }}
                >
                  {entry.message}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: { xs: 1, md: 2 }
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                  >
                    {formatDate(entry.created_at)}
                  </Typography>

                  {entry.is_email_public && entry.email && (
                    <Box
                      component="a"
                      href={`mailto:${entry.email}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      <EmailIcon sx={{ fontSize: '0.875rem' }} />
                      {entry.email}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default GuestbookList;
