const {StatusCodes} = require('http-status-codes')


function pingProblemController(req,res,next){
   return res.json({message:'The problem controller is up'});
}

function addProblem(req,res){
       
}

function updateProblem(req,res){

}

function getProblem(req,res){
       
}

function getProblems(req,res){
       
}

function deleteProblem(req,res){
       
}


module.exports={
    addProblem,
    deleteProblem,
    updateProblem,
    getProblem,
    getProblems,
    pingProblemController
}