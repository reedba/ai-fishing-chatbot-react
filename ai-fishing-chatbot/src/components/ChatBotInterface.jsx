import React, { useState } from 'react';
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
    setOutput(''); // Clear previous output

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, region }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });
        setOutput((prevOutput) => prevOutput + chunk);
      }
    } catch (error) {
      console.error('Error making request:', error);
      setOutput(`Sorry, something went wrong: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/path/to/your/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '16px'
      }}
    >
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
    </Box>
  );
};

export default ChatBotInterface;