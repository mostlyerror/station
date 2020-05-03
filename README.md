
### Testing Webhooks

https://stripe.com/docs/webhooks/test

Register webhook in Stripe Dashboard to receive notifications about stripe events, e.g., successful completion of Stripe Checkout off-site.
Use stripe-cli to test the endpoint (can't use localhost or http? in their dashboard)

`$ brew install stripe/stripe-cli/stripe`

```
$ stripe login
Your pairing code is: humour-nifty-finer-magic
Press Enter to open up the browser (^C to quit)

# forward events to server
$ stripe listen --forward-to localhost:4000/billing/stripehook
Ready! Your webhook signing secret is '{{WEBHOOK_SIGNING_SECRET}}' (^C to quit)

# The Stripe CLI has a trigger command that can create certain event types for you. In a new terminal, create a payment_intent.created event:
$ stripe trigger payment_intent.created

# The terminal where you ran the stripe listen command should show the event as well as the response from your server:
$ stripe listen --forward-to localhost:4000/billing/stripehook
Ready! Your webhook signing secret is '{{WEBHOOK_SIGNING_SECRET}}' (^C to quit)
INFO Received event: '{{WEBHOOK_EVENT_ID}}' [type: payment_intent.created]
INFO Got response from local endpoint, status=200



 




```

