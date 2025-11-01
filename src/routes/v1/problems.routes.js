const express = require('express');

const {probelemController} = require('../../controllers')

const problemRouter = express.Router();

problemRouter.get('/ping', probelemController.pingProblemController);
problemRouter.get('/:id', probelemController.getProblem);
problemRouter.get('/', probelemController.getProblems);
problemRouter.put('/:id', probelemController.updateProblem);
problemRouter.post('/', probelemController.addProblem);
problemRouter.delete('/:id', probelemController.deleteProblem);


module.exports = problemRouter;