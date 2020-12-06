const getPracticesFullData = (allValues, selectedValues) => selectedValues?.reduce((acc, id) => {
  const data = allValues?.find((value) => value.id === id);
  return data ? [...acc, data] : acc;
}, []);

export default getPracticesFullData;
