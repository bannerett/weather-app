import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';

// aspectRatio: '1/1.06477'

function VisibilityCard({ visibility }: { visibility: number }) {
  return (
    <Card.ContainerSquare overflow="hidden">
      <Grid.Container>
        <Grid.Item xs={12}>
          <Card.Header>visibility</Card.Header>
        </Grid.Item>
        <Grid.Item xs={12}>
          <Strong.Shadow sx={{ fontSize: 42 }}>{visibility} km</Strong.Shadow>
        </Grid.Item>
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default VisibilityCard;
