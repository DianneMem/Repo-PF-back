const User = require("../models/User");


exports.addPurchaseUser = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id)
    if(!req.body.username || !req.body.productId || !req.body.sellerId || !req.body.image || !req.body.title){
      res.status(400).send("Incomplete Data")
    } else {
      user.purchases.push(req.body)
      await user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addFavorites = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id)
      user.favorites.push(req.body)
      await user.save();
      res.status(200).send(user);
    
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addMyProducts = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id)
    if(!req.body.productId){
      res.status(400).send("Incomplete Data")
    } else {
      user.myproducts.push(req.body)
      await user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateProductProfile = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id)
    let productFind=user.myproducts.find(e=>e._id===req.query.item)
    productFind=req.body
    let aux= user.myproducts.filter(e=>e._id!==req.query.item)
    aux.push(productFind);
    user.myproducts=aux
    await user.save()
      res.status(200).send(productFind);
  } catch (error) {
    res.status(400).send(error.message);
  }
};



exports.getMyProducts= async (req,res)=>{
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id)
    if(!req.params.id){
      res.status(400).send("Incomplete Data")
    } else {
      res.status(200).send(user.myproducts);
    }


  } catch (error) {
    
  }
}

exports.addReviews = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id)
    if(!req.body.score || !req.body.comment || !req.body.sellerId || !req.body.productId){
      res.status(400).send("Incomplete Data")
    } else {
      user.reviews.push(req.body)
      await user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.getAllReviews= async (req,res)=>{
  try {
      const users = await User.find({})
      const reviews = users.filter((elm) => {
        return elm.reviews.length !== 0
      })
      let result = []
      reviews.forEach(element => {
        element.reviews.map((elm) => result.push(elm))
      });
      // const result = reviews.map((elm) => elm.reviews)
      res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.getReviewUser= async (req,res)=>{
  const user = await User.findById(req.params.id);
  const review = user.reviews
  try {
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
