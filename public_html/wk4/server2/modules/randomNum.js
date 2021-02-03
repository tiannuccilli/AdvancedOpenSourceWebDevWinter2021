function rando(){
    return Math.round(Math.random()*4);
}

function somethingElse(){
    return "Message"
}

//module.exports.rando = rando()
//module.exports.somethingElse = somethingElse()

module.exports = {rando:rando(), somethingElse:somethingElse()}
