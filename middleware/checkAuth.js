
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async(req, res, next) => {
    console.log();
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            req.user = await User.findById(decode.id);
            console.log(req.user)
        } catch (error) {
            return res.status(404).json({msg: "An error has ocurred"})
        }
    }
    next();
}

export default checkAuth;
