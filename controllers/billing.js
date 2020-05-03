const router = require("express").Router();
const bodyParser = require("body-parser");

// TODO switch to live stripe secret key in prod
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_yYImvQvKaT0T06NBarXIyFFW00GTRcci5F");

router.post("/checkout", async (req, res) => {
  const stripePlanId = "plan_HCdZG1auadlXMb";
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    subscription_data: {
      items: [
        {
          plan: stripePlanId,
        },
      ],
    },
    success_url:
      "https://localhost:3000/dashboard/billing/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/dashboard/billing",
    client_reference_id: "9999",
  });

  res.status(200).json(session);
});

// webhook to receive stripe events
router.post(
  "/stripehook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    let event;

    // TODO store this in datastore instead of logging

    try {
      const event = { body: { data }} = req
      console.log('parsedEvent: ', event);
    } catch (err) {
      console.log('webhook error', err)
      res.status(400)
    }

    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntent = event.data.object;
    //     // Then define and call a method to handle the successful payment intent.
    //     // handlePaymentIntentSucceeded(paymentIntent);
    //     break;
    //   case 'payment_method.attached':
    //     const paymentMethod = event.data.object;
    //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
    //     // handlePaymentMethodAttached(paymentMethod);
    //     break;
    //   // ... handle other event types
    //   default:
    //     // Unexpected event type
    //     return res.status(400).end();
    // }

    // Acknowledge receipt of event
    res.json({ received: true });
  }
);

module.exports = router;
