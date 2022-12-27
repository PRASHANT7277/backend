const client=require("./user.model")
const express=require("express")
const app=express.Router()

app.get("/",async(req,res)=>{
    try{
        let name=req.query.name || ""
        let page=req.query.page || 1
        let limit =req.query.limit || 5
        
        let obj={}
        obj.name={$regex:name,$options:"i"}
        
        const user=await client.find(obj).skip((page-1)*limit).limit(limit)
        let count=await client.countDocuments(obj)
        res.send({ totalPages:Math.ceil(count/limit),
            page, user });
    }catch(e){
        res.status(500).send(e)
    }
})
app.post("/post", async (req, res) => {
  try {
    const user = await client.create({...req.body});
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.get("/:id", async (req, res) => {
    
  try {
    const id = req.params.id;
    const user = await client.findById(id);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await client.findByIdAndDelete(id);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await client.findByIdAndUpdate({_id:id},{$set:{...req.body}});
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports=app