const config = require("./src/config.json");
require("dotenv").config();

if (config.settings.enableID) {
require("./src/indonesia");
} else {
console.log("Indonesia Webhook disabled.");
}
