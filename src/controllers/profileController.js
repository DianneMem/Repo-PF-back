const User = require("../models/User");
const nodemailer = require("nodemailer");
const config = require("../configuration/config");

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

exports.payMailing= async (req,res)=>{
  try {
    console.log("body:",req.body);
    const payMailSend = async (data) => {
      const transport = nodemailer.createTransport({
        host: config.E_HOST,
        port: config.E_PORT,
        auth: {
          user: config.E_USER,
          pass: config.E_PASSWORD,
        },
      });
      const { username, email, product,amount } = data;
      await transport.sendMail({
        from: "books.com",
        to: email,
        subject: "FlyBooks Purchases",
        text: `Buy ${product.title}`,
        html: `
        <p> Hi! ${username}, thank you for your purchase! </p>
        <p>Proof of payment: </p>
        <p style="color: blue;"> Product Id:${product._id}</p>
        <p style="font-weight: bold"> Title:${product.title}</p>
        <p> State:${product.state}</p>
        <p> Amount:${amount}</p>
        `,
      });
    };
    payMailSend({
      username:req.body.username,
      email:req.body.email,
      product:req.body.product,
      amount:req.body.amount
    });
    res.status(200).send("Mail sended!");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
}

exports.cartMailing= async (req,res)=>{
  try {
    console.log("body:",req.body);
    const CartMailSend = async (data) => {
      const transport = nodemailer.createTransport({
        host: config.E_HOST,
        port: config.E_PORT,
        auth: {
          user: config.E_USER,
          pass: config.E_PASSWORD,
        },
      });
      const { username, email, allProducts,amount } = data;
      console.log(allProducts);
      await transport.sendMail({
        from: "books.com",
        to: email,
        subject: "FlyBooks Purchases",
        text: `Buy `,
        html: `
        <p> Hi! ${username}, thank you for your purchase! </p>
        <p>Proof of payment: </p>
        <p style="color: blue;"> Products Id:${allProducts.map(e=>e._id)}</p>
        <p style="font-weight: bold">Products Titles:${allProducts.map(e=>e.title)}</p>
        <p>Total Amount:${amount}</p>
        `,
      });
    };
    CartMailSend({
      username:req.body.username,
      email:req.body.email,
      allProducts:req.body.allProducts,
      amount:req.body.amount
    });
    res.status(200).send("Mail sended!");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
}

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

exports.updateBalance = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id);
     user.balance=  user.balance + req.body.balance
    await user.save()
      res.status(200).send(user);
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

exports.myReviews = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const user = await User.findById(req.params.id)
    if(!req.body.score || !req.body.comment || !req.body.sellerId || !req.body.productId){
      res.status(400).send("Incomplete Data")
    } else {
      user.myreviews.push(req.body)
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

exports.getMyReviews= async (req,res)=>{
  const user = await User.findById(req.params.id);
  const reviews = user.myreviews
  try {
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
