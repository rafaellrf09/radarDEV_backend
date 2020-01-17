const axios = require('axios')
const Dev = require('./../model/Dev')
const parseStringAsArray = require('./../utils/parseStringAsArray')
const { findConnections, sendMessage } = require("../websocket");

// index, show, store, update, destroy
module.exports = {
    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
            let { name = login, avatar_url, bio } = apiResponse.data

            const techsArray = parseStringAsArray(techs.toLowerCase())
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }


        //filtrar as conexoes
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        )

        sendMessage(sendSocketMessageTo, "new-dev" , dev);
    
        return res.json(dev);
    },
    
    async update(req, res) {
        // Atualizar um dev
    },

    async destroy(req, res) {
        // Deletar um dev
        try {
            await Dev.findByIdAndRemove(req.params.id);
            res.status(200).send("Dev Deletado.");
        } catch (err) {
            console.log(err)
            res.status(404).send({
                error: "Erro ao apagar dev"
            });
        }
    }
}