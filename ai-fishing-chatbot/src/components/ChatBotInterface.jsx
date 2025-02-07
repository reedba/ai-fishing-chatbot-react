import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Paper, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ChatBotInterface = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [region, setRegion] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', { query: input, region });
      setOutput(response.data.answer);
    } catch (error) {
      console.error('Error making request:', error);
      setOutput('Sorry, something went wrong.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI Fishing Chatbot
        </Typography>
        <Stack spacing={2}>
          <Paper elevation={3} style={{ padding: '32px', minHeight: '150px' }}>
            <Typography variant="h6" component="h3">
              Response:
            </Typography>
            <Typography variant="body1">{output}</Typography>
          </Paper>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="region-select-label">Select Region</InputLabel>
              <Select
                labelId="region-select-label"
                value={region}
                onChange={handleRegionChange}
                label="Select Region"
              >
                <MenuItem value="Bahamas">Bahamas</MenuItem>
                <MenuItem value="Charleston">Charleston</MenuItem>
                <MenuItem value="Florida Keys">Florida Keys</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" alignItems="center" mt={2}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Ask something..."
                value={input}
                onChange={handleInputChange}
                style={{ marginRight: '16px' }}
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default ChatBotInterface;