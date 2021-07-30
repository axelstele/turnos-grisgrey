import axios from 'axios';

const get = (year) => axios.get(`http://nolaborables.com.ar/api/v2/feriados/${year}?formato=mensual`);

export default get;
