import { JWT, StatusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"
import Jwt from 'jsonwebtoken'
 const AuthMiddleware=(req , res , next)=>{
    if(req.headers["auth"] === undefined){
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR,"Access Denied"))
    }
    const token = req.headers['auth'];
    try {
        const decodeed=Jwt.verify(token , JWT)
        console.log(decodeed)
        req.userId =decodeed.userId
        return next()
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROSSABLE_ENTITY,"Invalid token"))
    }
}
export default AuthMiddleware
