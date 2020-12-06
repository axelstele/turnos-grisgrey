import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'inline-block',
    margin: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
