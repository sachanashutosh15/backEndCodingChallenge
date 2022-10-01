const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { usersModel, productsModel } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://sachanashutosh15:Ashutosh_99@cluster0.agcck.mongodb.net/FMCG?retryWrites=true&w=majority")
.then(() => {
  console.log("Successfully connected to database");
})
.catch((error) => {
  console.log(error);
})

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer-api",
      description: "Customer-api-information",
      contact: {
        name: "Developer",
      },
      servers: ["http://localhost:3001"]
    }
  },
  // ["./routes/*.js"]
  apis: ["app.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes


/**
 * @swagger
 * /products:
 *    post:
 *      description: Use to add new products
 *    parameters:
 *      - name: Product
 */
app.post("/products", async (req, res) => {
  try {
    console.log(req.body);
    const { name, pricePerUnit, totalQuantity, quantityPerUnit, unit } = req.body;
    if (!name || !pricePerUnit || !totalQuantity || !quantityPerUnit || !unit) {
      throw new Error("Please provide all information to maintain homogeneity of data");
    }
    const newProductsModel = new productsModel(req.body);
    await newProductsModel.save();
    res.status(200).send({res: "Successfully added the product"});
  } catch (error) {
    res.send({error: `${error}`});
  }
})

app.get("/items", async (req, res) => {
  try {
    const items = await productsModel.find();
    res.status(200).send({res: items});
  } catch (error) {
    res.send({error: error})
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});









// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Customer API",
//       description: "Customer API Information",
//       contact: {
//         name: "Amazing Developer"
//       },
//       servers: ["http://localhost:5000"]
//     }
//   },
//   // ['.routes/*.js']
//   apis: ["app.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes
// /**
//  * @swagger
//  * /customers:
//  *  get:
//  *    description: Use to request all customers
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
// app.get("/customers", (req, res) => {
//   res.status(200).send("Customer results");
// });

// /**
//  * @swagger
//  * /customers:
//  *    put:
//  *      description: Use to return all customers
//  *    parameters:
//  *      - name: customer
//  *        in: query
//  *        description: Name of our customer
//  *        required: false
//  *        schema:
//  *          type: string
//  *          format: string
//  *    responses:
//  *      '201':
//  *        description: Successfully created user
//  */
// app.put("/customer", (req, res) => {
//   res.status(200).send("Successfully updated customer");
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });