import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appointment: {
    backgroundColor: ({ color }) => color && fade(color, 1),
    '&:hover': {
      backgroundColor: ({ color }) => color && fade(color, 0.85),
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
