var fs = require("fs");
var config = require("./config.json")

var twit = require('twit') 
var t = new twit({
  consumer_key:         config.consumerKey,
  consumer_secret:      config.consumerSecret,
  access_token:         config.accessToken,
  access_token_secret:  config.accessTokenSecret
})

var discord = require("discord.js");
var client = new Discord.client();

//reads the .js files on ./commands and loads them
const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(file.split(".js")[0], command);
	if(command.alias){
		command.alias.forEach(alias => client.commands.set(alias, command))
	}
}

//Discord message event
client.on("message",msg=>{
	if(message.author.bot) return;

	var prefix = ">";

	if(message.content.startsWith(prefix)){			
		var param = message.content.split(" ");
		const commandName = param[0].toLowerCase();

		if (!client.commands.has(commandName)) return;
		if (!config.modRole || message.member.roles.has(config.modRole)) client.commands.get(commandName).execute(client, msg, param);
	}
})


//Event emitter for Twitter API
var stream = T.stream('statuses/sample')
 
stream.on('tweet', function (tweet) {
  console.log(tweet)
})

//Discord Bot login
client.login(config.discordToken)