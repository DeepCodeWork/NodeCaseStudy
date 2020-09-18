exports.isLoggedIn = async (req, res, next) => {
    try {

        const token = req.header('x-access-token').replace('Bearer ','');
        const decoded = jwt.verify(token, secretKey);
        const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token': token});
        if(!user){
            return res.status(401).json({message: "Please Authenticate"});
        }else{
            req.token = token;
            req.user = user;
            next();
        }
        } catch (error) {
            return res.status(400).json({ message: "Invalid Request" })
        }
}


exports.isUser = (req, res, next) => {
    if(req.user.role === 'USER')
        next();
    else
        return res.json({status: 0, message: 'Please authorize'})
}

exports.isAdmin = (req, res, next) => {
    if(req.user.role === 'ADMIN')
        next();
    else
        return res.json({status: 1, message: 'You are not authorized to access this content'})
}