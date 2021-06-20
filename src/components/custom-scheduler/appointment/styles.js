import { makeStyles, fade } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  appointment: {
    backgroundColor: ({ blocked, color }) => (blocked ? blueGrey[500] : color)
      && fade(blocked ? blueGrey[500] : color, 1),
    '&:hover': {
      backgroundColor: ({ blocked, color }) => (blocked ? blueGrey[500] : color)
        && fade(blocked ? blueGrey[500] : color, 0.85),
    },
  },
  container: {
    color: 'white',
    margin: theme.spacing(0.5),
  },
  title: {
    fontWeight: 'bold',
  },
}));

export default useStyles;
