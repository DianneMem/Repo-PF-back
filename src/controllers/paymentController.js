const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51MEajtLJTt31yzzaW3muurRnhU5ue2XgeiO86okSHdofdTkCvCme0d0dcfSm47w26VZrnXxNHBe6awOg1CGqworX00CZhOt5FX");

exports.payment= async (req, res) => {
  const { id, amount,created } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
      description:created
    }); 

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
}
