const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

router.get('/', (req, res) => {
res.render("customer/addOrEdit", {
viewTitle: "Staff Details"
});
});

router.post('/', (req, res) => {
if (req.body._id == '')
insertRecord(req, res);
else
updateRecord(req, res);
});


function insertRecord(req, res) {
var customer = new Customer();
customer.no = req.body.no;
customer.fullName = req.body.fullName;
customer.email = req.body.email;
customer.mobile = req.body.mobile;
customer.city = req.body.city;
customer.state = req.body.state;
customer.department = req.body.department;
customer.salary = req.body.salary;
customer.save((err, doc) => {
if (!err)
res.redirect('customer/list');
else {
if (err.name == 'ValidationError') {
handleValidationError(err, req.body);
res.render("customer/addOrEdit", {
viewTitle: "Add Staffs",
customer: req.body
});
}
else
console.log('Error during record insertion : ' + err);
}
});
}

function updateRecord(req, res) {
Customer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
if (!err) { res.redirect('customer/list'); }
else {
if (err.name == 'ValidationError') {
handleValidationError(err, req.body);
res.render("customer/addOrEdit", {
viewTitle: 'Update Staff Details',
customer: req.body
});
}
else
console.log('Error during record update : ' + err);
}
});
}


router.get('/list', (req, res) => {
Customer.find((err, docs) => {
if (!err) {
res.render("customer/list", {
list: docs
});
}
else {
console.log('Error in retrieving Staff list :' + err);
}
});
});


function handleValidationError(err, body) {
for (field in err.errors) {
switch (err.errors[field].path) {
case 'fullName':
body['fullNameError'] = err.errors[field].message;
break;
case 'email':
body['emailError'] = err.errors[field].message;
break;
default:
break;
}
}
}

router.get('/:id', (req, res) => {
Customer.findById(req.params.id, (err, doc) => {
if (!err) {
res.render("customer/addOrEdit", {
viewTitle: "Update Staff Details",
customer: doc
});
}
});
});

router.get('/delete/:id', (req, res) => {
Customer.findByIdAndRemove(req.params.id, (err, doc) => {
if (!err) {
res.redirect('/customer/list');
}
else { console.log('Error in staff delete :' + err); }
});
});

module.exports = router;