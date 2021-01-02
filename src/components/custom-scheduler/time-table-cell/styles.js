import { fade, makeStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  holiday: {
    backgroundColor: amber[500],
    borderBottom: 0,
    '&:focus': {
      backgroundColor: fade(amber[400], 0.85),
    },
    '&:hover': {
      backgroundColor: fade(amber[400], 0.85),
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
