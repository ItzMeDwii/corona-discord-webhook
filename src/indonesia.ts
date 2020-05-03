import { WebhookClient, MessageEmbed } from "discord.js";
import { CronJob } from "cron";
import { get } from "superagent";
import moment from "moment";
import * as config from './config.json';

console.log("Application Ready!");

const job = new CronJob("5 18 * * *", async () => {
  
  const webhook = new WebhookClient(config.webhookID, config.webhookToken);
  
  const indonesia = await get("https://indonesia-covid-19-api.now.sh/api");
  const provinsi = await get("https://indonesia-covid-19-api.now.sh/api/provinsi");
  
  const listProvinsi = provinsi.body.data
  .sort((a: any, b: any) => a.kasusPosi < b.kasusPosi)
  .slice(0, 10)
  .map((item: any, i: any) => `${i + 1}. ${item.provinsi}: ${item.kasusPosi} Positif | ${item.kasusSemb} Sembuh | ${item.kasusMeni} Meninggal`)
  .join("\n");
  
  const embed = new MessageEmbed()
      .setAuthor(
        "COVID-19 in Indonesia Daily Webhook",
        "https://cdn.glitch.com/c8c4439d-fc47-4f12-a21c-755bac53a055%2Frsz_200212152442-tak-i.png?v=1585125357606"
      )
      .setColor("RED")
      .setDescription("Statistik 10 Provinsi paling rawan \n```" + listProvinsi + "```")
      .addField(
        "Total " + indonesia.body.jumlahKasus + " kasus",
        `**Positif:** ${indonesia.body.perawatan} | **Sembuh:** ${indonesia.body.sembuh} | **Meninggal:** ${indonesia.body.meninggal}`
      )
      .addField(
        "More Info:",
        "[Kunjungi Website Resmi COVID-19 Indonesia](https://covid19.go.id/)"
      )
      .setFooter(
        "Menggunakan data dari https://github.com/mathdroid/indonesia-covid-19-api"
      )
      .setTimestamp();
  
  webhook.send(embed);
  
  console.log("Message Delivery Success!", moment(Date.now()).format("LLLL"));
  
}, null, true, "Asia/Jakarta");

job.start();
