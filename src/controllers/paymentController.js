const Stripe = require("stripe");
const { param } = require("../routes/userRoutes");
const stripe = new Stripe("sk_test_51MEajtLJTt31yzzaW3muurRnhU5ue2XgeiO86okSHdofdTkCvCme0d0dcfSm47w26VZrnXxNHBe6awOg1CGqworX00CZhOt5FX");

exports.payment= async (req, res) => {
  const { id, amount,created,customer } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
      description:created,
      customer
    }); 

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
}

exports.createCustomer=async(req,res)=>{
  const {name,email}=req.body
 try {
  var param ={};
  param.email =email
  param.name=name
  param.description ="New stripe User"

 let newCustomer= await stripe.customers.create(param, function (err,customer) {
      if(err)
      {
          console.log("err: "+err);
      }if(customer)
      {
          console.log("success: "+customer)
      }else{
          console.log("Something wrong")
      }
  })
res.status(200).send(newCustomer);
 } catch (error) {
  res.status(400).json(error);
 }
}
