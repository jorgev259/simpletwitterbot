var config = require("./config.json");

var twit = require('twit') 
var t = new twit({
  consumer_key:         config.consumerKey,
  consumer_secret:      config.consumerSecret,
  access_token:         config.accessToken,
  access_token_secret:  config.accessTokenSecret
})

module.exports = {
    desc:"Makes the bot app follow an specific twitter account. Usage >link <display_name>",
    execute(client, message, param){
        t.post("friendships/create", {screen_name: param.slice(1) }).catch(err=>{
        	console.log(err);
        	message.channel.send(err.stack, {code:"xl",split:true});
        }).then(result=>{
        	console.log(result);
        	message.channel.send(`Now following ${param.slice(1}!`)
        })
	}
}