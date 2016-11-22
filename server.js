var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var students = [];
var StudentId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Here goes students list!');
});

	// GET /students
	app.get('/students', function(req, res){
		var count = 0;
		for(var i=0; i<students.length; i++)
		{
		count=i+1;
		}
		console.log(count);
		res.send(JSON.stringify(students,null,null,10)+"\n In our group we have "+count+" students");
	});

			// GET /students/:id
			app.get('/students/id', function(req, res){
				var StudentId = parseInt(req.params.id, 10);
				var matchedStudent = _.findWhere(students, {id: StudentId});

				if(matchedStudent){
					res.json(matchedStudent);
				}else{
					res.status(404).send();
				}
			});
							// POST /students
							app.post('/students', function(req, res){
								var body = _.pick(req.body, 'fio','univer');

								if(!_.isString(body.fio) || !_.isString(body.univer)){
									return res.status(400).send();
								}
								body.id = StudentId++;
								students.push(body);
								res.json(body);	
								console.log("POST Working!");
							});
											app.listen(PORT, function(){
											console.log('Express listening on port ' + PORT + '!');
											});