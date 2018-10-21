const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "M";


const moment = require("moment")
client.on("guildMemberAdd", m => {
        let room = m.guild.channels.find(a => a.name === 'text');
    if (datediff(parseDate(moment(m.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 8) {
        m.ban() .then((
            room.send(`**:no_entry: | ${m} Has been banned for: \`fake\`**`)
        ));
    };
    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0]-1, mdy[1]);
    };
    
    function datediff(first, second) {
        return Math.round((second-first)/(1000*60*60*24));
    };
});

client.on('message', message => {
    if(message.content.startsWith(prefix + 'new')) {
        let args = message.content.split(' ').slice(1).join(' ');
        let support = message.guild.roles.find("name","Support Team");
        let ticketsStation = message.guild.channels.find("name", "TICKETS");
        if(!args) {
            return message.channel.send('**Please type a subject for the ticket. :x:**');
        };
                if(!support) {
                    return message.channel.send('**Please make sure that `Support Team` role exists and it\'s not duplicated.**');
                };
            if(!ticketsStation) {
                message.guild.createChannel("TICKETS", "category");
            };
                message.guild.createChannel(`ticket-${message.author.username}`, "text").then(ticket => {
                    message.delete()
                        message.channel.send(`**Your ticket has been created. :white_check_mark: [ ${ticket} ]**`);
                    ticket.setParent(ticketsStation);
                    ticketsStation.setPosition(1);
                        ticket.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                            ticket.overwritePermissions(support.id, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                                ticket.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                    let embed = new Discord.RichEmbed()
                                .setTitle('**New Ticket.**')
                                .setColor("RANDOM")
                                .setThumbnail(`${message.author.avatarURL}`)
                                .addField('Subject', args)
                                .addField('Author', message.author)
                                .addField('Channel', `<#${message.channel.id}>`);

                                ticket.sendEmbed(embed);
                }) .catch();
    }
    if(message.content.startsWith(prefix + 'close')) {
            if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!message.channel.name.startsWith("ticket")) {
            return;
        };  
                let embed = new Discord.RichEmbed()
                    .setAuthor("Do you really want to close this ticket? Repeat the command to make sure. You have 20 seconds.")
                    .setColor("RANDOM");
                    message.channel.sendEmbed(embed) .then(codes => {

                    
                        const filter = msg => msg.content.startsWith(prefix + 'close');
                        message.channel.awaitMessages(response => response.content === prefix + 'close', {
                            max: 1,
                            time: 20000,
                            errors: ['time']
                        })
                        .then((collect) => {
                            message.channel.delete();
                        }) .catch(() => {
                            codes.delete()
                                .then(message.channel.send('**Operation has been cancelled.**')) .then((c) => {
                                    c.delete(4000);
                                })
                                    
                            
                        })


                    })


            
    }
});


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

  client.on('message', async message =>{
  if (message.author.boss) return;

if (!message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	 command = command.slice(prefix.length);
	let args = message.content.split(" ").slice(1);
	if (command == "mute") {
		if (!message.channel.guild) return;
		if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("انت لا تملك صلاحيات !! ").then(msg => msg.delete(5000));
		if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("البوت لايملك صلاحيات ").then(msg => msg.delete(5000));;
		let user = message.mentions.users.first();
		let muteRole = message.guild.roles.find("name", "Muted");
		if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {msg.delete(5000)});
		if (message.mentions.users.size < 1) return message.reply('** يجب عليك المنشن اولاً **').then(msg => {msg.delete(5000)});
		let reason = message.content.split(" ").slice(2).join(" ");
		message.guild.member(user).addRole(muteRole);
		const muteembed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setThumbnail(user.displayAvatarURL)
		.addField("**:busts_in_silhouette:  المستخدم**",  '**[ ' + `${user.tag}` + ' ]**',true)
		.addField("**:hammer:  تم بواسطة **", '**[ ' + `${message.author.tag}` + ' ]**',true)
		.addField("**:book:  السبب**", '**[ ' + `${reason}` + ' ]**',true)
		.addField("User", user, true)
		message.channel.send({embed : muteembed});
		var muteembeddm = new Discord.RichEmbed()
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setDescription(`      
${user} انت معاقب بميوت كتابي بسبب مخالفة القوانين
${message.author.tag} تمت معاقبتك بواسطة
[ ${reason} ] : السبب
اذا كانت العقوبة عن طريق الخطأ تكلم مع المسؤلين
`)
		.setFooter(`في سيرفر : ${message.guild.name}`)
		.setColor("RANDOM")
	user.send( muteembeddm);
  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("**ما عندي برمشن**").then(msg => msg.delete(6000))

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");

  let role = message.guild.roles.find (r => r.name === "Muted");
  
  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")

  await toMute.removeRole(role)
  message.channel.sendMessage("**لقد تم فك الميوت عن شخص بنجاح**:white_check_mark:");

  return;

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
 .addField('     **Mnew** ' ,' **لفتح تيكت** ')
 .addField('     **Mclose** ' ,' **لاغلاق التيكت** ')

 .setFooter(message.author.username, message.author.avatarURL)
.setColor('#7d2dbe')
message.author.sendEmbed({embed}) .then(
    message.channel.send('**Sent, Check Your DM. :white_check_mark:**')
)
}
});


client.login(process.env.BOT_TOKEN);
