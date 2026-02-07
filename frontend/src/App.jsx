
import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Typography, Box, Paper, Fade } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import FileUpload from './components/FileUpload';
import ResultDashboard from './components/ResultDashboard';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {!analysisResult ? (
            <Fade in={!analysisResult}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                  사건 위험도 분석
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 6,
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 800,
                    width: '100%'
                  }}
                >
                  <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
                    분석할 사건 조서(PDF)를 업로드해주세요.
                  </Typography>
                  <FileUpload onAnalysisComplete={handleAnalysisComplete} />
                </Paper>
              </Box>
            </Fade>
          ) : (
            <Fade in={!!analysisResult}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <ResultDashboard result={analysisResult} onReset={handleReset} />
              </Box>
            </Fade>
          )}

        </Box>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
