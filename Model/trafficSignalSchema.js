const mongoose = require('mongoose');

const trafficSignalSchema = new mongoose.Schema({
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    direction: {
      type: String,
      required: true,
      enum: ['north', 'south', 'east', 'west', 'northeast', 'southeast', 'southwest', 'northwest'],
    },
  },
  address: {
    circleName: {
      type: String,
      // required: true,
    },
    road: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    
  },
  junctionType: {
    type: String,
    enum: ['crossroads with traffic light', 'T-junction with traffic light', 'roundabout with traffic light', 'four-way with traffic light', 'other'],
    required: true,
  },
  aspects: {
    currentColor: {
      type: String,
      enum: ['red', 'yellow', 'green'],
      required: true,
    },
    red: {
      durationInSeconds: {
        type: Number,
        required: true,
      },
    },
    yellow: {
      durationInSeconds: {
        type: Number,
        required: true,
      },
    },
    green: {
      durationInSeconds: {
        type: Number,
        required: true,
      },
    },
  },
  signalStatus: {
    type: String,
    enum: ['working', 'notWorking'],
    default: 'working',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

// Update the updatedAt field before saving the document, only if it's an update
trafficSignalSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

const TrafficSignal = mongoose.model('TrafficSignal', trafficSignalSchema);

module.exports = TrafficSignal;
