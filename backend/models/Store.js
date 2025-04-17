

// module.exports = mongoose.model('Store', storeSchema);
const mongoose = require('mongoose');

// Store Schema
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    maxlength: 400,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  ratings: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, min: 1, max: 5 }
        }],
});

// Calculate average rating
storeSchema.methods.getAverageRating = function() {
  if (this.ratings.length === 0) return 0; // No ratings yet
  const total = this.ratings.reduce((acc, item) => acc + item.rating, 0); // Sum all ratings
  return total / this.ratings.length; // Return average
};
module.exports = mongoose.model('Store', storeSchema);