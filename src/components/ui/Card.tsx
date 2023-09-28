import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import Divider from '~/components/ui/Divider';
import Strong from '~/components/ui/Strong';

const Card = styled(Box)(({ theme: { breakpoints, shape } }) => {
  console.log(breakpoints.up('sm'), breakpoints.down('sm'));
  return {
    padding: '0 12px',
    outline: '1px solid rgba(206,206,206,0.25)',
    borderRadius: shape.borderRadius * 4,
    backgroundColor: 'rgba(0,0,0,0.25)',
    color: '#fff',
    backdropFilter: 'blur(10px)',
    [breakpoints.up('sm')]: { lineHeight: '42px' },
    [breakpoints.down('sm')]: { lineHeight: '38px' },
  };
});

const CardSquare = styled(Card)({ aspectRatio: '1/1' });

function Header({ children, divider, sx, ...props }: BoxProps & { divider?: boolean }) {
  return (
    <Box>
      <Box
        sx={{
          height: 42,
          lineHeight: { xs: '38px', sm: '42px' },
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          ...sx,
        }}
        {...props}
      >
        <Strong.Shadow>{children}</Strong.Shadow>
      </Box>
      {divider && <Divider />}
    </Box>
  );
}

export default { Container: Card, Header, ContainerSquare: CardSquare };
