import express from "express";
import urlRoute from "./routes/url.js";
import connectToMongoDB from "./config/db.js";
import indexRouter from "./routes/index.js";
import URL from "./models/url.js";

const app = express();
const port = 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/url", urlRoute);
app.use("/", indexRouter);

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
  connectToMongoDB();
  console.log(`Listening to port ${port}`);
});
