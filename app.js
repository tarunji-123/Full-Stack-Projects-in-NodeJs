const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequeilize = require('./data/database');
// const newUser = require('./models/newUser');
const newUserRoutes = require('./routes/user');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended : false}));
app.use('/user',newUserRoutes);


// app.post('/user/add-user',async (req,res,next)=>{
//     const name = req.body.name;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const data = await newUser.create(
//         {
//             name: name,
//             email: email,
//             phone : phone
//         }
//     )
//     console.log("Hello Add user");
//     res.status(201).json({newuserDetail: data});
// })

// app.get('/user/get-user',async (req,res,next)=>{
//     const users = await newUser.findAll();
//     // res.send("hii");
//     console.log("Hii");
//     res.status(200).json({allUsers: users});
// })
// app.get('/user/get-user/:id',async (req,res,next)=>{
//     const userId = req.params.id;
//     const user = await newUser.findByPk(userId);
//     // res.send("hii");
//     console.log("Hii only 1 id ");
//     res.status(200).json({allUser: user});
// })

// app.delete('/user/delete-user/:id',async(req,res,next)=>{
//     const userId = req.params.id;

//     await newUser.destroy({where : {id : userId}});
//     res.sendStatus(200);
// })


sequeilize.sync()
.then(result => console.log('database synced'))
.catch(err => console.log(err));

app.listen(3000);

