const mongoose = require('mongoose');

const bookedServiceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Services', 
    required: true
  },
  userName: { 
    type: String, 
    required: true 
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'Insurance', 'none'],
  }
}, { timestamps: true });

module.exports = mongoose.model('BookedService', bookedServiceSchema);
