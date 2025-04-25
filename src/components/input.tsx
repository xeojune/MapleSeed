import { useState } from 'react';
import { 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Paper, 
  Box,
  Typography,
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Tooltip
} from '@mui/material';

interface InputProps {
  onCalculate: (values: {
    S: number;
    P_s: number;
    F_s: number;
    O_c: number;
    R: number;
    P_o: number;
    F_o: number;
    M: number;
  }) => void;
  onBreakEvenCalculate: (values: {
    P_s: number;
    O_c: number;
    R: number;
    F_o: number;
  }) => void;
  onTabChange: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Input = ({ onCalculate, onBreakEvenCalculate, onTabChange }: InputProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [hasDiscountedFee, setHasDiscountedFee] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    onTabChange();
  };

  const handleProfitSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert inputs from 억/만 units to actual values
    const capital = Number(formData.get('M')) * 100000000; // 억 to actual
    const seedPrice = Number(formData.get('P_s')) * 10000; // 만 to actual
    const oilPrice = Number(formData.get('P_o')) * 10000; // 만 to actual
    
    const feeRate = hasDiscountedFee ? 0.03 : 0.05;
    
    onCalculate({
      S: Number(formData.get('S')),
      P_s: seedPrice,
      F_s: feeRate,
      O_c: 6, // Fixed 6 seeds
      R: 0.9, // Fixed 90%
      P_o: oilPrice,
      F_o: feeRate,
      M: capital,
    });
  };

  const handleBreakEvenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const seedPrice = Number(formData.get('break_P_s')) * 10000; // 만 to actual
    
    const feeRate = hasDiscountedFee ? 0.03 : 0.05;
    
    onBreakEvenCalculate({
      P_s: seedPrice,
      O_c: 6, // Fixed 6 seeds
      R: 0.9, // Fixed 90%
      F_o: feeRate,
    });
  };

  return (
    <Paper elevation={3} sx={{ height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="수익 계산" />
          <Tab label="손익분기점 계산" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        <FormGroup>
          <Tooltip title="MVP 실버 등급 이상 또는 PC방 혜택 적용 시 수수료가 3%로 감소합니다">
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasDiscountedFee}
                  onChange={(e) => setHasDiscountedFee(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  MVP 실버 등급 이상 또는 PC방 혜택 적용 (수수료 3%)
                </Typography>
              }
            />
          </Tooltip>
        </FormGroup>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <form onSubmit={handleProfitSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                수익 계산
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="하루 수급 씨앗 개수"
                name="S"
                type="number"
                required
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="씨앗 1개 가격"
                name="P_s"
                type="number"
                inputProps={{ step: "0.1" }}
                required
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">만</InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="오일 1개 판매 가격"
                name="P_o"
                type="number"
                inputProps={{ step: "0.1" }}
                required
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">만</InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="현재 자본"
                name="M"
                type="number"
                inputProps={{ step: "0.1" }}
                required
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">억</InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                계산하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <form onSubmit={handleBreakEvenSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>
                손익분기점 계산
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="씨앗 1개 가격"
                name="break_P_s"
                type="number"
                inputProps={{ step: "0.1" }}
                required
                size="small"
                InputProps={{
                  endAdornment: <InputAdornment position="end">만</InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                손익분기점 계산하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
    </Paper>
  );
};

export default Input;