import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddSectionModal({
  open,
  handleClose,
  handleContentTypeChange,
  contentType,
  handleSubmit,
  contentFormData,
  setContentFormData,
  setVideoFile,
  setPdfFile,
  pdfFile,
  videoFile,
  handleQuizFieldChange,
  addOption,
  removeOption,
  handleOptionChange,
  quizFields
}) {
 
  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle video file upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setContentFormData((prev) => ({ ...prev, file }));
    }
  };

  // Handle PDF file upload
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setContentFormData((prev) => ({ ...prev, file }));
    }
  };
  
   const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit();
  };
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} component="form" onSubmit={onSubmit}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Add Content
          </Typography>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Content Type</InputLabel>
            <Select
              value={contentType}
              onChange={handleContentTypeChange}
              label="Content Type"
            >
              <MenuItem value="quiz">Quiz</MenuItem>
              <MenuItem value="external_content">Extra Material</MenuItem>
              <MenuItem value="lesson">Video</MenuItem>
            </Select>
          </FormControl>

          {/* Conditional rendering based on content type */}
          {contentType === 'quiz' && (
            <>
             <TextField
                fullWidth
                label="Quiz Title"
                name="title"
                value={quizFields.title}
                onChange={handleQuizFieldChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Question Text"
                name="question_text"
                value={quizFields.question_text}
                onChange={handleQuizFieldChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Marks"
                name="marks"
                type="number"
                value={quizFields.marks}
                onChange={handleQuizFieldChange}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Options
              </Typography>
              {quizFields.options.map((option, index) => (
                <FormGroup key={index} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option.option_text}
                    onChange={(e) =>
                      handleOptionChange(index, 'option_text', e.target.value)
                    }
                    sx={{ mb: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={option.is_correct}
                        onChange={(e) =>
                          handleOptionChange(
                            index,
                            'is_correct',
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Is Correct"
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeOption(index)}
                    sx={{ mt: 1 }}
                  >
                    Remove Option
                  </Button>
                </FormGroup>
              ))}
              <Button variant="contained" onClick={addOption} sx={{ mb: 2 }}>
                Add Option
              </Button>
            </>
          )}

          {contentType === 'lesson' && (
            <>
              <TextField
                fullWidth
                label="Video Title"
                name="title"
                value={contentFormData.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Upload Video
                </Typography>
                <input
                  className="form-control"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                {videoFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {videoFile?.name || videoFile}
                  </Typography>
                )}
              </Box>
            </>
          )}

          {contentType === 'external_content' && (
            <>
              <TextField
                fullWidth
                label="Extra Material Title"
                name="title"
                value={contentFormData.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Upload PDF
                </Typography>
                <input
                  type="file"
                  className="form-control"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                />
                {pdfFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {pdfFile?.name || pdfFile}
                  </Typography>
                )}
              </Box>
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}