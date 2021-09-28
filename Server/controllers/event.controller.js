const User = require('../models/User.model');
const Event = require('../models/Event.model')

const addEvent = async (req, res) => {
  try {
    let { eventName, description = '', link = '', participants = [], dateTime = '' } = req.body;

    if (!eventName)
      return res
        .status(400)
        .json({ message: 'Please enter the event name.' });

    if (!dateTime)
      dateTime = new Date()

    const newEvent = new Event({
      eventName,
      description,
      link,
      host: req.user,
      participants,
      dateTime
    });
    const savedEvent = await newEvent.save();
    const eventId = savedEvent._id
    participants.push(req.user)
    participants.forEach(async (userId) => {
      const user = await User.findById(userId)
      user.events.push(eventId)
      await user.save()
    })

    res.status(200).json({ message: 'Successfully Added Event.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getAllEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('events')

    res.status(200).json({ data: user.events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.addEvent = addEvent;
exports.getAllEvent = getAllEvent;