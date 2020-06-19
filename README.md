<h1 align="center">Corona (COVID-19) Discord Webhook (Indonesia)</h1>
<p align="center">
  <a href='https://github.com/ItzMeDwii/corona-discord-webhook/workflows/'>
    <img alt="Workflows" src="https://github.com/ItzMeDwii/corona-discord-webhook/workflows/Node.js%20CI/badge.svg">
  </a>
</p>

### About
```
Daily Webhook Corona virus update for your discord server. Updated every 18.00 GMT+7 (Asia/Jakarta)
Using Nodejs v12, Discord.js v12.2.0, and CronJob.

Data based on https://github.com/mathdroid/indonesia-covid-19-api
```

### Installation
Install the packages:
```
$ npm install
```
Setup the webhook `./src/config.json` (support multiple webhook):
```
{
  "name": "",
  "webhookID": "",
  "webhookToken": ""
}
```
Run the webhook:
```
$ npm start
```

### Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -m "Add some feature"`
4.  Push to the branch: `git push -u origin my-new-feature`
5.  Submit a pull request :D



©️ 2020 **[DwiiUnknown](https://corona.dwii.me/)** | API: https://github.com/mathdroid/indonesia-covid-19-api
