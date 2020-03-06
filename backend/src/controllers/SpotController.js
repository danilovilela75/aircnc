const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {

    async store (req, res) {

        const { user_id } = req.headers;
        const { filename } = req.file;
        const { company, price, techs } = req.body;

        const user = await User.findById(user_id);
        if(!user) {
            return res.status(400).json({ error: "Usuário não existe!" });
        }

        const spot = await Spot.create({
            thumbnail: filename,
            user: user_id,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim()),
        });

        console.log(spot);
        return res.json(spot);

    },

    async index (req, res) {

        const { tech } = req.query;

        const spot = await Spot.find({ techs: tech });

        console.log(spot);
        return res.json(spot);

    },

}