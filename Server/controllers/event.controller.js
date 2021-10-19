const User = require('../models/User.model');
const Event = require('../models/Event.model');

const addEvent = async (req, res) => {
  try {
    let {
      eventName,
      description = '',
      link = '',
      participants = [],
      dateTime = ''
    } = req.body;

    if (!eventName)
      return res.status(400).json({ message: 'Please enter the event name.' });

    if (!dateTime) dateTime = new Date();

    const newEvent = new Event({
      eventName,
      description,
      link,
      host: req.user,
      participants,
      dateTime
    });
    const savedEvent = await newEvent.save();
    const eventId = savedEvent._id;
    participants.push(req.user);
    participants.forEach(async (userId) => {
      const user = await User.findById(userId);
      user.events.push(eventId);
      await user.save();
    });

    res.status(200).json({ message: 'Successfully Added Event.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: 'events',
      populate: [
        { path: 'participants', model: 'User', select: { email: 1, name: 1 } },
        { path: 'host', model: 'User', select: { email: 1, name: 1 } }
      ]
    });

    const currentDate = new Date();
    let events = user.events; // user.events.filter((item) => item.dateTime > currentDate);
    events = events.sort((a, b) => a - b);
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (event) {
      let prevParticipants = event.participants;
      prevParticipants = prevParticipants.map((element) => element.toString());
      const currentParticipants = req.body.participants;

      if (currentParticipants && currentParticipants.length > 0) {
        // Add eventIds
        currentParticipants.forEach(async (userId) => {
          if (!prevParticipants.includes(userId)) {
            const user = await User.findById(userId);
            user.events.push(eventId);
            await user.save();
          }
        });

        // Remove eventIds
        prevParticipants.forEach(async (userId) => {
          if (!currentParticipants.includes(userId)) {
            const user = await User.findById(userId);
            user.events.pull(eventId);
            await user.save();
          }
        });
      }
      const editData = { ...event._doc, ...req.body };
      const edit = await Event.findByIdAndUpdate(eventId, {
        $set: editData
      });
      res.status(200).json({ message: 'Updated Successfully' });
    } else {
      res.status(200).json({ message: 'Not a valid event' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventDeleted = await Event.findOneAndDelete({
      id: req.params.eventId,
      host: req.user
    });

    if (eventDeleted) {
      res.status(200).json({ message: 'Successfully Deleted' });
    } else {
      res.status(200).json({ message: 'Only host can delete the event' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addEvent = addEvent;
exports.getAllEvent = getAllEvent;
exports.editEvent = editEvent;
exports.deleteEvent = deleteEvent;
