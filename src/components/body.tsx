import { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Input from './input';
import Result from './result';

const Body = () => {
  const [profitResult, setProfitResult] = useState<{
    totalAssetSeedSale: number;
    oilSaleProfit: number;
    additionalProfit: number;
  } | undefined>();

  const [breakEvenResult, setBreakEvenResult] = useState<{
    breakEvenPrice: number;
  } | undefined>();

  const handleTabChange = () => {
    // Reset both results when tab changes
    setProfitResult(undefined);
    setBreakEvenResult(undefined);
  };

  const calculateProfit = (values: {
    S: number;
    P_s: number;
    F_s: number;
    O_c: number;
    R: number;
    P_o: number;
    F_o: number;
    M: number;
  }) => {
    const seedSaleProfit = values.S * values.P_s * (1 - values.F_s);
    const totalAssetSeedSale = values.M + seedSaleProfit;

    const totalSeeds = values.S + Math.floor(values.M / values.P_s);
    const oilCrafts = Math.floor(totalSeeds / values.O_c);
    const successfulOil = Math.floor(oilCrafts * values.R);
    const oilSaleProfit = successfulOil * values.P_o * (1 - values.F_o);

    setProfitResult({
      totalAssetSeedSale,
      oilSaleProfit,
      additionalProfit: oilSaleProfit - totalAssetSeedSale,
    });
    setBreakEvenResult(undefined);
  };

  const calculateBreakEven = (values: {
    P_s: number;
    O_c: number;
    R: number;
    F_o: number;
  }) => {
    const breakEvenPrice = (values.P_s * values.O_c) / (values.R * (1 - values.F_o));
    
    setBreakEvenResult({
      breakEvenPrice: Math.ceil(breakEvenPrice),
    });
    setProfitResult(undefined);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Input 
            onCalculate={calculateProfit} 
            onBreakEvenCalculate={calculateBreakEven}
            onTabChange={handleTabChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Result 
            profitResult={profitResult} 
            breakEvenResult={breakEvenResult} 
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Body;