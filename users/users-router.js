
const express = require("express");
const jwt = require("jsonwebtoken");
// const authenticate = require("../authenticate-middleware.js");
const router = express.Router();
const Users = require("./users-model");
const bcrypt = require("bcryptjs");

// const fs = require('fs'); 
// const csv = require('csv-parser');
// var unzipper = require("unzipper");



router.post("/register", (req, res) => {
    let userData = req.body;
    const hash = bcrypt.hashSync(userData.password, 10);
    userData.password = hash;
    console.log('userData', userData);
    Users.add(userData)
      .then(user => {
          console.log('/register user', user)
        // const token = signToken(user);
        res.status(201).json({id: user.id, user_name: user.user_name});
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Failed to register new user " });
      });
  });

router.post("/login", (req, res) => {
    const { user_name, password} = req.body;
    console.log('login password hash', password)
    Users.findBy({user_name})
    .then(user => {
        console.log('/login user', user);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
        user_name: user.user_name, 
        message: `${user.user_name} Logged In!`,
        token,
        id: user.id
        });
    } else {
        res.status(401).json({ message: "Failed to login" });
    }
    })
    .catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "Failed to retrieve credentials " });
    });
});

function signToken(user) {
const payload = {
    user_name: user.user_name
};

const secret = process.env.JWT_SECRET || "secret code";

const options = {
    expiresIn: "8h"
};

return jwt.sign(payload, secret, options);
}


router.get('/', (req, res) => { 
    Users.find()
    .then(users => { 
        res.status(200).json(users)
    })
    .catch(err => { 
        console.log('/users get error: ', err)
        res.status(500).json({errorMessage: 'could not get users', err: err})
    })
})
router.get('/messages', (req, res) => { 
    Users.findMessages()
    .then(users => { 
        res.status(200).json(users)
    })
    .catch(err => { 
        console.log('/users get error: ', err)
        res.status(500).json({errorMessage: 'could not get messages', err: err})
    })
})
router.post('/:id/messages', (req, res) => { 
    Users.addMessages(req.body, req.params.id)
    .then(users => { 
        res.status(201).json(users)
    })
    .catch(err => { 
        console.log('/users get error: ', err)
        res.status(500).json({errorMessage: 'could not post messages', err: err})
    })
})
router.put('/:id/views', (req, res) => { 
    Users.addViews(req.body, req.params.id)
    .then(users => { 
        res.status(201).json(users)
    })
    .catch(err => { 
        console.log('/users get error: ', err)
        res.status(500).json({errorMessage: 'could not post messages', err: err})
    })
})
router.get('/getAll/views', (req, res) => { 
    Users.getAllViews()
    .then(users => { 
        res.status(201).json(users)
    })
    .catch(err => { 
        console.log('/users get error: ', err)
        res.status(500).json({errorMessage: 'could not post messages', err: err})
    })
})

module.exports=  router;