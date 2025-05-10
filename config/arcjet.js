
import arcjet , {shield, detectBot, tokenBucket} from "@arcjet/node";
import {ARCJET_KEY} from "../config/env.js"

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"], 
  rules: [
   shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

// Token Bucket algorithm used , a bucket has fixed number of tokens which get refilled with time , each request consume some token , when no token left , request is denied.

export default aj;