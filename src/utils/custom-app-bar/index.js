import { PATIENTS_PATHNAME, PRACTICES_PATHNAME, PROFESSIONALS_PATHNAME } from 'constants/routes';
import {
  HOME_TITLE_TEXT, PATIENTS_TITLE_TEXT, PRACTICES_TITLE_TEXT, PROFESSIONALS_TITLE_TEXT,
} from 'constants/custom-app-bar';

const formatTitle = (pathname) => {
  let title = '';
  switch (pathname) {
    case PATIENTS_PATHNAME:
      title = PATIENTS_TITLE_TEXT;
      break;
    case PRACTICES_PATHNAME:
      title = PRACTICES_TITLE_TEXT;
      break;
    case PROFESSIONALS_PATHNAME:
      title = PROFESSIONALS_TITLE_TEXT;
      break;
    default:
      title = HOME_TITLE_TEXT;
      break;
  }
  return title;
};

export default formatTitle;
