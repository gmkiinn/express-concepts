const express = require('express');
const router = express.Router();
const Joi = require('joi');

// data
let rooms = [
  { id: 1, name: '101' },
  { id: 2, name: '102' },
  { id: 3, name: '103' },
  { id: 4, name: '104' },
];

// handling GET request
router.get('/', (req, res) => {
  // Handling query params
  if (req.query) return res.status(200).send({ rooms, query: req.query });
  res.status(200).send(rooms);
});

// handling route parameters
router.get('/:id', (req, res) => {
  // check the data is present or not
  const room = rooms.find((room) => room.id === parseInt(req.params.id));
  if (!room)
    return res
      .status(404)
      .send({ error: true, message: 'Room info is not found with given ID' });

  //send the response when data is present
  res.status(200).send(room);
});

// handling POST request
router.post('/', (req, res) => {
  // Security: never trust what user sends.
  // Validate Input -JOI
  const { error } = validateRoom(req.body);
  // console.log(error.message);
  if (error) return res.status(400).send(error.details[0].message);

  const room = {
    id: rooms.length + 1,
    name: req.body.name,
  };
  rooms.push(room);
  res.status(200).send(room);
});

//handling PUT request
router.put('/:id', (req, res) => {
  // check the data is present or not
  const room = rooms.find((room) => room.id === parseInt(req.params.id));
  if (!room)
    return res
      .status(404)
      .send({ error: true, message: 'Room info is not found with given ID' });

  // Validate Input -JOI
  const { error } = validateRoom(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: true, message: error.details[0].message });

  room.name = req.body.name;
  res.status(200).send(room);
});

// handling delete request
router.delete('/:id', (req, res) => {
  // check the data is present or not
  const room = rooms.find((room) => room.id === parseInt(req.params.id));
  if (!room)
    return res
      .status(404)
      .send({ error: true, message: 'Room info is not found with given ID' });

  rooms = rooms.filter((room) => room.id !== parseInt(req.params.id));
  res.status(200).send(room);
});

// Validating Data
const validateRoom = (room) => {
  const roomSchema = Joi.object({
    name: Joi.string().min(3).max(5).required(),
  });
  return roomSchema.validate(room);
};

module.exports = router;
