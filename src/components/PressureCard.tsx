import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';

function PressureCard({ pressure }: { pressure: number }) {
  return (
    <Card.ContainerSquare>
      <Grid.Container>
        <Grid.Item>
          <Card.Header>pressure</Card.Header>
        </Grid.Item>
        <Grid.Item xs={12}>
          <Strong.Shadow sx={{ fontSize: 42 }}>{Math.round(pressure).toLocaleString()}</Strong.Shadow>
        </Grid.Item>
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default PressureCard;
