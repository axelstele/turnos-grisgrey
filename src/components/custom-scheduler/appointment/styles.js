import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appointment: {
    backgroundColor: ({ color }) => color && fade(color, 1),
    '&:hover': {
      backgroundColor: ({ color }) => color && fade(color, 0.85),
    },
  },
}));

export default useStyles;
