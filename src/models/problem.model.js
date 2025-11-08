const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title cannot be empty']
    },
    description: {
        type: String,
        required: [true, 'Description cannot be empty']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    },
    testCases: [
        {
            input: {
                type: String,
                required: [true, 'Input testcase is missing']
            },
            output: {
                type: String,
                required: [true, 'Output testcase is missing']
            }
        }
    ],
    editorial: {
        type: String
    }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;