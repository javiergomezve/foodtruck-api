import mongoose from 'mongoose';
import config from './config';

export default callback => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongoUrl, {useMongoClient: true})
    .then(db => callback(db))
    .catch(err => console.log(err));
};
