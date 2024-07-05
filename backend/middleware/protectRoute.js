//whenever sendmessage in message.controller run hona hoga toh usse pehle this middle ware will run in order to check k
//kya user authenticated hai ya nahi ,ie, k user jo send message method run krra uska WebToken exist bhi krta ya nhi

import jwt from "jsonwebtoken";

//now to req the cookie of the page to access the jwt token we need to add a COOKIE PARSER as a middleware in our server.js (Only then we'll be able to access the cookies jismai particular user ka jwt hgoa)

const protectRoute = (req, res, next) => {
  try {
    const token = req.cookie.jwt;

    //agar requested token access nhi hua from the cookie page tab return this error
    if (!token)
      return res
        .status(401)
        .json({ error: "unauthorised - No Token Provided" });

    //agar hai jwt toh we verify this token using the Secret key jisse humne login krne k time token generate kra tha
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    //token hai but invalid hai
    if (!decoded)
      return res
        .status(401)
        .json({ error: "unauthorised - No Token Provided" });
        

    //ab toh jwt signed hai mtlb authorized user hai so now we get the users data from db using the id that we can get from the JWT token
    const user = user.findById(decoded.userID).select("-password"); //jwt mai jo user id hai vo find kro to get the user data from db and not fetch the password

    if (!user) return res.status(404).json({ error: "user Not Found" });

    //ab sure hai ki user exist krta, so we put this user ka data in req.user and then ye user data next method(sendMessage) direclty access kar skta
    req.user = user; //middle ware ka baad wala method can access user ka data from req.user

    next(); //mtlb now we can run the method jo iss middleware k baad aata
  } catch (error) {
    console.log("error in ProtectRoute MiddleWare");
    res
      .status(401)
      .json({ error: "You are not authorized to access this route" });
  }
};

export default protectRoute;
