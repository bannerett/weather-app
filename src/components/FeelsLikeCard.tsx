import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';
import { Wind } from '~/types/weather';

function FeelsLikeCard({ chill }: Wind) {
  return (
    <Card.ContainerSquare>
      <Grid.Container>
        <Grid.Item>
          <Card.Header>feels like</Card.Header>
        </Grid.Item>
        <Grid.Item xs={12}>
          <Strong.Shadow sx={{ fontSize: 42 }}>{chill}º</Strong.Shadow>
        </Grid.Item>
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default FeelsLikeCard;
