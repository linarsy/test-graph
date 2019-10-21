import normalize from '../lib/normalize';
import data from '../assets/data.json';

const { billing } = data;

export default {
  billing: normalize(billing),
};
