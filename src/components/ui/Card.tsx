import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import Divider from '~/components/ui/Divider';
import Strong from '~/components/ui/Strong';

const Card = styled(Box)(({ theme: { shape } }) => ({
  padding: '0 12px',
  outline: '1px solid rgba(206,206,206,0.25)',
  borderRadius: shape.borderRadius * 4,
  backgroundColor: 'rgba(0,0,0,0.25)',
  color: '#fff',
  backdropFilter: 'blur(10px)',
  lineHeight: '42px',
}));

const CardSquare = styled(Card)({ aspectRatio: '1/1' });

function Header({ children, divider, sx, ...props }: BoxProps & { divider?: boolean }) {
  return (
    <Box>
      <Box sx={{ height: 42, lineHeight: '42px', fontSize: '0.85rem', textTransform: 'uppercase', ...sx }} {...props}>
        <Strong.Shadow>{children}</Strong.Shadow>
      </Box>
      {divider && <Divider />}
    </Box>
  );
}

export default { Container: Card, Header, ContainerSquare: CardSquare };
