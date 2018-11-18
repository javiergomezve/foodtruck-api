import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: {type: String, required: true},
    text: String,
    foodtruck: {type: Schema.Types.ObjectId, ref: 'Foodtruck', required: true}
});

module.exports = mongoose.model('Review', ReviewSchema);
