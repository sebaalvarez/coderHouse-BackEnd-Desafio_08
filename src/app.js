import express, { urlencoded } from "express";
import exphbs from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";

import _dirname from "./utils.js";

import config from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import MongoSingleton from "./config/mongodb-singleton.js";

import mockingRoutes from "./routes/mocking.routes.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js";
import usersViewRouter from "./routes/users.views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import githubLoginViewRouter from "./routes/github-login.views.router.js";
import emailRouter from "./routes/email.router.js";

import jwtRouter from "./routes/jwt.router.js";
import usersRouter from "./routes/users.router.js";

const app = express();

app.use(cors());

const PORT = config.port;
const MONGO_URL = config.mongoUrl;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "public")));

app.use(cookieParser("ClavePrivada"));

app.use(
  session({
    // store: fileStorage({ path: "./sessions", ttl: 100, retries: 0 }),
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100,
    }),
    secret: "S3cr3t",
    resave: false,
    saveUninitialized: true,
  })
);

// motor de plantillas
app.set("views", path.join(_dirname, "views"));

app.engine(
  ".hbs",
  exphbs.engine({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

//Middlewares Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// endpoints
app.use("/", viewsRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/sessions", sessionsRouter);
app.use("/users", usersViewRouter);
app.use("/github", githubLoginViewRouter);
app.use("/api/email", emailRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/users", usersRouter);
app.use("/mockingproducts", mockingRoutes);

// console.log(`Puerto: ${PORT}`);
// console.log(`Conexion: ${MONGO_URL}`);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  const executeTest = config.runTests;
  if (executeTest) {
    console.log("Ejecutando set de pruebas:");
    //Escenarios:
    let testPasados = 0;
    const testTotales = 1;

    //Test 1:
    testPasados = escenario1(testPasados);

    console.log(`Test ejecutados: ${testTotales}, pasaron: ${testPasados}`);
  }
});

const escenario1 = (testPasados) => {
  console.log("Test 1: ");
  // Given --> lo que le doy a la funcion para ejecutar la prueba
  const numero1 = "2";
  const numero2 = 2;

  // ejecución de la función a testeaer
  let result = 0;

  // Validaciones que realiza el test
  if (result != null) {
    console.log("Test 1: pasa! \n");
    testPasados++;
  } else
    console.error(
      `Test 1: No pasado, se recibió ${typeof result}, pero se esperaba null.`
    );

  return testPasados;
};

const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.error(error);
  }
};
mongoInstance();
