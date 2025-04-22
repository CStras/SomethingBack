const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
const { limiter } = require("./middleware/limiter");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Connected to database."))
  .catch(console.error);
app.use(express.json());
/* Better approach: app․post('/api/data', express.json(), handler);
Apply it only where it’s actually needed.
*/
app.use(cors());

app.use(limiter);
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
