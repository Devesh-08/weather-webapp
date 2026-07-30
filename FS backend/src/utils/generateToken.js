import jwt from 'jsonwebtoken'

export const generateAccessToken=(id)=>{
    return jwt.sign(
        {_id:id},
        process.env.JWT_SECRET,
        {
            expiresIn:"15m"
        }
    )
}

export const generateRefreshToken=(id)=>{
    return jwt.sign(
        {
            _id:id
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn:"5d"
        }
    )
}