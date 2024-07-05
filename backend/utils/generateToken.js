import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
        expiresIn: '15d'
    })

    res.cookie("jwt",token,{
        maxAge : 15 * 24 * 60 * 60 * 1000, // MS    milli second mai explain kra 15 days ko. thats all
        httpOnly: true,      //prevent XSS attacks ( this cookie will not be accessible via JS)
        sameSite: "strict", //CSRF attacks cross -site reqeust forgery attacks
    });
};

export default generateTokenAndSetCookie;