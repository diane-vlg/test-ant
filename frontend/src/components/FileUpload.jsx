import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

import { analyzeDocument } from '../services/api';

export default function FileUpload({ onAnalysisComplete }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setError('PDF 파일만 업로드 가능합니다.');
            setFile(null);
            return;
        }
        setFile(selectedFile);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const result = await analyzeDocument(file);
            console.log("Analysis Result:", result);
            if (onAnalysisComplete) {
                onAnalysisComplete(result);
            }
        } catch (err) {
            console.error(err);
            setError(err.message || '파일 분석 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2, py: 1.5, px: 4, fontSize: '1.1rem' }}
            >
                PDF 파일 선택
                <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleFileChange} />
            </Button>

            {file && (
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="body1">선택된 파일: <strong>{file.name}</strong></Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleUpload}
                        disabled={uploading}
                        sx={{ mt: 1 }}
                    >
                        {uploading ? '업로드 중...' : '분석 시작'}
                    </Button>
                </Box>
            )}

            {uploading && (
                <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}
