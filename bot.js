const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "M";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('')
    console.log('')
    console.log('╔[════════════════════════════════════════════════════════════════]╗')
    console.log(`[Start] ${new Date()}`);
    console.log('╚[═════════════════════════════════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════════════════════════════]╗');
    console.log(`Logged i as * [ " ${client.user.username} " ]`);
    console.log('')
    console.log('Informatins :')
    console.log('')
    console.log(`servers! [ " ${client.guilds.size} " ]`);
    console.log(`Users! [ " ${client.users.size} " ]`);
    console.log(`channels! [ " ${client.channels.size} " ]`);
    console.log('╚[════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════]╗')
    console.log(' Bot Is Online')
    console.log('╚[════════════]╝')
    console.log('')
    console.log('')
  });

  client.on('message', message => {
    if(message.content.startsWith(prefix + 'id')) {
    var year = message.author.createdAt.getFullYear()
    var month = message.author.createdAt.getMonth()
    var day = message.author.createdAt.getDate()
    let args = message.content.split(' ').slice(1).join(' ');
    if (args == '') {
    var z = message.author;
    }else {
    var z = message.mentions.users.first();
    }
    
    let d = z.createdAt;
    let n = d.toLocaleString();
    let x;
    let y;
    
    if (z.presence.game !== null) {
    y = `${z.presence.game.name}`;
    } else {
    y = "Not Playing... |💤.";
    }
    if (z.bot) {
    var w = 'Bot';
    }else {
    var w = 'Person';
    }
   let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField('**🔱| Name:**',`**<@` + `${z.id}` + `>**`, true)
    .addField('**📠 | ID:**:', "**"+ `${z.id}` +"**",true)
    .addField('**🎮 | Game:**','**'+y+'**' , true)
    .addField('**🤖| Type:**',"**"+ w + "**",true)
    .addField('**📛| Tag:**',"**#" +  `${z.discriminator}**`,true)
    .addField('**📆| Joined discord at:** ' ,year + "-"+ month +"-"+ day)
    .addField("**⌚| Joined server at:**", message.member.joinedAt.toLocaleString())
    .setThumbnail(`${z.avatarURL}`)
    .setFooter(message.author.username, message.author.avatarURL)
    
    message.channel.send({embed});
    
    }
    
});

client.on('message', message => {
    if(message.content.startsWith(prefix + 'bc')) {
      if(!message.member.hasPermissions('ADMINISTRATOR')) return;
    let args = message.content.split(' ').slice(1).join(' ');
    message.channel.send(`**:ballot_box_with_check: Sent.**`).then(m => m.delete(5000));
    message.guild.members.forEach(m => {
    m.send(`${args}\n${m}`);
    if(message.attachments.first()){
   m.sendFile(message.attachments.first().url).catch();
    }
    message.delete();
    })
    }
});


client.on('message', message => {
    if(message.channel.type === 'dm') return;
    let vanieeeeet = 'M';
    if(message.content.startsWith(vanieeeeet + 'clear')) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            let embed = new Discord.RichEmbed()
                .setTitle("**Clear operation.**")
                .setDescription("**Cancel. ❎\nClear Chat.✅**")
                .setColor("RANDOM");
                message.channel.sendEmbed(embed)
                .then(msg => {
                    msg.react('✅')
                    msg.react('❎')
 
 
                            let canceloperation = (reacting, man) => reacting.emoji.name === '❎' && man.id === message.author.id;
                            let doOperation = (reacting, man) => reacting.emoji.name === '✅' && man.id === message.author.id;
 
 
                            let cleard = msg.createReactionCollector(doOperation, { time: 10000 });
                            let canceled = msg.createReactionCollector(canceloperation, { time: 10000 });
 
                canceled.on('collect', v => {
                    msg.delete()
                    .then(message.channel.send('**Operation has been canceled successfully. ✅**'))
                        .then(m => {
                            m.delete(5000);
                        });
                });
 
                cleard.on('collect', v => {
                    message.channel.fetchMessages()
                        .then(sce => {
                            message.channel.bulkDelete(sce)
                                .then(message.channel.send('**Chat has been successfully cleard. :white_check_mark:**'))
                                    .then(art => {
                                        art.delete(5000);
                                    });
                        });
                });
                   
                })
        } else {
            return;
        }
    }
});



