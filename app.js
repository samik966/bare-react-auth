const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// const productRouter = require('./routes/products');
// const orderRouter = require('./routes/orders');
const userRouter = require("./routes/users");

app.use(logger("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
mongoose.connect("mongodb://localhost/video-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

// app.use('/products',productRouter);
// app.use('/orders', orderRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  const error = new Error("No Route Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      errorCode: error.status,
    },
  });
});

module.exports = app;
