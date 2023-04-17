const express = require('express');
const uuid = require('uuid');
const router = express.Router();
let members = require('../../Members');
//Get all members
router.get('/', (req, res)=>res.json({data:members}));

//Get a single member
router.get('/:id', (req, res)=>{
    //some() return true or false depending on the condition
    const found = members.some(_member => _member.id === parseInt(req.params.id))
    found?
    res.json(members.filter(_member => _member.id === parseInt(req.params.id)))
    :res.status(400).json({msg: `No member with id: ${req.params.id} was found`})
});

//Create a member
router.post('/', (req, res)=>{
    const newMember = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
     res.status(400).json({msg: 'Name & Email are required '})
    }
    members = {...members, newMember};
    res.json(members)
    // res.redirect('/');
})

//Update a member
router.put('/:id', (req, res)=>{
    
    const found = members.some(_member => _member.id === parseInt(req.params.id))

    if (found) {
        const updtMember = req.body;
        members.forEach(_member =>{
            if(_member.id === parseInt(req.params.id)){
                _member ={..._member, ...updtMember}
                // _member.name= updtMember.name? updtMember.name: _member.name;
                // _member.email= updtMember.email? updtMember.email: _member.email;
                
                res.json({msg: `Member with id ${req.params.id} updated`, _member})
            }
        });
    }else{
        res.status(400).json({msg: `No member with id: ${req.params.id} was found`})
    }
   
})

//Delete a member
router.delete('/:id', (req, res)=>{

    const found = members.some(_member => _member.id === parseInt(req.params.id))

    if (found) {
        res.json({msg: `Member with id ${req.params.id} deleted`, members: members.filter(_member =>
            _member.id !== parseInt(req.params.id)) }) 
    }else{
        res.status(400).json({msg: `No member with id: ${req.params.id} was found`})
    }
   
})
module.exports = router;