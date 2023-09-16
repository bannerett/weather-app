import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';

function HumidityCard({ humidity }: { humidity: number }) {
  return (
    <Card.ContainerSquare>
      <Grid.Container>
        <Grid.Item xs={12}>
          <Card.Header>humidity</Card.Header>
        </Grid.Item>
        <Grid.Item xs={12}>
          <Strong.Shadow sx={{ fontSize: 42 }}>{humidity} %</Strong.Shadow>
        </Grid.Item>
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default HumidityCard;
