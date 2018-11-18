import passportLocalMongoose from 'passport-local-mongoose';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  email: String,
  password: String
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema);

