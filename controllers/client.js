const Client = require('../models/Client');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    const query = {
        user: req.user.id
    }

    if(req.query.dossierNumber){
        query.dossierNumber = +req.query.dossierNumber;
    }

    if(req.query.name){
        query.name = req.query.name;
    }

    try {
        const clients = await Client
            .find(query)
            .skip(+req.query.offset)
            .limit(+req.query.limit);
        setTimeout(() => {
            res.status(200).json(clients);
        }, 500);
    } catch (e) {
        errorHandler(e);
    }
}

module.exports.getById = async function (req, res) {
    try {
        const client = await Client.findById(req.params.id);
        res.status(200).json(client);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Client.remove({
            _id: req.params.id
        });
        res.status(200).json({
            message: 'Клиент удален'
        });
    } catch (e) {
        errorHandler(e);
    }
}

module.exports.create = async function (req, res) {
    try {
        const lastClient = await Client
            .findOne({user: req.user.id})
            .sort({dossierNumber: -1});

        const maxClient = lastClient ? lastClient.dossierNumber : 99;

        const client = await new Client({
            // dossierNumber: req.body.dossierNumber,
            dossierNumber: maxClient + 1,
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : '',
            age: req.body.age,
            language: req.body.language,
            married: req.body.married,
            partner: req.body.partner,
            phone: req.body.phone,
            address: req.body.address,
            haveChildren: req.body.haveChildren,
            listChild: req.body.listChild
        });

        await client.save().then(res.status(201).json(client));

    } catch (e) {
        errorHandler(e);
    }
}

module.exports.update = async function (req, res) {
    try {
        const updated = {
            name: req.body.name,
            age: req.body.age,
            language: req.body.language,
            married: req.body.married,
            partner: req.body.partner,
            phone: req.body.phone,
            address: req.body.address,
            haveChildren: req.body.haveChildren,
            listChild: req.body.listChild
        };
        if (req.file) {
            updated.imageSrc = req.file.path
        }

        const client = await Client.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true, useFindAndModify: false}
        );
        res.status(200).json(client);
    } catch (e) {
        errorHandler(e);
    }
}