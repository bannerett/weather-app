import { styled } from '@mui/material/styles';

const StrongDefault = styled('strong')({});
const StrongShadow = styled('strong')({ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.75))' });
export default { Default: StrongDefault, Shadow: StrongShadow };
