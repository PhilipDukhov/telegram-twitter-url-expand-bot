import { Bot as TelegramBot } from "grammy";
import { notifyAdmin } from "./helpers/notifier";
import * as dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";
dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN env variable is not defined");
}

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

// Catch all errors with middleware
bot.catch(errorHandler);

// Import all listeners from their index files
import "./link-listener";
import "./link-listener-channel";
import "./commands";
import "./callbacks";

bot.start().catch((error) => {
  console.error("[Error] Could not start bot.", error);
  notifyAdmin(error);
});

const message = `[ Bot started${process.env.DEV ? " in DEV mode" : ""}... ]`;
console.info(message);
notifyAdmin(message);
