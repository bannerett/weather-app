import { isNil } from 'lodash';

import Card from '~/components/ui/Card';
import Grid from '~/components/ui/Grid';
import Strong from '~/components/ui/Strong';
import { useAppSelector } from '~/store/hooks';
import { selectVisibility } from '~/store/reducers/weatherSlice';

// aspectRatio: '1/1.06477'

function VisibilityCard() {
  const visibility = useAppSelector(selectVisibility);

  return (
    <Card.ContainerSquare overflow="hidden">
      <Grid.Container>
        <Grid.Item xs={12}>
          <Card.Header>visibility</Card.Header>
        </Grid.Item>
        <Grid.Item xs={12}>
          <Strong.Shadow sx={{ fontSize: 42 }}>
            {!isNil(visibility) ? Math.round(visibility)?.toLocaleString() : '--'} km
          </Strong.Shadow>
        </Grid.Item>
      </Grid.Container>
    </Card.ContainerSquare>
  );
}

export default VisibilityCard;
