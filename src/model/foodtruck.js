import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const foodtruckSchema = new Schema({
  name: {type: String, required: true},
  foodType: {type: String, required: true},
  avgCost: Number,
  geometry: {
      type: {type: String, default: 'Point'},
      coordinates: {
        "lat": Number,
        "long": Number
      }
  },
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('Foodtruck', foodtruckSchema);
