const sortAlphabeticallyByField = (array, field) => array.sort(
  (a, b) => a[field].localeCompare(b[field]),
);

export default sortAlphabeticallyByField;
