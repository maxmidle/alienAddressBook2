import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Alien from './models/Alien';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:alien@alienadress-mrjgi.mongodb.net/test?retryWrites=true' ,{ useNewUrlParser: true })
.then(function (){
	console.log('Successfully connected to MongoDB Atlas');
})
.catch(function(error){
	console.log('Unable to connect to MongoDB Atlas');
});

const connection = mongoose.connection;

router.route('/aliens').get(function(req, res){
    Alien.find(function(err, aliens){
        if (err)
            console.log(err);
        else
            res.json(aliens);
    });
});

router.route('/alien/:id').get(function(req, res){
    Alien.findById(req.params.id, function(err, alien){
        if (err) {
            console.log(err);
            res.json(undefined);
        }
        else
            res.json(alien);
    });
});

router.route('/contact/:id').get(function(req, res){
    Alien.findById(req.params.id, function(err, alien){
        if (err)
            console.log(err);
        else if (!alien)
            return (new Error('Could not find account'));
        else
            res.json(alien.contacts);
    });
});

router.route('/connect').post(function(req, res){
    Alien.findOne({
		userId: req.body.userId,
		userPw: req.body.userPw
	}, function(err, alien){
        if (err)
            console.log(err);
        else if (!alien)
            return (new Error('Could not find account'));
        else
            res.json(alien._id);
    });
});

router.route('/subscribe/add').post(function(req, res){
    let alien = new Alien(req.body);

    alien.save().then(function(alien){
            res.status(200).json({'alien': 'Added successfully'});
        }).catch(function(err){
            res.status(400).json('Failed to create new account');
        });
});

router.route('/modify/apply/:id').post(function(req, res){
    Alien.findById(req.params.id, function(err, alien){
        if (!alien)
            return (new Error('Could not load document'));
        else
        {
            alien.name = req.body.name;
            alien.age = req.body.age;
            alien.family = req.body.family;
            alien.kind = req.body.kind;
            alien.planet = req.body.planet;

            alien.save().then(function(alien){
                res.json('Update done');
            }).catch(function(err){
                res.status(400).send('Modification failed');
            });
        }
    })
});

router.route('/contact/delete/:alien1/:alien2').get(function(req, res){
    Alien.find(function(err, aliens){
        if (!aliens)
            return next (new Error('Could not load document'));
        else
        {
            let i = 0;
            let y = 0;
            while (i < aliens.length && aliens[i].name !== req.params.alien1)
                i++;
            while (y < aliens[i].contacts.length){
                if (aliens[i].contacts[y].name === req.params.alien2){
                    aliens[i].contacts.splice(y, 1);
                    y = aliens[i].contacts.length
                }
                y++;
            }
            aliens[i].save().then(function(alien){
                console.log('Contact deleted successfully!');
            }).catch(function(err){
                res.status(400).send('an error occured while deleting contact');
            });

            i = 0;
            y = 0;
            while (i < aliens.length && aliens[i].name !== req.params.alien2)
                i++;
            while (y < aliens[i].contacts.length){
                if (aliens[i].contacts[y].name === req.params.alien1){
                    aliens[i].contacts.splice(y, 1);
                    y = aliens[i].contacts.length
                }
                y++;
            }
            aliens[i].save().then(function(alien){
                console.log('Contact deleted successfully!');
                res.json('Contact deleted successfully!');
            }).catch(function(err){
                res.status(400).send('an error occured while deleting contact');
            });
        }
    });
})

router.route('/contact/add/:alien1/:alien2').get(function(req, res){
    Alien.find(function(err, aliens){
        if (!aliens)
            return next (new Error('Could not load document'));
        else
        {
            let i = 0;
            let y = 0;
            while (i < aliens.length && aliens[i].name !== req.params.alien1)
                i++;
            while (y < aliens.length && aliens[y].id !== req.params.alien2)
                y++;
            if (i === y)
            res.status(400).send('Can\'t add yourself in contact');
            else{
                let contact1 = {
                  name: aliens[i].name,
                  age: aliens[i].age,
                  family: aliens[i].family,
                   kind: aliens[i].kind,
                  planet: aliens[i].planet,
                  dad: aliens[y].name
                };
                let contact2 = {
                    name: aliens[y].name,
                    age: aliens[y].age,
                    family: aliens[y].family,
                    kind: aliens[y].kind,
                    planet: aliens[y].planet,
                    dad: aliens[i].name
                };
                aliens[i].contacts.push(contact2);
                aliens[y].contacts.push(contact1);

                aliens[i].save().then(function(alien){
                    console.log('Contact added successfully!');
                }).catch(function(err){
                    res.status(400).send('an error occured while adding contact');
                });
                aliens[y].save().then(function(alien){
                    console.log('Contact added successfully!');
                    res.json('Contact added successfully!');
                }).catch(function(err){
                    res.status(400).send('an error occured while adding contact');
                });
            }
        }
    });
})

app.use('/', router);

app.listen(4000, function(){
    console.log('Express server running on port 4000')
});
