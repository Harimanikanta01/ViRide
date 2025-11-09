const express = require("express");
const Valid = require("../middleware/userlogin");
const timeschema = require("../Database/timeschema");
const router1 = express.Router();

// Convert "HH:MM AM/PM" to minutes since midnight
function timeToMinutes(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

// Main route to request ride
router1.post("/time", Valid, async (req, res) => {
  const user = req.user;
  const { time, date, from, destination, status } = req.body;

  if (!user || !time || !date || !from || !destination) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const userMinutes = timeToMinutes(time);

    // Save the user's ride request
    const newRequest = new timeschema({
      user,
      time,
      date,
      from,
      destination,
      status: status || "requested",
    });
    await newRequest.save();

    // Function to find drivers matching criteria excluding current user
    const findMatchingDrivers = async () => {
      const drivers = await timeschema.find({
        "user.role": "driver",
        date,
        from,
        destination,
        status: "available",
      });

      return drivers.filter(
        (driver) =>
          driver.user._id.toString() !== user._id.toString() && // exclude same user
          Math.abs(timeToMinutes(driver.time) - userMinutes) <= 5
      );
    };

    // Immediate match check
    let matchedDrivers = await findMatchingDrivers();
    if (matchedDrivers.length > 0) {
      newRequest.status = "matched";
      await newRequest.save();
      return res.status(200).json({
        message: "Driver(s) found immediately!",
        matchedDrivers,
      });
    }

    // No immediate match → wait up to 2 minutes
    const maxWaitTime = 2 * 60 * 1000; // 2 minutes
    const pollInterval = 5000; // 5 seconds
    const startTime = Date.now();

    const interval = setInterval(async () => {
      matchedDrivers = await findMatchingDrivers();
      if (matchedDrivers.length > 0 || Date.now() - startTime > maxWaitTime) {
        clearInterval(interval);
        if (matchedDrivers.length > 0) {
          newRequest.status = "matched";
          await newRequest.save();
        }
        return res.status(200).json({
          message:
            matchedDrivers.length > 0
              ? "Driver(s) found!"
              : "No drivers available within 2 minutes",
          matchedDrivers,
        });
      }
    }, pollInterval);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router1;
