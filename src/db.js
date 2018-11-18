import mongoose from 'mongoose';
import config from './config';

export default callback => {
  mongoose.connect(config.mongoUrl)
    .then(db => callback(db))
    .catch(err => console.log(err));
};
