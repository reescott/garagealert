const https = require("https");
const qs = require("querystring");
const IFTTT_WEBHOOKS_EVENT = process.env.IFTTT_WEBHOOKS_EVENT;

if (!process.env.IFTTT_WEBHOOKS_EVENT || !process.env.IFTTT_WEBHOOKS_KEY) {
  throw new Error(
    "Please configure .env file with IFTTT_WEBHOOKS_EVENT and IFTTT_WEBHOOKS_KEY"
  );
}

const postEvent = eventData => {
  if (!eventData) throw new Error("eventData parameter required");
  const postData = qs.stringify(eventData);

  const options = {
    method: "POST",
    hostname: "maker.ifttt.com",
    path: `/trigger/${process.env.IFTTT_WEBHOOKS_EVENT}/with/key/${
      process.env.IFTTT_WEBHOOKS_KEY
    }`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData)
    }
  };

  const postReq = https
    .request(options, res => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);
      // console.log(res);

      res.on("data", d => {
        process.stdout.write(d);
      });
    })
    .on("error", e => {
      console.error(e);
    });

  postReq.write(postData);
  postReq.end();
};

module.exports = postEvent;
