import { WebhookClient, MessageEmbed } from "discord.js";
import { CronJob } from "cron";
import { get } from "superagent";
import moment from "moment";
import * as config from "./config.json";

console.log("Application Ready!");

const job = new CronJob("0 18 * * *",
  async () => {
    const webhooks = config.webhook.Global;
    webhooks.forEach(async (item: any) => {
      const webhook = new WebhookClient(item.webhookID, item.webhookToken);
      const global = await get("https://covid19.mathdro.id/api");
      const countries = await get("https://covid19.mathdro.id/api/confirmed");

      const listCountry = countries.body
        .sort((a: any, b: any) => a.confirmed < b.confirmed)
        .slice(0, 10)
        .map(
          (item: any, i: any) =>
            `${i + 1}. ${item.countryRegion}: ${item.confirmed} Confirmed | ${
              item.recovered
            } Sembuh | ${item.deaths} Meninggal`
        )
        .join("\n");

      const embed = new MessageEmbed()
        .setAuthor(
          "COVID-19 in Global Daily Webhook",
          "https://cdn.glitch.com/c8c4439d-fc47-4f12-a21c-755bac53a055%2Frsz_200212152442-tak-i.png?v=1585125357606"
        )
        .setColor("RED")
        .setDescription(
          "Statistik 10 Negara paling rawan \n```" + listCountry + "```"
        )
        .addField(
          "Total " + global.body.confirmed.value + " kasus",
          `**Positif:** ${global.body.confirmed.value -
            global.body.recovered.value} | **Sembuh:** ${
            global.body.recovered.value
          } | **Meninggal:** ${global.body.deaths.value}`
        )
        .setFooter("Menggunakan data dari John Hopkins University CSSE")
        .setTimestamp();

      webhook.send(embed);

      console.log(
        `Message Delivery Success to ${item.name} !`,
        moment(Date.now()).format("LLLL")
      );
    });
  },
  null,
  true,
  "Asia/Jakarta"
);
job.start();