client.on('message', msg => {
    if(msg.content.startsWith (prefix + 'server')) {
      if(!msg.channel.guild) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .addField(':globe_with_meridians: **Name : **' , `**[ ${msg.guild.name} ]**`,true)
      .addField(':earth_africa: ** Region:**',`**[ ${msg.guild.region} ]**`,true)
      .addField(':military_medal:** Roles :**',`**[ ${msg.guild.roles.size} ]**`,true)
      .addField(':bust_in_silhouette:** Members :**',`**[ ${msg.guild.memberCount} ]**`,true)
      .addField(':white_check_mark:** Online :**',`**[ ${msg.guild.members.filter(m=>m.presence.status == 'online').size} ]**`,true)
      .addField(':pencil:** TextChannels :**',`**[ ${msg.guild.channels.filter(m => m.type === 'text').size} ]**`,true)
      .addField(':loud_sound:** VoiceChannels :**',`**[ ${msg.guild.channels.filter(m => m.type === 'voice').size} ]**`,true)
      .addField(':crown:** Owner :**',`**[ ${msg.guild.owner} ]**`,true)
      .addField(':id:** ID :**',`**[ ${msg.guild.id} ]**`,true)
      .addField(':date:** Created At : **',msg.guild.createdAt.toLocaleString())
      .addField(':sleeping:**AFKChannel :**',`**${msg.guild.afkChannel || 'None'}**`, true)
      .addField(':upside_down:** Emojis :**', `**${msg.guild.emojis.size}** \`[\` **${msg.guild.emojis.map(m => m).join('**|**')} \`]\`**`, true);
      msg.channel.send({embed:embed});
    }
  });

