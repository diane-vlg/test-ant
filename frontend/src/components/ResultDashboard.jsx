import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Button
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import RefreshIcon from '@mui/icons-material/Refresh';

const RiskChip = ({ score }) => {
    let color = 'default';
    if (score === 'High') color = 'error';
    if (score === 'Medium') color = 'warning';
    if (score === 'Low') color = 'success';

    return (
        <Chip
            label={score || 'Unknown'}
            color={color}
            variant="filled"
            sx={{ fontWeight: 'bold', px: 1 }}
        />
    );
};

const ResultIcon = ({ result }) => {
    if (result === 'Yes') return <WarningIcon color="error" />;
    if (result === 'No') return <CheckCircleIcon color="success" />;
    return <HelpIcon color="action" />;
};

export default function ResultDashboard({ result, onReset }) {
    if (!result) return null;

    return (
        <Box sx={{ width: '100%', maxWidth: 1000, mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                    분석 결과 리포트
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onReset}>
                    새로운 파일 분석
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Summary Card */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                사건 요약
                            </Typography>
                            <Typography variant="body1">
                                {result.summary}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Risk Score Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                종합 위험도 평가
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <RiskChip score={result.risk_score} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Checklist Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ bgcolor: '#eeeeee' }}>
                                <TableRow>
                                    <TableCell><strong>카테고리</strong></TableCell>
                                    <TableCell><strong>항목</strong></TableCell>
                                    <TableCell align="center"><strong>판단</strong></TableCell>
                                    <TableCell><strong>근거 (Evidence)</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.checklist && result.checklist.map((item, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.item}</TableCell>
                                        <TableCell align="center"><ResultIcon result={item.result} /></TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.evidence}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!result.checklist || result.checklist.length === 0) && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">체크리스트 데이터가 없습니다.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}
