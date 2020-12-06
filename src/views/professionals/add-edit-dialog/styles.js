import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  colorPicker: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useStyles;
