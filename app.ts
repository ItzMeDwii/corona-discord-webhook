const config = require("./src/config.json");
require("dotenv").config();

if (config.settings.enableID) {
require("./src/indonesia");
} else {
console.log("Indonesia Webhook disabled.");
}

if (config.settings.enableGlobal) {
require("./src/global");
} else {
console.log("Global Webhook disabled.");
}
