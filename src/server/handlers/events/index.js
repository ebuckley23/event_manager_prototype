const express = require('express');
const router = express.Router();
const eventsService = require('../../services/events');

router.get('/', async (req, res) => {
  const ret = await eventsService.getEvents();
  res.json(ret);
});

router.post('/:id/registrant', async (req, res) => {
  const id = req.params.id;
  const registrant = req.body;
  await eventsService.addRegistrant(id, registrant);
  res.sendStatus(200);
});

router.get('/:id/registrant', async (req, res) => {
  const id = req.params.id;
  const ret = await eventsService.getEventRegistrants(id);
  res.json(ret);
})

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const ret = await eventsService.getEvent(id);
  res.json(ret);
});

module.exports = router;