import Box from '@mui/material/Box';

import Card from '~/components/ui/Card';

// aspectRatio: '1/1.06477'

function VisibilityCard({ visibility }: { visibility: number }) {
  return (
    <Card.Container sx={{ aspectRatio: '1/1' }}>
      <Card.Header>visibility</Card.Header>
      <Box>{visibility} km</Box>
    </Card.Container>
  );
}

export default VisibilityCard;
