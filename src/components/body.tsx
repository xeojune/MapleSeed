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

  const [potionResult, setPotionResult] = useState<{
    largePotionMaterialCost: number;
    largePotionTotalRevenue: number;
    largePotionTotalProfit: number;
    largePotionUnitCost: number;
    largePotionSellPrice: number;
    smallPotionMaterialCost: number;
    smallPotionTotalRevenue: number;
    smallPotionTotalProfit: number;
    smallPotionUnitCost: number;
    smallPotionSellPrice: number;
    totalAssetResults?: {
      onlyLargePotion: {
        potionCount: number;
        totalProfit: number;
        remainingAsset: number;
      };
      onlySmallPotion: {
        potionCount: number;
        totalProfit: number;
        remainingAsset: number;
      };
    };
  } | undefined>();

  const handleTabChange = () => {
    // Reset all results when tab changes
    setProfitResult(undefined);
    setBreakEvenResult(undefined);
    setPotionResult(undefined);
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
    setPotionResult(undefined);
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
    setPotionResult(undefined);
  };

  const calculatePotionProfit = (values: {
    P_oil: number;
    P_core: number;
    P_stone: number;
    P_potion: number;
    P_small_potion: number;
    F: number;
    total_asset: number;
  }) => {
    // Calculate unit costs and profits as before
    const largePotionMaterialCost = (10 * values.P_oil) + (3 * values.P_core) + values.P_stone;
    const largePotionSellPrice = values.P_potion * (1 - values.F);
    const largePotionTotalRevenue = largePotionSellPrice * 3;
    const largePotionTotalProfit = largePotionTotalRevenue - largePotionMaterialCost;
    const largePotionUnitCost = largePotionMaterialCost / 3;

    const smallPotionMaterialCost = (5 * values.P_oil) + (2 * values.P_core) + values.P_stone;
    const smallPotionSellPrice = values.P_small_potion * (1 - values.F);
    const smallPotionTotalRevenue = smallPotionSellPrice * 6;
    const smallPotionTotalProfit = smallPotionTotalRevenue - smallPotionMaterialCost;
    const smallPotionUnitCost = smallPotionMaterialCost / 6;

    // Calculate for large potions only
    const maxLargePotionSets = Math.floor(values.total_asset / largePotionMaterialCost);
    const largePotionCount = maxLargePotionSets * 3;
    const largePotionInvestment = maxLargePotionSets * largePotionMaterialCost;
    const largePotionRevenue = largePotionCount * largePotionSellPrice;
    const largePotionProfit = largePotionRevenue - largePotionInvestment;
    const largePotionRemaining = values.total_asset - largePotionInvestment;

    // Calculate for small potions only
    const maxSmallPotionSets = Math.floor(values.total_asset / smallPotionMaterialCost);
    const smallPotionCount = maxSmallPotionSets * 6;
    const smallPotionInvestment = maxSmallPotionSets * smallPotionMaterialCost;
    const smallPotionRevenue = smallPotionCount * smallPotionSellPrice;
    const smallPotionProfit = smallPotionRevenue - smallPotionInvestment;
    const smallPotionRemaining = values.total_asset - smallPotionInvestment;

    setPotionResult({
      largePotionMaterialCost,
      largePotionTotalRevenue,
      largePotionTotalProfit,
      largePotionUnitCost,
      largePotionSellPrice,
      smallPotionMaterialCost,
      smallPotionTotalRevenue,
      smallPotionTotalProfit,
      smallPotionUnitCost,
      smallPotionSellPrice,
      totalAssetResults: {
        onlyLargePotion: {
          potionCount: largePotionCount,
          totalProfit: largePotionProfit,
          remainingAsset: largePotionRemaining,
        },
        onlySmallPotion: {
          potionCount: smallPotionCount,
          totalProfit: smallPotionProfit,
          remainingAsset: smallPotionRemaining,
        }
      }
    });
    setProfitResult(undefined);
    setBreakEvenResult(undefined);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Input 
            onCalculate={calculateProfit} 
            onBreakEvenCalculate={calculateBreakEven}
            onPotionCalculate={calculatePotionProfit}
            onTabChange={handleTabChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Result 
            profitResult={profitResult} 
            breakEvenResult={breakEvenResult}
            potionResult={potionResult}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Body;