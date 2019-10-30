const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/StaffDB',{useNewUrlParser:true},(err)=>{if(!err){console.log('MongoDb connection Succeeded')}
else{console.log('Error in DB connection:'+err)}
});

require('./customer.model');