client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  if (message.mentions.users.size < 1) return message.reply("**Please mention someone.**");
  if(!reason) return message.reply ("**Please provide a reason.**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**This User Is Have High Role**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});
  client.on('message', message => {
    if (message.author.omar) return;
    if (!message.content.startsWith(prefix)) return;
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    var args = message.content.split(" ").slice(1);
    if (command == "ban") {
     if(!message.channel.guild) return message.reply('** This command only for servers**');
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**لايوجد لديك ` BAN_MEMBERS ` صلاحية**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**ليس لدي صلاحيات لتبنيد العضو **");
  var user = message.mentions.users.first();
    var reason = message.content.split(" ").slice(2).join(" ");
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if(!reason) return message.reply ("**اكتب سبب الطرد**");
    if (!message.guild.member(user).banable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");
    const banembed = new Discord.RichEmbed()
    .setAuthor(`BAN!`, user.displayAvatarURL)
    .setColor("RANDOM")
    .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
    .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
    .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
    user.send(reason).then(()=>{
  message.guild.member(user).kick();
    })
  }
  });

  client.on('message', async message => {
      let args = message.content.split(" ");
      if(message.content.startsWith(prefix + "mute")) {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('').then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });
     
        if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.channel.send('').then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });
     
        let mention = message.mentions.members.first();
        if(!mention) return  message.channel.send('').then(msg => { 
          msg.delete(3500);
          message.delete(3500);
        });
     
        if(mention.id === message.author.id) return message.channel.send('**:x:You Cannot give mute to your self**').then(msg => {
          msg.delete(3500);
          message.delete(3500); 
        });
       
        if(mention.hasPermission('ADMINISTRATOR')) return message.channel.send(`**:x: لا يمكن آعطاء ميوت لادارة السيرفر**`); 
     
        if(message.guild.member(mention).roles.find('name', 'Muted')) return message.channel.send(`**:information_source: ${mention.user.username} Already Muted**`);
     
       
        if(mention.position >= message.guild.member(message.author).positon) return message.channel.send('You Donot Have Permission **Muted_Members** ').then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });
       
        if(mention.positon >= message.guild.member(client.user).positon) return message.channel.send('I Donot Have Permission **Muted_Members**').then(msg => {
          msg.delete(3500);
          message.delete(3500); 
        });
       
        let duration = args[2];
        if(!duration) message.channel.send(`**:hash: You Can Use ${prefix}mute @user Time Reason**`).then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });
     
        if(isNaN(duration))  message.channel.send('').then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });
     
        let reason = message.content.split(" ").slice(3).join(" ");
        if(!reason) reason = " [ **لم يذكر لماذا** ] ";
     
        let thisEmbed = new Discord.RichEmbed()
        .setAuthor(mention.user.username, mention.user.avatarURL)
        .setTitle('**تم آعطائك ميوت**')
        .addField('**__السيرفر__**',[ message.guild.name ]) 
        .addField('**__تم آعطائك ميوت بواسطة__**', [ message.author ])
        .addField('**__آلسبب__**',reason)
        .addField('**__وقت الميوت__**',duration)
     
        let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
        if(!role) try {
          message.guild.createRole({
            name: "Muted",
            permissions: 0 
          }).then(r => {
            message.guild.channels.forEach(c => {
              c.overwritePermissions(r , {
                SEND_MESSAGES: false, 
                READ_MESSAGES_HISTORY: false,
                ADD_REACTIONS: false
              });
            });
          }); 
        } catch(e) {
          console.log(e.stack);
        }
        mention.addRole(role).then(() => {
          mention.send(thisEmbed);
          message.channel.send(`**:white_check_mark: ${mention.user.username}  Muted! :zipper_mouth:  **  `);
          mention.setMute(true); 
        });
        setTimeout(() => {
          if(duration === 0) return;
          mention.setMute(false);
          mention.removeRole(role)
        },duration * 60000); 
      }
    });




client.on('message', message => {
        if (message.author.id === client.user.id) return;
                if (message.content.startsWith(prefix + "ping")) {
            message.channel.sendMessage(':ping_pong: Pong! In `' + `${client.ping}` + ' ms`');
        }
    });

