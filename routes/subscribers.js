const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
//Getting All
router.get('/',async(req,res)=>{
    try{
        const subscribers =  await Subscriber.find()
        res.json(subscribers)
    }
    catch(err){
        // 500 means some error occured on the backed server that has nothing to 
        // do with the client
        res.status(500).json({message:err.message})
    }
})
//Getting One     [middleware]
router.get('/:id',getSubscriber,(req,res)=>{
   res.json(res.subscriber)
})
// Creating One
router.post('/',async(req,res)=>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.subscriberToChannel,
    })
    try{
        const newSubscriber = await subscriber.save()
        // status 201 means successfully created an object
        res.status(201).json(newSubscriber)
    }catch(err){
        // 400->something wrong with user inpute.g. bad data
        res.status(400).json({message:err.message})
    }

    
})
// Updating One NB:Put updates all information 
// at once while patch updates only the information given by the user
router.patch('/:id',getSubscriber,async(req,res)=>{
    if(req.body.name!=null){
        res.subscriber.name = req.body.name
    } 
     if(req.body.subscriberToChannel!=null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch(err){
        res.status(500).json({message:err.message})
    }

})
//Deleting One
router.delete('/:id',getSubscriber,async(req,res)=>{
    try{
        await res.subscriber.deleteOne()
        res.json({message:'Deleted subscriber'})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
// next means if we finish with this function move to next middleware/
// section of code(nex param(the call back))
async function getSubscriber(req,res,next){
    let subscriber
    try{  
         subscriber = await Subscriber.findById(req.params.id)
        if (subscriber==null){
            return res.status(404).json({message:"could not find the subscriber"})
            }
    
    }
    catch(err){
       res.status(500).json({message:err.message})
    }
    res.subscriber = subscriber
    next()
}
module.exports = router

