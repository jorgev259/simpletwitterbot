var fs = require("fs");
var path = require("path");

module.exports = {
    desc:"Reloads the command. Usage >reload <command name>",
    execute(client, message, param){        
        if(param[1]){   
            var commandName = param[1].toLowerCase();       
            var modulePath = `./commands/${commandName}.js`;
            if(client.commands.has(commandName) || fs.existsSync(modulePath)){
                delete require.cache[require.resolve(modulePath)];

                client.commands.set(commandName, require(modulePath));
                message.channel.send(`Reloaded ${commandName}!`);
            }
        }   
    }
}