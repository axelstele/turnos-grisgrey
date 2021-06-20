import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  chip: {
    color: 'white',
    backgroundColor: ({ color }) => color,
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
  },
  contentContainer: {
    paddingBottom: theme.spacing(1.5),
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  icon: {
    verticalAlign: 'middle',
  },
  contentItemIcon: {
    textAlign: 'center',
  },
  grayIcon: {
    color: theme.palette.action.active,
  },
  colorfulContent: {
    color: ({ blocked, color }) => (blocked ? blueGrey[500] : color),
  },
  lens: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
}));

export default useStyles;
