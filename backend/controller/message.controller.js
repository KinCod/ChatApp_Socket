export const sendMessage = async(req,res)=>{
    console.log("SendMessage Controller");
    return res.send(req.params.id); //ye jo route mai input kra hota through link unko hum direct access kar skte using params
}