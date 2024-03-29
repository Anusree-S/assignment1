const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
no: {
type: String,
required: 'This field is required.'
},
fullName: {
type: String,
required: 'This field is required.'
},
email: {
type: String
},
mobile: {
type: String
},
city: {
type: String
},
state: {
    type: String
    },
department: {
    type: String
    },
    salary: {
        type: String
        }

});

// Custom validation for email
customerSchema.path('email').validate((val) => {
emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Customer', customerSchema);