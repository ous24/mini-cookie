  const  auth=(req, res, next)=>{
    isAuthorized=true
    console.log(req.cookies)
    // modify isAuthorized based on your cookies authentification logic
    if(!isAuthorized){
        res.status(403).send()
    }
    else
    next();
}
module.exports= auth