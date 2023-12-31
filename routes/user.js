
const  cors = require('cors');

const express = require('express');

const app = express();
app.use(cors());

const newUserController = require('../controllers/newUser');

const router = express.Router();

router.post('/add-user',newUserController.addUser);

router.get('/get-user',newUserController.getUsers);

router.get('/get-user/:id',newUserController.getUser);

router.delete('/delete-user/:id',newUserController.deleteUser);

module.exports = router;
