const catcherror = require('../Middleware/catcherror');
const ErrorHandler = require("../Utils/errorHandler");

const Light = require('../Model/trafficSignalSchema')

exports.addSignalLightData = catcherror(async(req,res,next)=>{
    try {
      const { currentColor, ...Data } = req.body;

      // Calculate default values for other lights based on the provided color
      const defaultValues = (() => {
        if (currentColor === 'red') {
          return {
            red: req.body.red || null,
            yellow: null,
            green: null,
          };
        } else if (currentColor === 'yellow') {
          return {
            red: null,
            yellow: req.body.yellow || null,
            green: null,
          };
        } else if (currentColor === 'green') {
          return {
            red: null,
            yellow: null,
            green: req.body.green || null,
          };
        }

        // If currentColor is not provided or not recognized, set default values
        return {
          red: null,
          yellow: null,
          green: null,
        };
      })();

      // Create a new signal light with the calculated values
      const newSignalLight = new Light({ ...Data, ...defaultValues });

      // Save the signal light to the database
      const savedSignalLight = await newSignalLight.save();

      res.status(201).json(savedSignalLight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },)

  exports.updateSignal = async (req, res) => {
    const updates = req.body;
  
    try {
      // Find the signal by ID
      const signal = await Light.findById(req.params.Id);
      // Check if the signal exists
      if (!signal) {
        return res.status(404).json({ success: false, message: 'Signal not found' });
      }
  
      Object.assign(signal, updates);
  
      await signal.save();
  
      res.json({ success: true, message: 'Signal updated successfully', signal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

  exports.getAll = catcherror(async(req,res,next)=>{
    const signals = await Light.find();
    if(signals){
        res.status(200).json({
            success:true,
            signals
        })
    }
    else{
        next(new ErrorHandler("Can't get Place"));
    }
  });
  exports.getSignalById = catcherror(async(req,res,next)=>{
    const signal = await Light.findById(req.params.Id);
    if(signal){
        res.status(200).json({
            success:true,
            signal
        })
    }
    else{
        next(new ErrorHandler("Can't get Place"));
    }
  });


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Distance in kilometers
  }
  

  exports.signalByCoordinates = catcherror(async (req, res) => {
    const { lat, lon, maxDistance } = req.body; // Latitude, longitude, and maximum distance in kilometers
  
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const distanceInRadians = maxDistance / 6371;
      // Find signals within the specified distance
      const signals = await Light.find({
            'location': {
              $geoWithin: {
                $centerSphere: [[latitude, longitude], distanceInRadians] // Convert distance to radians
              }
            }
          });
  
      // Calculate distances for each signal and sort the signals array based on distances
      signals.forEach(signal => {
        const distance = calculateDistance(lat, lon, signal.location.latitude, signal.location.longitude);
        signal.distance = distance; // Add the distance property to the signal object
      });
    
      // Sort signals by distance (ascending order)
      signals.sort((a, b) => a.distance - b.distance);
      const signalCount = signals.length;
    //   res.json({ success: true, signals });
    res.json({ success: true, signalCount, signals });

  });
  