client.on('message', message => {
        if (!message.content.startsWith(prefix)) return;
        var args = message.content.split(' ').slice(1);
        var argresult = args.join(' ');
        if (message.author.id !== "410778583682777098") return;
    
    
        if (message.content.startsWith(prefix + 'setwatch')) {
        client.user.setActivity(argresult, {type: 'WATCHING'})
           console.log('test' + argresult);
          message.channel.sendMessage(`Watching Now: **${argresult}**`)
      }
    
    
        if (message.content.startsWith(prefix + 'setlis')) {
        client.user.setActivity(argresult, {type: 'LISTENING'})
           console.log('test' + argresult);
          message.channel.sendMessage(`LISTENING Now: **${argresult}**`)
      }
    
    
      if (message.content.startsWith(prefix + 'setname')) {
        client.user.setUsername(argresult).then
            message.channel.sendMessage(`Username Changed To **${argresult}**`)
        return message.reply(".");
      }
    
      if (message.content.startsWith(prefix + 'setavatar')) {
        client.user.setAvatar(argresult);
         message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
      }
    
      if (message.content.startsWith(prefix + 'setstream')) {
        client.user.setGame(argresult, "https://www.twitch.tv/9ivv");
           console.log('test' + argresult);
          message.channel.sendMessage(`Streaming: **${argresult}**`)
      }
      if (message.content.startsWith(prefix + 'setplay')) {
        client.user.setGame(argresult);
           console.log('test' + argresult);
          message.channel.sendMessage(`Playing: **${argresult}**`)
      }
    
     });
     client.on('message', message => {
      if (!message.content.startsWith(prefix)) return;
      var args = message.content.split(' ').slice(1);
      var argresult = args.join(' ');
      if (message.author.id !== "447727056617340928") return;
  
  
      if (message.content.startsWith(prefix + 'setwatch')) {
      client.user.setActivity(argresult, {type: 'WATCHING'})
         console.log('test' + argresult);
        message.channel.sendMessage(`Watching Now: **${argresult}**`)
    }
  
  
      if (message.content.startsWith(prefix + 'setlis')) {
      client.user.setActivity(argresult, {type: 'LISTENING'})
         console.log('test' + argresult);
        message.channel.sendMessage(`LISTENING Now: **${argresult}**`)
    }
  
  
    if (message.content.startsWith(prefix + 'setname')) {
      client.user.setUsername(argresult).then
          message.channel.sendMessage(`Username Changed To **${argresult}**`)
      return message.reply(".");
    }
  
    if (message.content.startsWith(prefix + 'setavatar')) {
      client.user.setAvatar(argresult);
       message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
    }
  
    if (message.content.startsWith(prefix + 'setstream')) {
      client.user.setGame(argresult, "https://www.twitch.tv/9ivv");
         console.log('test' + argresult);
        message.channel.sendMessage(`Streaming: **${argresult}**`)
    }
    if (message.content.startsWith(prefix + 'setplay')) {
      client.user.setGame(argresult);
         console.log('test' + argresult);
        message.channel.sendMessage(`Playing: **${argresult}**`)
    }
  
   });
   client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.split(' ').slice(1);
    var argresult = args.join(' ');
    if (message.author.id !== "460721831284965376") return;


    if (message.content.startsWith(prefix + 'setwatch')) {
    client.user.setActivity(argresult, {type: 'WATCHING'})
       console.log('test' + argresult);
      message.channel.sendMessage(`Watching Now: **${argresult}**`)
  }


    if (message.content.startsWith(prefix + 'setlis')) {
    client.user.setActivity(argresult, {type: 'LISTENING'})
       console.log('test' + argresult);
      message.channel.sendMessage(`LISTENING Now: **${argresult}**`)
  }


  if (message.content.startsWith(prefix + 'setname')) {
    client.user.setUsername(argresult).then
        message.channel.sendMessage(`Username Changed To **${argresult}**`)
    return message.reply(".");
  }

  if (message.content.startsWith(prefix + 'setavatar')) {
    client.user.setAvatar(argresult);
     message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
  }

  if (message.content.startsWith(prefix + 'setstream')) {
    client.user.setGame(argresult, "https://www.twitch.tv/9ivv");
       console.log('test' + argresult);
      message.channel.sendMessage(`Streaming: **${argresult}**`)
  }
  if (message.content.startsWith(prefix + 'setplay')) {
    client.user.setGame(argresult);
       console.log('test' + argresult);
      message.channel.sendMessage(`Playing: **${argresult}**`)
  }

 });

client.on('message', message => {
        if (message.content.startsWith(prefix + "help")) {
 let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.addField('     **Mbc** ' ,' **رسالة لكل الاعضآء** ')
.addField('     **Mping** ' ,' ** سرعة اتصال البوت**')
.addField('     **Mclear ** ' ,' ** لمسح الشات ** ')
.addField('     **Mban** ' ,' **تبنيد العضو** ')
.addField('     **Mmute** ' ,' **عمل ميوت كتابي للعضو** ')
.addField('     **Munmute** ' ,' **فك الميوت عن العضو** ')
.addField('     **Mkick** ' ,' **طرد العضو** ')
.setColor('#7d2dbe');
message.author.sendEmbed(embed) .then(
    message.channel.send('**Sent, Check Your DM. :white_check_mark:**')
)
}
});


client.login(process.env.BOT_TOKEN);
