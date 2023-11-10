const express = require("express");
const { addSignalLightData, signalByCoordinates, getAll, getSignalById, updateSignal } = require("../Controller/SignalLightController");
const router = express.Router()


router.route('/add-signal-light').post(addSignalLightData)
router.route('/get-signal/bycoordinates').get(signalByCoordinates)
router.route('/get-signal').get(getAll)
router.route('/get-signal/:Id').get(getSignalById)
router.route('/update-signal/:Id').put(updateSignal)

module.exports = router