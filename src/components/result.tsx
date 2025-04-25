import { 
  Paper, 
  Typography, 
  Box,
  Divider
} from '@mui/material';

interface ResultProps {
  profitResult?: {
    totalAssetSeedSale: number;
    oilSaleProfit: number;
    additionalProfit: number;
  };
  breakEvenResult?: {
    breakEvenPrice: number;
  };
  potionResult?: {
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
  };
}

const Result = ({ profitResult, breakEvenResult, potionResult }: ResultProps) => {
  const formatNumber = (num: number) => {
    if (num >= 100000000) { // If greater than or equal to 1억
      return `${(num / 100000000).toFixed(2)}억`;
    } else {
      return `${(num / 10000).toFixed(1)}만`;
    }
  };

  return (
    <Paper elevation={3} sx={{ height: '100%', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        계산 결과
      </Typography>

      {profitResult && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>씨앗 판매 시 총 자산:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(profitResult.totalAssetSeedSale)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>오일 제작 후 판매 시 총 자산:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(profitResult.oilSaleProfit)} 메소
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">추가 수익:</Typography>
            <Typography 
              variant="h6" 
              color={profitResult.additionalProfit >= 0 ? 'success.main' : 'error.main'}
              fontWeight="bold"
            >
              {formatNumber(profitResult.additionalProfit)} 메소
            </Typography>
          </Box>
        </Box>
      )}

      {potionResult && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            재물 획득의 비약 (3개 제작)
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 재료 비용:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.largePotionMaterialCost)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 수익:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.largePotionTotalRevenue)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 순이익:</Typography>
            <Typography 
              fontWeight="medium"
              color={potionResult.largePotionTotalProfit >= 0 ? 'success.main' : 'error.main'}
            >
              {formatNumber(potionResult.largePotionTotalProfit)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>개당 제작 단가:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.largePotionUnitCost)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>개당 실판매가:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.largePotionSellPrice)} 메소
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            소형 재물 획득의 비약 (6개 제작)
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 재료 비용:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.smallPotionMaterialCost)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 수익:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.smallPotionTotalRevenue)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 순이익:</Typography>
            <Typography 
              fontWeight="medium"
              color={potionResult.smallPotionTotalProfit >= 0 ? 'success.main' : 'error.main'}
            >
              {formatNumber(potionResult.smallPotionTotalProfit)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>개당 제작 단가:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.smallPotionUnitCost)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>개당 실판매가:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.smallPotionSellPrice)} 메소
            </Typography>
          </Box>
        </Box>
      )}

      {potionResult?.totalAssetResults && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            재물 획득의 비약만 제작 시
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>제작 가능 개수:</Typography>
            <Typography fontWeight="medium">
              {potionResult.totalAssetResults.onlyLargePotion.potionCount}개
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 순이익:</Typography>
            <Typography 
              fontWeight="medium"
              color={potionResult.totalAssetResults.onlyLargePotion.totalProfit >= 0 ? 'success.main' : 'error.main'}
            >
              {formatNumber(potionResult.totalAssetResults.onlyLargePotion.totalProfit)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>남은 자산:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.totalAssetResults.onlyLargePotion.remainingAsset)} 메소
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            소형 재물 획득의 비약만 제작 시
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>제작 가능 개수:</Typography>
            <Typography fontWeight="medium">
              {potionResult.totalAssetResults.onlySmallPotion.potionCount}개
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>총 순이익:</Typography>
            <Typography 
              fontWeight="medium"
              color={potionResult.totalAssetResults.onlySmallPotion.totalProfit >= 0 ? 'success.main' : 'error.main'}
            >
              {formatNumber(potionResult.totalAssetResults.onlySmallPotion.totalProfit)} 메소
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>남은 자산:</Typography>
            <Typography fontWeight="medium">
              {formatNumber(potionResult.totalAssetResults.onlySmallPotion.remainingAsset)} 메소
            </Typography>
          </Box>
        </Box>
      )}

      {breakEvenResult && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            현재 씨앗 가격 기준으로 오일을
          </Typography>
          <Typography 
            variant="h4" 
            color="primary" 
            fontWeight="bold"
            sx={{ my: 2 }}
          >
            {formatNumber(breakEvenResult.breakEvenPrice)} 메소
          </Typography>
          <Typography variant="body1">
            이상에 팔아야 이득입니다.
          </Typography>
        </Box>
      )}

      {!profitResult && !breakEvenResult && !potionResult && (
        <Box sx={{ 
          mt: 2, 
          p: 3, 
          textAlign: 'center',
          color: 'text.secondary'
        }}>
          <Typography>
            계산 결과가 여기에 표시됩니다.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Result;