import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../lib/supabase';

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 폼
 *
 * Props:
 * @param {function} onSubmitSuccess - 작성 성공 시 호출되는 콜백 함수 [Optional]
 *
 * Example usage:
 * <GuestbookForm onSubmitSuccess={() => fetchGuestbook()} />
 */
function GuestbookForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    authorName: '',
    message: '',
    organization: '',
    email: '',
    isEmailPublic: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('guestbook')
        .insert([{
          author_name: formData.authorName,
          message: formData.message,
          organization: formData.organization || null,
          email: formData.email || null,
          is_email_public: formData.isEmailPublic
        }]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({
        authorName: '',
        message: '',
        organization: '',
        email: '',
        isEmailPublic: false
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || '방명록 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'grey.50',
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: 'text.primary',
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}
        >
          방명록 작성
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            방명록이 성공적으로 등록되었습니다!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            name="authorName"
            label="이름"
            value={formData.authorName}
            onChange={handleChange}
            sx={{ mb: 2 }}
            size="small"
          />

          <TextField
            fullWidth
            name="organization"
            label="소속 (선택)"
            value={formData.organization}
            onChange={handleChange}
            sx={{ mb: 2 }}
            size="small"
            placeholder="회사, 학교 등"
          />

          <TextField
            fullWidth
            name="email"
            label="이메일 (선택)"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 1 }}
            size="small"
          />

          {formData.email && (
            <FormControlLabel
              control={
                <Checkbox
                  name="isEmailPublic"
                  checked={formData.isEmailPublic}
                  onChange={handleChange}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  이메일 공개
                </Typography>
              }
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            fullWidth
            required
            multiline
            rows={4}
            name="message"
            label="메시지"
            value={formData.message}
            onChange={handleChange}
            sx={{ mb: 3 }}
            placeholder="방명록에 남길 메시지를 작성해주세요."
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            {isSubmitting ? '등록 중...' : '방명록 남기기'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GuestbookForm;
