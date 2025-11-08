const { StatusCodes } = require('http-status-codes');
const { ProblemRepository } = require('../repository');
const { ProblemService } = require('../services');

const problemService = new ProblemService(new ProblemRepository());

function pingProblemController(req, res, next) {
    return res.json({ message: 'The problem controller is up' });
}

async function addProblem(req, res , next) {
    try {
        const newProblem = await problemService.createProblem(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created the new prolem",
            error: {},
            data: newProblem
        });
    } catch (error) {
        next(error);
    }
}

function updateProblem(req, res) {

}

function getProblem(req, res) {

}

function getProblems(req, res) {

}

function deleteProblem(req, res) {

}


module.exports = {
    addProblem,
    deleteProblem,
    updateProblem,
    getProblem,
    getProblems,
    pingProblemController
}