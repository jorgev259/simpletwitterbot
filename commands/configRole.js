module.exports = {
    desc:"Sets the role that can use this bot. Usage: >configRole <role name>",
    execute(client, message, param){
        var roleName = param.slice(1);

        if(message.guild.roles.exists("name",roleName)){
        	fs.readFile("./config.json","utf8",(err,data)=>{
        		if(err) return message.channel.send(err);

        		var newConfig = JSON.parse(data);
        		var roleID = message.guild.roles.find("name",roleName).id;
        		newConfig.modRole = roleID;

        		fs.writeFile("./config.json", JSON.stringify(newConfig), 'utf8', err=>{
        			if(err) return message.channel.send(err);
        			message.channel.send(`Moderator Role changed to ${roleName}`)
        		});
        		require("./config.json").modRole = roleID;
        	})
        }else{
        	message.channel.send(`The role ${roleName} doesnt exist`)
        }
	}
}