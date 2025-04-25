import { AppBar, Toolbar, Typography } from '@mui/material';
import mapleLogo from '../assets/maple_logo.png';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a1a' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <img 
          src={mapleLogo} 
          alt="Maple Story Logo" 
          style={{ 
            height: '32px',
            marginRight: '16px'
          }} 
        />
        <Typography variant="h6" component="div">
          메이플 오일 수익 계산기
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;