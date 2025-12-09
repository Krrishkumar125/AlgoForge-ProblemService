const { StatusCodes } = require('http-status-codes');
const { ProblemRepository } = require('../repository');
const { ProblemService } = require('../services');

const logger = require('../config/logger.config');

const problemService = new ProblemService(new ProblemRepository());

function pingProblemController(req, res, next) {
    return res.json({ message: 'The problem controller is up' });
}

async function addProblem(req, res , next) {
    try {
        const newProblem = await problemService.createProblem(req.body);
        logger.info("Successfully created the new problem")
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created the new problem",
            error: {},
            data: newProblem
        });
    } catch (error) {
        next(error);
    }
}

async function updateProblem(req, res, next) {
  try {
    const updatedProblem = await problemService.updateProblem(
      req.params.id,
      req.body
    );
    logger.info("Successfully updated the problem");
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated the problem",
      error: {},
      data: updatedProblem,
    });
  } catch (error) {
    next(error);
  }
}

async function getProblem(req, res , next) {
         try {
            const response = await problemService.getProblem(req.params.id);
            logger.info("Successfully fetched the problem");
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully fetched the problem",
                error : {},
                data: response
            });
         } catch (error) {
            next(error);
         }
}

async function getProblems(req, res , next) {
         try {
            const response = await problemService.getAllProblems();
            logger.info("Successfully fetched all the problems")
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully fetched all the problems",
                error : {},
                data: response
            });
         } catch (error) {
            next(error);
         }
}

async function deleteProblem(req, res , next) {
         try {
            const response = await problemService.deleteProblem(req.params.id);
            logger.info("Successfully deleted the problem")
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully deleted the problem",
                error : {},
                data: response
            });
         } catch (error) {
            next(error);
         }
}


module.exports = {
    addProblem,
    deleteProblem,
    updateProblem,
    getProblem,
    getProblems,
    pingProblemController
}