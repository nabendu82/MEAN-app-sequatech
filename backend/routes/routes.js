const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee.js');

//GET Single employee
router.get('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id, (err, doc) => {
            if(err) console.log('Error in Get Data ' + err);
            else res.send(doc);
        })
    } else {
        return res.status(400).send(`No record found with ${req.params.id}`)
    }
})

//DELETE Single employee
router.delete('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndDelete(req.params.id, (err, doc) => {
            if(err) console.log('Error in Deleting Data ' + err);
            else res.send(doc);
        })
    } else {
        return res.status(400).send(`No record found with ${req.params.id}`)
    }
})

//PUT API
router.put('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        }

        Employee.findByIdAndUpdate(req.params.id, {$set :emp}, {new: true}, (err, doc) => {
            if(err){
                console.log('Error in Update Employee by ID ' + err);
            } else {
                res.send(doc);
            }
        })
    } else {
        return res.status(400).send(` No record found with ${req.params.id}`);
    }
})

//GET API
router.get('/', (req, res) => {
    Employee.find((err, doc) => {
        if(err) console.log('Error in Get Data ' + err);
        else res.send(doc);
    })
})

//POST API
router.post('/', (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    })

    emp.save((err, doc) => {
        if(err) console.log('Error in Post Data ' + err);
        else res.send(doc);
    })
})

module.exports = router;