var request = require("node-superfetch");
var moment = require("moment")
var CronJob = require("cron").CronJob;
var config = require("./config.json");

console.log("Webhook Connected.");

var job = new CronJob(
  "5 18 * * *",
  async function() {
    const { WebhookClient, MessageEmbed } = require("discord.js");
    const hook = new WebhookClient(config.webhookID, config.webhookToken);
    
    let { body: indo } = await request.get(
      "https://indonesia-covid-19-api.now.sh/api"
    );
    let { body: indoprov } = await request.get(
      "https://indonesia-covid-19-api.now.sh/api/provinsi"
    );

  let arrey = indoprov.data
  .sort((a, b) => a.kasusPosi < b.kasusPosi)
  .slice(0, 10)
  .map(
    (item, i) =>
      `${i + 1}. ${item.provinsi}: ${item.kasusPosi} Positif | ${
        item.kasusSemb
      } Sembuh | ${item.kasusMeni} Meninggal`
  )
  .join("\n");


    const embed = new MessageEmbed()
      .setAuthor(
        "COVID-19 in Indonesia Daily Webhook",
        "https://cdn.glitch.com/c8c4439d-fc47-4f12-a21c-755bac53a055%2Frsz_200212152442-tak-i.png?v=1585125357606"
      )
      .setColor("RED")
      .setDescription("Statistik 10 Provinsi paling rawan \n```" + arrey + "```")
      .addField(
        "Total " + indo.jumlahKasus + " kasus",
        `**Positif:** ${indo.perawatan} | **Sembuh:** ${indo.sembuh} | **Meninggal:** ${indo.meninggal}`
      )
      .addField(
        "More Info:",
        "[Kunjungi Website Resmi COVID-19 Indonesia](https://covid19.go.id/)"
      )
      .setFooter(
        "Menggunakan data dari https://github.com/mathdroid/indonesia-covid-19-api"
      )
      .setTimestamp();

    hook.send(embed);
    console.log("Feed Delivery Success!");
  },
  null,
  true,
  "Asia/Jakarta"
);

job.start();
