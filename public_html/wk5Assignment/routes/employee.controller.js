var Employee = require('./employee.model')
var debug = require('debug')('Empl:employee')
function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.searchTable = function(req,res){
    debug("Searching")
    var colInput = req.params.colInput
    var valInput = req.params.valInput
    console.log(valInput)
    Employee.find({}).where(colInput, valInput).exec().then(function(results){
            sendJSONresponse(res,200,results)
            console.log(results)
        })
        .catch(function(err){
            sendJSONresponse(res,404,err)
        })

}
module.exports.searchTable = function(req,res){
    debug("Searching")
    var colInput = req.params.colInput
    var valInput = req.params.valInput
    console.log(valInput)
    console.log(colInput)
    Employee.find({}).where(colInput, valInput).exec().then(function(results){
            sendJSONresponse(res,200,results)
            console.log(results)
        })
        .catch(function(err){
            sendJSONresponse(res,404,err)
        })

}
module.exports.sortTable = function(req,res){
    debug("Sorting")
    var colInput = req.params.colInput
    Employee.find({}).sort(colInput).exec().then(function(results){
            sendJSONresponse(res,200,results)
            console.log(results)
        })
        .catch(function(err){
            sendJSONresponse(res,404,err)
        })

}

module.exports.employeeCreate = function(req,res){
    debug("Creating Employee", req.body)

    Employee.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
       department:req.body.department,
       startDate:req.body.startDate, 
       jobTitle:req.body.jobTitle, 
       salary:req.body.salary
    }).then(function(dataSaved){
        debug(dataSaved)
        sendJSONresponse(res,201,dataSaved)
    }).catch(function(err){
        debug(err)
        sendJSONresponse(res,400,err)
    })
}
module.exports.getAllEmployees = function(req,res){
    debug('Getting all employees')

    Employee.find().exec().then(function(results){
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        sendJSONresponse(res,404,err)
    })
}
module.exports.getEmployee = function(req,res){
    console.log(req.params)
    if(req.params && req.params.employeeid){
        debug('Getting Employee with id =', req.params.employeeid )

        Employee.findById(req.params.employeeid).exec().then(function(results){
            sendJSONresponse(res,200,results)
        })
        .catch(function(err){
            sendJSONresponse(res,404,{
                "message":"id not found"
            })
        })
    }
    else{
        sendJSONresponse(res,404,{
            "message":"id not found"
        })
    }
}

module.exports.employeeUpdate = function(req,res){
    if(!req.params.employeeid){
        sendJSONresponse(res, 404,{
            "message":"Not found id required"
        })
        return
    }

    Employee.findById(req.params.employeeid).exec()
    .then(function(employeedata){
        employeedata.firstName = req.body.firstName;
        employeedata.lastName = req.body.lastName;
        employeedata.department = req.body.department;
        employeedata.startDate = req.body.startDate;
        employeedata.jobTitle = req.body.jobTitle;
        employeedata.salary = req.body.salary;
        return employeedata.save()
    })
    .then(function(data){
        sendJSONresponse(res,200,data)
    }).catch(function(err){
        sendJSONresponse(res,400,err)
    })
}
module.exports.deleteEmployee = function(req,res){
    if(!req.params.employeeid){
        sendJSONresponse(res, 404,{
            "message":"Not found id required"
        })
        return
    }

    Employee.findByIdAndRemove(req.params.employeeid).exec()
    .then(function(data){
        debug("id " + req.params.employeeid + " deleted")
        debug(data)
        sendJSONresponse(res,204, null)
    }).catch(function(err){
        sendJSONresponse(res,404,err)
    })
}
module.exports.employeeUpdate = function(req,res){
    if(!req.params.employeeid){
        sendJSONresponse(res, 404,{
            "message":"Not found id required"
        })
        return
    }

    Employee.findById(req.params.employeeid).exec()
    .then(function(employeedata){
        employeedata.firstName = req.body.firstName;
        employeedata.lastName = req.body.lastName;
        employeedata.department = req.body.department;
        employeedata.startDate = req.body.startDate;
        employeedata.jobTitle = req.body.jobTitle;
        employeedata.salary = req.body.salary;
        return employeedata.save()
    })
    .then(function(data){
        sendJSONresponse(res,200,data)
    }).catch(function(err){
        sendJSONresponse(res,400,err)
    })
}
module.exports.sortEmployee = function(req,res){
    if(!req.params.employeeid){
        sendJSONresponse(res, 404,{
            "message":"Not found id required"
        })
        return
    }

    Employee.findByIdAndRemove(req.params.employeeid).exec()
    .then(function(data){
        debug("id " + req.params.employeeid + " deleted")
        debug(data)
        sendJSONresponse(res,204, null)
    }).catch(function(err){
        sendJSONresponse(res,404,err)
    })
}

