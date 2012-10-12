
/*
 * GET home page.
*/
var crypto = require('crypto');
var User = require('../models/user.js');

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index',{title: 'Express'});
	})
	app.get('/reg', function(req, res){
		res.render('reg', {title: 'register'});
	})
	app.post('/reg', function(req, res){
		if(req.body['password-repeat'] != req.body['password']){
			req.flash('error', 'twice password is not same');
			return res.redirect('/reg');
		}
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');

		var newUser = new User({
			name: req.body.username,
			password: password
		});
        console.log(newUser);
		User.get(newUser.name, function(err, user){
			console.log('get');
			if(user)
				err = 'username already exists';
			if(err){
				req.flash('error', err);
				console.log('get');
				return res.redirect('/reg');

			}
			
			newUser.save(function(err){
				if(err){
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = newUser;
				req.flash('success', 'regist succesful');
				console.log('hello');
				res.redirect('/');
			});  
		});	
	});
}


/*
app.get('/', routes.index);
app.get('/hello', routes.hello);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
*/