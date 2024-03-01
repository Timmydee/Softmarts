const express = require("express");
var cors = require("cors");
const stripe = require(`stripe`)(
  `sk_test_51N50FmI24rh6RrZxj18XBiF2PT5E3RgZALzgriigiZ8fV59EVstN0STqd4aQ86uMU6g8rszH92I78zURZFGczfDn00vcWT8mGJ`
);

const app = express();
app.use(cors({
    origin: "https://softmarts.vercel.app/"
}));
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const cartItems = req.body.items;

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100, // Convert price to cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://softmarts-be.vercel.app//success",
    cancel_url: "https://softmarts-be.vercel.app//cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("listening on port 4000"));
