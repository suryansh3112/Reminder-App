const router = require('express').Router();
const eventControllers = require('../controllers/event.controller');
const auth = require('../middleware/auth');

//Gets all users event
router.get('/event', auth, eventControllers.getAllEvent);

//Adds an event
router.post('/event', auth, eventControllers.addEvent);

//Deletes an event
router.delete('/event/:eventId', auth, eventControllers.deleteEvent);

//Edits an event
router.put('/event/:eventId', auth, eventControllers.editEvent);

module.exports = router;
