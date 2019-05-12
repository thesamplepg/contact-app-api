const router = require('express').Router();
const App = require('../models/app');
const { ObjectId } = require('mongodb');
const Contact = require('../models/contact');
const validator = require('../utilits/validator');

const validatorConfig = {
    name: 3,
    phone: 10,
    address: 6
}

router.get('/start', (req, res) => {

    console.log(req.cookies.contact_app);

    if(!req.cookies.contact_app) {
        
        new App().save()
            .then(app => {

                res.cookie('contact_app', app._id);

                res.status(200).json({
                    endpoint: app._id
                });

            })
            .catch(err => {
                console.log(err);
            });

    } else {
        
        res.status(400).json({
            endpoint: req.cookies.contact_app
        });

    }

});

router.get('/:endpoint', async(req, res) => {

    const id = req.query.endpoint;

    if(ObjectId.isValid(id)) {

        const contacts = await Contact.find({app: ObjectId(id)});

        res.status(200).json({
            contacts
        });
    } else {
        res.status(400).json({
            error: 'Wrong endpoint'
        });
    }

});

router.post('/:endpoint', async(req, res) => {
    const id = req.params.endpoint;

    if(ObjectId.isValid(id)) {
        const result = validator(validatorConfig, req.body);

        if(result.validation) {

            const app = await App.findOne({_id: ObjectId(id)});

            if(app) {

                req.body.app = ObjectId(id);

                const contact = await new Contact(req.body).save();

                res.status(200).json({
                    contact
                });

            } else {
                res.status(404).json({
                    error: 'Endpoint not found'
                });
            }

        } else {
            res.status(400).json({
                error: result.error
            });
        }
    } else {
        res.status(400).json({
            error: 'Wrong endpoint'
        });
    }
});

router.put('/:endpoint', async(req, res) => {
    const id = req.params.endpoint;

    if(ObjectId.isValid(id)) {
        const result = validator(validatorConfig, req.body);

        if(result.validation) {

            if(ObjectId.isValid(req.body._id)) {
                
                const contact = await Contact.findByIdAndUpdate({_id: ObjectId(req.body.id)}, {
                    $set: {...req.body}
                });

                res.status(200).json({contact});

            }
            else {
                res.status(404).json({error: 'Contact not found'});
            }
        } else {
            res.status(400).json({
                error: result.error
            });
        }
    } else {
        res.status(400).json({
            error: 'Wrong endpoint'
        });
    }
});

router.delete('/:endpoint', async(req, res) => {
    const id = req.params.endpoint;

    if(ObjectId.isValid(id)) {
        const result = validator(validatorConfig, req.body);

        if(ObjectId.isValid(req.body._id)) {
                
            const contact = await Contact.findByIdAndRemove({_id: ObjectId(req.body._id)});

            res.status(200).json({deletedContact: contact});

        }
        else {
            res.status(404).json({error: 'Contact not found'});
        }
    } else {
        res.status(400).json({
            error: 'Wrong endpoint'
        });
    }
});

module.exports = router;