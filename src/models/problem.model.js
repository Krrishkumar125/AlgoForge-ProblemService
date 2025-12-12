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
    codeStubs: [
        {
            language: {
                type: String,
                enum: ['python', 'javascript', 'java', 'cpp', 'c#', 'ruby', 'go'],
                required: [true, 'Programming language is missing']
            },
            startSnippet: {
                type: String,
            },
            endSnippet: {
                type: String,
            },
            userSnippet: {
                type: String,
                default: ''
            }
        }
    ],
    editorial: {
        type: String
    }
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;