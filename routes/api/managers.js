const router = require('express').Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
app.get('/managers', function(req,res) {
	Manager.find({}, function (err, managers) {
		if (err) return res.status(500).send("The server encountered an internal error. Please retry the request.");
		res.status(200).send(managers);
	});
});

// MAKE A NEW MANAGER
app.post('/managers', function(req,res) {
	Manager.create({
		name: req.body.name,	
		email : req.body.email
	}, function (err, manager) {
		if (err) return res.status(400).send("One of the request inputs is not valid.");
		res.status(200).send(manager);
	});
});

// 
app.get('/managers/:mid', function(req,res) {
    Manager.findById(req.params.mid, function (err, manager) {
        if (err || !manager ) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(manager);
    });
});

app.put('/managers/:mid', function(req,res) {
    Manager.findByIdAndUpdate(req.params.mid, req.body, {new: true}, function (err, manager) {
        if (err || !manager) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send(manager);
    });
});

app.delete('/managers/:mid', function(req,res) {
    Manager.findByIdAndRemove(req.params.mid, function (err, manager) {
        if (err || !manager) return res.status(404).send("The specified resource does not exist.");
        res.status(200).send("Manager '"+ manager.name +"' was deleted.");

    });
});