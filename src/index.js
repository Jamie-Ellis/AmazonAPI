const express = require("express");
//import routes here
const productsRouter = require("./services/products");
const cartsRouter = require("./services/carts");
const reviewsRouter = require("./services/reviews");
const db = require("./db");
const cors = require("cors");

const server = express();

//connect routes to server here
server.use(cors());
server.use(express.json());
server.use("/products", productsRouter);
server.use("/carts", cartsRouter);
server.use("/reviews", reviewsRouter);
db.sequelize
  .sync({ force: false })
  .then((result) => {
    return db.User.findByPk(1);
  })
  .then(async (user) => {
    if (!user) {
      const newUser = await db.User.create({
        firstName: "Jamie",
        lastName: "Ellis",
        email: "jamiekyaellis@gmail.com",
      });
    }
  })
  .then(() => {
    server.listen(process.env.PORT || 3002, () => {
      console.log("server is running on port ", process.env.PORT || 3002);
    });
  });
