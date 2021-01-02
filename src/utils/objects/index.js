const keysWithId = (data) => data && Object.keys(data).reduce((acc, id) => [...acc, {
  ...data[id],
  id,
}], []);

export default keysWithId;
