import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command(); //Crea la instancia de comandos de commander.

program
  .option("-d", "Variable para debug", false)
  .option("-p <port>", "Puerto del servidor", 9090)
  .option("--mode <mode>", "Modo de trabajo", "develop")
  .option("--persist <mode>", "Modo de persistencia", "mongodb");
program.parse();

console.log("Options: ", program.opts());
// console.log("Mode Option: ", program.opts().mode);
// console.log("Mode Option: ", program.opts().p);

const environment = program.opts().mode;

dotenv.config({
  path:
    environment === "production"
      ? "./src/config/.env.production"
      : "./src/config/.env.development",
});

// export const config = {
//   server: {
//     PORT: process.env.PORT,
//     NODE_ENV: process.env.NODE_ENV,
//     PERS: process.env.PERS,
//   },
//   fileSystem: {
//     path: "./DB",
//   },
//   mongodb: {
//     host: process.env.MONGO_URL,
//     options: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//     },
//   },
// };

export default {
  port: process.env.PORT,
  persistence: process.env.PERSISTENCE,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  gmailAccount: process.env.GMAIL_ACCOUNT,
  gmailAppPassword: process.env.GMAIL_APP_PASSWD,
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioSmsNumber: process.env.TWILIO_SMS_NUMBER,
  twilioToSmsNumber: process.env.TWILIO_TO_SMS_NUMBER,
};
