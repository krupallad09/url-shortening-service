import express from "express";
import urlRoute from "./routes/url.js";
import { connectToMongoDB } from "./connect.js";
import URL from "./models/url.js";

const app = express();
const port = 8001;

connectToMongoDB(
  "mongodb+srv://23mce010:23mce010@cluster0.c6snc.mongodb.net/short_url"
).then(() => {
  console.log(`Mongodb connected`);
});

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
