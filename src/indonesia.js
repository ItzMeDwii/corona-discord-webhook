var request = require("node-superfetch");
var moment = require("moment")
var CronJob = require("cron").CronJob;
var config = require("./config.json");

var job = new CronJob(
  "5 6,18 * * *",
  async function() {
    const { WebhookClient, MessageEmbed } = require("discord.js");
    const hook = new WebhookClient(config.webhookID, config.webhookToken);

    let { body: corona } = await request.get(
      "https://api.kawalcorona.com/"
    );
    let { body: indo } = await request.get(
      "https://api.kawalcorona.com/indonesia"
    );
    let { body: indoprov } = await request.get(
      "https://api.kawalcorona.com/indonesia/provinsi"
    );

    let arrey = indoprov
      .slice(0, 10)
      .map(
        (item, i) => `${i + 1}. ${item.attributes.Provinsi}: ${item.attributes.Kasus_Posi} Positif | ${item.attributes.Kasus_Semb} Sembuh | ${item.attributes.Kasus_Meni} Meninggal`)
      .join("\n");

    const embed = new MessageEmbed()
      .setAuthor(
        "Indonesia COVID-19 Daily Webhook",
        "https://cdn.glitch.com/c8c4439d-fc47-4f12-a21c-755bac53a055%2Frsz_200212152442-tak-i.png?v=1585125357606"
      )
      .setColor("RED")
      .setDescription("Statistik Provinsi 10 Teratas \n```" + arrey + "```")
      .addField(
        "Total",
        `**Positif:** ${indo[0].positif} | **Sembuh:** ${indo[0].sembuh} | **Meninggal:** ${indo[0].meninggal}`
      )
      .setFooter(
        "Last Updated: " +
          moment(
            corona.find(x => x.attributes.Country_Region === "Indonesia")
              .attributes.Last_Update
          ).format("LLLL")
      );

    hook.send(embed);
    console.log("Done!");
  },
  null,
  true,
  "Asia/Jakarta"
);

job.start();
