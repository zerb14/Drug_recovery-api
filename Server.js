const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let recoveryPrograms = [
    {
        id: 1,
        name: 'Program A',
        description: 'Description of Program A',
        location: 'City A',
        contact: 'contact@programa.org',
    },
    {
        id: 2,
        name: 'Program B',
        description: 'Description of Program B',
        location: 'City B',
        contact: 'contact@programb.org',
    },
];

// Get all recovery programs
app.get('/api/programs', (req, res) => {
    res.json(recoveryPrograms);
});

// Get a specific recovery program by ID
app.get('/api/programs/:id', (req, res) => {
    const program = recoveryPrograms.find(p => p.id === parseInt(req.params.id));
    if (!program) return res.status(404).send('Program not found');
    res.json(program);
});

// Add a new recovery program
app.post('/api/programs', (req, res) => {
    const newProgram = {
        id: recoveryPrograms.length + 1,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        contact: req.body.contact,
    };
    recoveryPrograms.push(newProgram);
    res.status(201).json(newProgram);
});

// Update an existing recovery program
app.put('/api/programs/:id', (req, res) => {
    const program = recoveryPrograms.find(p => p.id === parseInt(req.params.id));
    if (!program) return res.status(404).send('Program not found');

    program.name = req.body.name;
    program.description = req.body.description;
    program.location = req.body.location;
    program.contact = req.body.contact;
    res.json(program);
});

// Delete a recovery program
app.delete('/api/programs/:id', (req, res) => {
    const programIndex = recoveryPrograms.findIndex(p => p.id === parseInt(req.params.id));
    if (programIndex === -1) return res.status(404).send('Program not found');

    const deletedProgram = recoveryPrograms.splice(programIndex, 1);
    res.json(deletedProgram);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
