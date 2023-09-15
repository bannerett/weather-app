import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const GridContainer = styled(MuiGrid)({});
GridContainer.defaultProps = { container: true };

const GridItem = styled(MuiGrid)({});
GridItem.defaultProps = { item: true };

export default { Container: GridContainer, Item: GridItem };
