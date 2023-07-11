const newUser = require('../models/newUser');

exports.addUser = async(req,res,next)=>{
    const { name, email, phone} = req.body;
    const data = await newUser.create(
        {
            name: name,
            email: email,
            phone : phone
        }
    )
    res.status(201).json({newuserDetail: data});
};

exports.getUsers = async(req,res,next)=>{
    const users = await newUser.findAll();
    res.status(200).json({allUsers: users});
};

exports.getUser = async(req,res,next)=>{
    const userId = req.params.id;
    const user = await newUser.findByPk(userId);
    res.status(200).json({allUser: user});
}

exports.deleteUser = async(req,res,next)=>{
    const userId = req.params.id;

    await newUser.destroy({where : {id : userId}});
    res.sendStatus(200);
};

