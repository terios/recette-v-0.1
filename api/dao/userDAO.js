/**
 * Created by terios on 10/2/14.
 */

var mongoose = require('mongoose'),
    UserAccount = mongoose.model('User');


exports.all = function (req, res) {
    UserAccount.find({
        'local.role': {
            '$ne': 'admin'
        }
    }).exec(function (err, userAccounts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.send(userAccounts);
        }
    });
};

exports.remove = function (req, res) {
    var userAccount = new UserAccount(req.body.compte);
    UserAccount.findById(userAccount._id, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            UserAccount.remove(item, function () {
                res.send({
                    'result': 'success deleting'
                });
            });
        }
    });
};

exports.update = function (req, res) {
    var userAccount = new UserAccount(req.body.userAccount);


    item.local.email = userAccount.email || item.local.email;
    item.local.firstName = userAccount.firstName || item.local.firstName;
    item.local.secondName = userAccount.prenom || item.local.secondName;

    item.save(function (err) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            res.send(200, item);
        }
    });
};