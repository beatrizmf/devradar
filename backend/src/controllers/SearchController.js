const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    if (!latitude || !longitude || !techs) {
      return res.status(400).json({
        message: 'required enter fields: latitude, longitude, techs',
      });
    }

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 100000,
        },
      },
    });

    return res.json({ devs });
  },
};
