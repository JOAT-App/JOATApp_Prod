function userLookup(id){
    if(id === 1){
        return "unverified worker"
    }
    else if(id === 2){
        return "unvierifed homeowner"
    }
    else if(id === 3){
        return "worker"
    }
    else if(id === 4){
        return "homeowner"
    }
    else if(id === 5){
        return "admin"
    }
}

module.exports = userLookup;
