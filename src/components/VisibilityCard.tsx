import Box from '@mui/material/Box';

import Card from '~/components/ui/Card';

function VisibilityCard({ visibility }: { visibility: number }) {
  return (
    <Card.Container sx={{ aspectRatio: '1/1.06477' }}>
      <Card.Header>visibility</Card.Header>
      <Box>{visibility} km</Box>
    </Card.Container>
  );
}

export default VisibilityCard;
