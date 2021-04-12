
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone") 
const fs = require("fs")
const util = require('util')
const crypto = require('crypto')
const imageToBase64 = require('image-to-base64')
const axios = require('axios')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./lib/help')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const speed = require('performance-now')
const imgbb = require('imgbb-uploader');
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const antilink = JSON.parse(fs.readFileSync('./src/simi.json'))
			// API KEY
			const apiKey = 'PmPuNA4yCZa3iuBGs5Nw' // get in https://mhankbarbar.tech/api
			const tobzkey = 'BotWeA'// GET IN https://tobz-api.herokuapp.com/api
			const vhtearkey = 'c1d162b46e634f389efa1ac715f03d03'// GET IN https://api.vhtear.com/
			const zekskey = 'apivinz' //GET IN https://api.zeks.xyz
			const nflkey = '0LeVii-SNjD2G-QBls0v'
			const xtkey = '58a7334f7c2c0d93' //GET IN https://api.xteam.xyz
			const techkey = 'APIKEY' //GET IN https://api.i-tech.id
			const lolkey = '847de7716f17a51eeba4235c' //GET IN https://lolhuman.herokuapp.com
			
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Levia☆tan\n'
            + 'ORG:KuRoSELF\n'
            + 'TEL;type=CELL;type=VOICE;waid=6281918532071:+62 819-1853-2071\n'
            + 'END:VCARD'
prefix = '.'
blocked = []            
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const bulan = arrayBulan[moment().format('MM') - 1]


function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}H ${pad(minutes)}Min ${pad(seconds)}Sec`
}
        function monospace(string) {
            return '```' + string + '```'
        }




const { exec } = require("child_process")

const hafizh = new WAConnection()

hafizh.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready`)
})

hafizh.on('credentials-updated', () => {
   const authInfo = hafizh.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && hafizh.loadAuthInfo('./session.json')

hafizh.connect();

// hafizh.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@kingg_squard028`)

hafizh.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await hafizh.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await hafizh.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*YO🤚* @${num.split('@')[0]}\n*welcome to group* *${mdata.subject}*\n___________________________\n  │Intro yah 🔪😋 \n  ├─ ❏  Nama : \n  ├─ ❏  Umur : \n  ├─ ❏  Askot : \n  ├─ ❏  Gender : \n  │ 𝐒𝐚𝐯𝐞 𝐍𝐨𝐦𝐨𝐫 𝐀𝐃𝐌𝐈𝐍! \n *___________________________*\n_baca desc dulu kalo gk suka out aja🚮_`
				let buff = await getBuffer(ppimg)
				hafizh.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await hafizh.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `alfatihah buat @${num.split('@')[0]} `
				let buff = await getBuffer(ppimg)
				hafizh.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	hafizh.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	hafizh.on('message-new', async (tod) => {
		try {
			if (!tod.message) return
			if (tod.key && tod.key.remoteJid == 'status@broadcast') return
			if (!tod.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(tod.message)
			const from = tod.key.remoteJid
			const type = Object.keys(tod.message)[0]
			
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && tod.message.conversation.startsWith(prefix)) ? tod.message.conversation : (type == 'imageMessage') && tod.message.imageMessage.caption.startsWith(prefix) ? tod.message.imageMessage.caption : (type == 'videoMessage') && tod.message.videoMessage.caption.startsWith(prefix) ? tod.message.videoMessage.caption : (type == 'extendedTextMessage') && tod.message.extendedTextMessage.text.startsWith(prefix) ? tod.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? tod.message.conversation : (type === 'extendedTextMessage') ? tod.message.extendedTextMessage.text : ''
			const mesejAnti = body.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
      const is = budy.slice(0).trim().split(/ +/).shift().toLowerCase()

			mess = {
				wait: 'wait',
				success: '️succes',
				error: {
					stick: 'error',
					Iv: 'Link invalid'
				},
				only: {
					group: 'only gc',
					ownerG: 'only owner gc',
					ownerB: 'only owner bot',
					admin: 'only admin gc',
					Badmin: 'bukan admin🚮'
				}
			}
			const botNumber = hafizh.user.jid
			const ownerNumber = ["6281918532071@s.whatsapp.net"] // ganti nomer lu
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? tod.participant : tod.key.remoteJid
			const totalchat = await hafizh.chats.all()
			const groupMetadata = isGroup ? await hafizh.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				hafizh.sendMessage(from, teks, text, {quoted:tod})
			}
			const sendMess = (hehe, teks) => {
				hafizh.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? hafizh.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : hafizh.sendMessage(from, teks.trim(), extendedText, {quoted: tod, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'help': 
				case 'menu':
					    d = new Date
    locale = 'id'
    gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    week = d.toLocaleDateString(locale, { weekday: 'long' })
    date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
					uptime = process.uptime()
					hafizh.sendMessage(from, `${monospace(help(prefix, kyun, uptime, time, weton, week, date))}`, text)
					break
				case 'info':
					me = hafizh.user
					uptime = process.uptime()
					teks = `*Nama Bot* : KuRoSELF\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Link* : wa.me/+6281918532071\n*Prefix* : ${prefix}\n*Blocked* : ${blocked.length}\n*Runtime* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					hafizh.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
					case 'runtime':
    						runtime = process.uptime()
						teks = `${monospace(`Runtime:\n◪ ${kyun(runtime)}`)}`
						hafizh.sendMessage(from, `${teks}`, MessageType.text, {quoted: tod})
    						break
			case 'readall':
					var chats = await hafizh.chats.all()
                    chats.map( async ({ jid }) => {
                          await hafizh.chatRead(jid)
                    })
					teks = `\`\`\`Berhasil membaca ${chats.length} Chat !\`\`\``
					await hafizh.sendMessage(from, teks, MessageType.text, {quoted: tod})
					console.log(chats.length)
					break
				case 'blocklist': 
					teks = '*BLOCK LIST  :*\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `*Total :* ${blocked.length}`
					hafizh.sendMessage(from, teks.trim(), extendedText, {quoted: tod, contextInfo: {"mentionedJid": blocked}})
					break
		case 'speed':
    case 'ping':
                const timestamp = speed();
                const latensi = speed() - timestamp 
                hafizh.sendMessage(from, `Speed: ${latensi.toFixed(4)} _ms_`, text, { quoted: tod})
                    break
				case 'stiker': 
				case 'sticker':
				case 's':
					if ((isMedia && !tod.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						const media = await hafizh.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								hafizh.sendMessage(from, buff, sticker, {quoted: tod})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && tod.message.videoMessage.seconds < 11 || isQuotedVideo && tod.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						const media = await hafizh.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`𝗴𝗮𝗴𝗮𝗹, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								hafizh.sendMessage(from, buff, sticker, {quoted: tod})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						const media = await hafizh.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('gagal,ulangi lagi')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								hafizh.sendMessage(from, buff, sticker, {quoted: tod})
							})
						})					
					} else {
						reply(`_kirim gambar dengan caption ${prefix}sticker,atau reply/tag gambar_`)
					}
					break
				case 'hiden':
					hafizh.sendMessage(from, '         『 MENU KuRoSELF 』\n\n◪ HIDEN\n	│\n	├─ ❏ .nhentaipdf\n	├─ ❏ .randomhentong\n	├─ ❏ .loli\n	├─ ❏ .nsfwloli\n	└─ ❏ .nsfwgif\n', text, {quoted: tod})
					break
				case 'jadwalanime':
				const jadwal =[`\nSENIN\n°Vivy Fluorit Eye's Song『00.30』\n°Yuukoku no Moriarty S2 『00.15』\n°Dragon,Ie wo Kau 『00.15』\n°Sentouin,Hakenshimasu 『00.15』\n°Seven knight revolutions eiyuu no keishousha 『01.00』\n°Sayonara Watashi no Cramer 『00.15』\n____________________________\nSELASA\n°Koi to Yobu ni wa Kimochi Warui 『00.30』\n°Mars Red 『02.00』\n°Fruits Basket S3 『01.30』\n____________________________\nRABU\n°Nanatsu no Taizai Season 4 『21.30』\n°Kyuukyoku Shinka shita Full Dive RPG 『22.30』\n°Tensura Nikki 『00.30』\n°Seijo no maryoku wa bannou desu 『00.30』\n____________________________\nKAMIS\n°Jouran:the Princess of Snow and Blood 『01.00』\n°Super Cub 『00.30』\n____________________________\nJUM'AT\n°Godzila Singular Pionts 『05.00』\n°Shaman King 『01.00』\n°Isekai Maou to Shoukan Shoujo S2 『01.30』\n°ZombieLand Saga S2 『00.30』\n____________________________\nSABTU\n°Boku no Hero Academia Season 5 『17.30』\n°Mashiro no Oto 『02.30』\n°SSSS.Dynazenon 『00.30』\n°Shakunetsu Kabaddi 『01.30』\n____________________________\nMINGGU\n°One Piece 『10.00』\n°Boruto:Naruto next Generations 『17.00』\n°Slime Taoshite 300-Nen 『00.30』\n____________________________\nRANDOM\n°- 『-』\n____________________________\nLink grup Anime Ongoing\nhttps://chat.whatsapp.com/IMKxDcSDQY5HZZDwuqmnwG\n`]

					srn = await getBuffer(`https://i.ibb.co/wJy5Dvb/4305f46704e3.jpg`)

					hafizh.sendMessage(from, srn, image, { quoted: tod, caption: '*JADWAL ANIME ONGOING*\n'+ jadwal })
					break
				case 'delete':
				case 'dell':
				case 'dellete':
					hafizh.deleteMessage(from, { id: tod.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
				case 'gtts':	
				case 'tts':
					if (args.length < 1) return hafizh.sendMessage(from, 'diperlukan kode bahasa', text, {quoted: tod})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return hafizh.sendMessage(from, 'teks nya apa?', text, {quoted: tod})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 300
					? reply('kepanjangan>_<')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('gagal,ulangi lagi')
							hafizh.sendMessage(from, buff, audio, {quoted: tod, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'setprefix':
					if (args.length < 1) return
					prefix = args[0]
					reply(`Prefix berhasih di ubah menjadi : ${prefix}`)
					break 	
			       case 'pussy':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/pussy', {method: 'get'})
					if (anu.error) return reply(anu.error)

					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						hafizh.sendMessage(from, buffer, sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break
            case 'nsfwgif':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/nsfw_neko_gif', {method: 'get'})
					if (anu.error) return reply(anu.error)

					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						hafizh.sendMessage(from, buffer, sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break
            case 'kiss':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/kiss', {method: 'get'})
					if (anu.error) return reply(anu.error)

					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						hafizh.sendMessage(from, buffer, sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break	
				case 'meme': 
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: '.......'})
					break
			case 'loli': 
				    try {
						res = await fetchJson(`https://api.lolis.life/random`, {method: 'get'})
						buffer = await getBuffer(res.url)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'ingat! Cintai lolimu'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('EROR')
					}
					break
				case 'nsfwloli': 
				    try {
						if (!isNsfw) return reply('Maaf fitur belum di aktifkan')
						res = await fetchJson(`https://api.lolis.life/random?nsfw=true`, {method: 'get'})
						buffer = await getBuffer(res.url)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'succes'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('ERROR')
					}
					break
				
				case 'terbalik':
					if (args.length < 1) return reply('teks nya apa?')
					meki = await fetchJson(`https://videfikri.com/api/hurufterbalik/?query=${body.slice(10)}`)
					hafizh.sendMessage(from, `Input: ${body.slice(10)}\nOutput: ${meki.result.kata}`, MessageType.text, {quoted: tod})
					break
				case 'huruf':
					if (args.length < 1) return reply('teks nya apa?')
					meki = await fetchJson(`https://videfikri.com/api/jumlahhuruf/?query=${body.slice(7)}`)
					client.sendMessage(from, `Input: ${body.slice(7)}\nJumlah Huruf: ${meki.result.jumlah}`, MessageType.text, {quoted: tod})
					break
				case 'yt': 
					if (args.length < 1) return reply('url nya mana?')
					if(!isUrl(args[0]) && !args[0].includes('youtube.com')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/ytmp4?url=${body.slice(7)}&apikey=syahri2k21`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					hafizh.sendMessage(from, thumb, image, {quoted: tod, caption: teks})
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: tod})
					break
				case 'ytsearch': 
					if (args.length < 1) return reply('teks nya apa?')
					anu = await fetchJson(`https://zekais-api.herokuapp.com/yts?query=${body.slice(10)}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result) {
						teks += `*Title* : ${i.title}\n*Id* : ${i.id}\n*Published* : ${i.publishTime}\n*Duration* : ${i.duration}\n*Views* : ${h2k(i.views)}\n=================\n`
					}
					reply(teks.trim())
					break
				case 'ytmp3':
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/ytmp3?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					hafizh.sendMessage(from, thumb, image, {quoted: tod, caption: teks})
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, audio, ytmp3, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: tod})
					break
			case 'joox':
					data = await fetchJson(`https://api.lolhuman.xyz/api/joox?q=${body.slice(6)}&apikey=${lolkey}`, {method: 'get'})
					teks = '=================\n'
					const joox = data.result
						teks += `Judul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}\n*Filesize* : ${data.filesize}\n=================\n`
					thumb = await getBuffer(joox.thumb)
					hafizh.sendMessage(from, thumb, image, {quoted: tod, caption: teks})
					buffer = await getBuffer(joox.mp3)
					hafizh.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${joox.title}.mp3`, quoted: tod})
					break
			case 'play':
					data = await fetchJson(`https://api.lolhuman.xyz/api/youtubeplay?query=${body.slice(6)}&apikey=${lolkey}`, {method: 'get'})
					teks = '=================\n'
					const play = data.result
						teks += `*Judul:* ${play.title}\n*Durasi:* ${play.duration}\n*size*: ${play.size}\n*Download sendiri:* ${play.mp3}\n=================\n`
					thumb = await getBuffer(play.image)
					hafizh.sendMessage(from, thumb, image, {quoted: tod, caption: teks})
					buffer = await getBuffer(play.mp3)
					hafizh.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${play.title}.mp3`, quoted: tod})
					break
				case 'lirik':
					lrk = body.slice(7)
					anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${lrk}`, {method: 'get'})
					reply('Lirik dari lagu '+lrk+' adalah :\n\n'+anu.result.lirik)
					break
				case 'translate':
				case 'terjemah':
					aruga = body.slice(10)
					lang = aruga.split("|")[0];
					teksnya = aruga.split("|")[1];
					if (args.length < 1) return reply(`kode bahasanya mana?`)
					if (args.length < 2) return reply(`teksnya mana kak?`)
					anu = await fetchJson(`https://arugaz.my.id/api/edu/translate?lang=${lang}&text=${teksnya}`, {method: 'get'})
					arteks = `◪ *TRANSLATE* \n  │\n  ├❑ Text : ${teksnya} \n  ├❑ Translate : ${anu.text} \n  └❑ *Pronunciation* : ${anu.pronunciation}`
					hafizh.sendMessage(from, arteks, text)
					break
				case 'url2img': 
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('tipe nya apa?')
					if (!tipelist.includes(args[0])) return reply('Tipe dekstop|tablet|mobile')
					if (args.length < 2) return reply('url nya mana?')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${apikey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					hafizh.sendMessage(from, buff, image, {quoted: tod})
					break
				case 'tourl':
            var imgbb = require('imgbb-uploader')
           if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
           ger = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
           reply(mess.wait)
         owgi = await hafizh.downloadAndSaveMediaMessage(ger)
           anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
        teks = `${anu.display_url}`
reply(teks)
}
break
				case 'img2url':          
                    var imgbb = require('imgbb-uploader')
                    var encmedia  = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
                    var media = await  hafizh.downloadAndSaveMediaMessage(encmedia)       
                    imgbb('acf1ad5f22ad5822dc163cce74aedfd4', media)
                   .then(data => {
                    var caps = `*「 _IMAGE TO URL_ 」*\n\n*→  ID :* ${data.id}\n*→  MimeType :* ${data.image.mime}\n*→  Extension :* ${data.image.extension}\n*→  URL :* ${data.display_url}`
                    ibb = fs.readFileSync(media)
                     hafizh.sendMessage(from, ibb, image, { quoted: reply, caption: caps })
                })
                .catch(err => {
                    throw err
                })
                    break
					case 'getses':
                const ses = await hafizh.getSnapshot()
                await hafizh.sendMessage(from, ses, image, {quoted: tod})
            break
					case 'ttp':
					if (args.length < 1) return reply('teks nya apa?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					ppt = body.slice(4).trim()
					anu = await fetchJson(`https://xteam.xyz/attp?file&text=${ppt}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						hafizh.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break
				case 'attp':
					if (args.length < 1) return reply(`Teks Nya Mana?`)
					tet = body.slice(4).trim()
					atetepe = await getBuffer(`https://api.xteam.xyz/attp?file&text=${tet}`)
					hafizh.sendMessage(from, atetepe, sticker, { quoted: tod })
					break
				case 'tsticker': 
					if (args.length < 1) return reply('teks nya apa?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(9).trim()
					anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${apikey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						hafizh.sendMessage(from, buffer, sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break
				case 'tagall':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `➸ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
				case 'clearall':
					anu = await hafizh.chats.all()
					hafizh.setMaxListeners(25)
					for (let _ of anu) {
						hafizh.deleteChat(_.jid)
					}
					reply('cleared')
					break
			       case 'block':
					hafizh.blockUser (`${body.slice(7)}@c.us`, "add")
					hafizh.sendMessage(from, `memblokir ${body.slice(7)}@c.us`, text)
					break
                    case 'unblock':
				    hafizh.blockUser (`${body.slice(9)}@c.us`, "remove")
					hafizh.sendMessage(from, `membuka block ${body.slice(9)}@c.us`, text)
				break
				case 'leave': 
				if (!isGroup) return reply(mess.only.group)
				setTimeout( () => {
                      hafizh.groupLeave (from) 
                      }, 2000)
                      setTimeout( () => {
                      hafizh.updatePresence(from, Presence.composing) 
                      hafizh.sendMessage(from, 'sarabada...', text)
                      }, 0)
                      break						
			       	case 'setpp': 
                       media = await hafizh.downloadAndSaveMediaMessage(tod)
                         await hafizh.updateProfilePicture (from, media)
                        reply('Berhasil mengganti ikon grup')
                                        break	
                                        
				case 'add':
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)		
					if (args.length < 1) return reply('mau nambahin siapa?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						hafizh.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan,di privasi')
					}
					break
					case 'grup':
					case 'group':
					if (args[0] === 'buka') {
					    reply(`opened`)
						hafizh.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`closed`)
						hafizh.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
                    
            case 'admin':
            case 'owner':
            case 'creator':
                  hafizh.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: tod})
       hafizh.sendMessage(from, 'wa.me/+6281918532071',MessageType.text, { quoted: tod} )
           break    
           case 'demote':
					if (tod.message.extendedTextMessage === undefined || tod.message.extendedTextMessage === null) return reply('tag target yang mau di copot!')
					mentioned = tod.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `jabatan kamu sudah di copot :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						hafizh.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} jabatan anda sebagai admin grup telah di copot`, mentioned, true)
						hafizh.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
					if (tod.message.extendedTextMessage === undefined || tod.message.extendedTextMessage === null) return reply('tag target yang mau di promote!')
					mentioned = tod.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `anda telah menjadi admin grup:\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						hafizh.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`anda telah menjadi admin grup @${mentioned[0].split('@')[0]}`, mentioned, true)
						hafizh.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'kick':
					if (tod.message.extendedTextMessage === undefined || tod.message.extendedTextMessage === null) return reply('tag yang mau di kick')
					mentioned = tod.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `anda akan di kick :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						hafizh.groupRemove(from, mentioned)
					} else {
						mentions(`anda akan di kick @${mentioned[0].split('@')[0]} 🚮`, mentioned, true)
						hafizh.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
					teks = `List admin grup *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'pinterest':
					hafizh.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
					reply('wait')
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					hafizh.sendMessage(from, pok, image, { quoted: tod, caption: `*⟪ PINTEREST ⟫*`})
					break 
				case 'infogc':    
				hafizh.updatePresence(from, Presence.composing)
				  linkgc = await hafizh.groupInviteCode (from)
					try {
					ppimg = await hafizh.getProfilePicture(from)
				} catch {
					ppimg = 'https://i.ibb.co/NthF8ds/IMG-20201223-WA0740.jpg'
				}
					let buf = await getBuffer(ppimg)
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `*•Nama grup :* ${groupName}\n*•Link grup :* https://chat.whatsapp.com/${linkgc}\n*•Deskripsi :* ${groupDesc}\n*•Jumlah Member :* ${groupMembers.length}\n*•Jumlah Admin :* ${groupAdmins.length}\n*•List Admin :*\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					hafizh.sendMessage(from, buf, image, {quoted: tod, caption: teks})
					break
				case 'gruplist':
				 case 'listgc':
				     txt = await hafizh.chats.array.filter(v => v.jid.endsWith('g.us')).map(v =>`${hafizh.getName(v.jid)}\n${v.jid} [${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`
             hafizh.reply(m.chat, 'List Groups:\n' + txt, m)
             break
				case 'grupdesc':
				    descgc = await hafizh.groupInviteCode (from)
				    yeh = `deskripsi grup ${groupName}\n\n${groupDesc}`
				    hafizh.sendMessage(from, yeh, text, {quoted: tod})
					break
				case 'linkgc':
				    linkgc = await hafizh.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    hafizh.sendMessage(from, yeh, text, {quoted: tod})
					break
				case 'setname':
                hafizh.groupUpdateSubject(from, `${body.slice(9)}`)
                hafizh.sendMessage(from, '⟪ SUKSES ⟫ Mengubah Nama Grup', text, {quoted: tod})
					break
				case 'setdesc':
                hafizh.groupUpdateDescription(from, `${body.slice(9)}`)
                hafizh.sendMessage(from, '⟪ SUKSES ⟫ Mengubah Desk Grup', text, {quoted: tod})
					break
				case 'hidetag':
					var value = body.slice(9)
					var group = await hafizh.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: tod
					}
					hafizh.sendMessage(from, options, text)
					break					
				case 'shorturl':
		case 'tinyurl':
                    anu = await fetchJson(`https://api.zeks.xyz/api/urlshort?url=${body.slice(10)}&apikey=apivinz`)
			        hasil = `${anu.result}`
			        reply(hasil)
			        break
				case 'randomhentong':
					gatauda = body.slice(15)
					reply('wait')
					anu = await fetchJson(`https://api.lolhuman.xyz/api/hentai?apikey=${lolkey}`)
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, image, {quoted: tod})
					break					
				case 'toimg':
					if (!isQuotedSticker) return reply('Reply/tag sticker')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await hafizh.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						buffer = fs.readFileSync(ran)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'succes'})
						fs.unlinkSync(ran)
					})
					break
				case 'nhentaipdf':
					hafizh.updatePresence(from, Presence.composing)
					if (args.length < 1) return reply('kode nya mana kak')
					anu = await fetchJson(`http://api.lolhuman.xyz/api/nhentaipdf/${body.slice(12)}?apikey=${lolkey}`)
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, document, { quoted: tod, mimetype: Mimetype.pdf, filename: `${body.slice(12)}.pdf` })
					break
				case 'nhentaisearch':
					if (args.length < 1) return reply('kode nya mana kak?')
					anu = await fetchJson(`http://api.lolhuman.xyz/api/nhentaisearch?apikey=847de7716f17a51eeba4235c&query=${body.slice(15)}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					hsrch = '=================\n'
					for (let i of anu.result) {
						hsrch += `*Title* : ${i.title_english}\n*Kodenuk* : ${i.id}\n*Halaman* : ${i.page}\n=================\n`
					}
					break
				case 'nsfw':
					if (args.length < 1) return reply('1 untuk mengaktifkan , 0 untuk menonaktifkan')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('sudah aktif!')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ succes ❭ Mengaktifkan fitur nsfw')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ succes ❭ Menonaktifkan fitur nsfw')
					} else {
						reply('1 untuk mengaktifkan , 0 untuk menonaktifkan')
					}
					break
								case 'ssweb':
				if (args.length < 1) return reply('Urlnya mana gan?')
				try {
				ssb = `${body.slice(7)}`
				reply(mess.wait)
				buff = await getBuffer(`https://api.vhtear.com/ssweb?link=${teks}&type=pc&apikey=${vhtearkey}`, {method: 'get'})
				hafizh.sendMessage(from, buff, image, {quoted: tod})
				} catch {
				reply (mess.error.bug)
				}
			break 
				case 'jam':
					if (args.length < 1) return reply('jam negara mana?')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/jamdunia?lokasi=${body.slice(5)}&apikey=${tobzkey}`, {method: 'get'})
					jm = '=================\n'
					for (let i of anu.result) {
						jm += `*Hari/tgl* : ${i.date}\n*Sun* : ${i.sun}\n*Jam* : ${i.time}\n*Tempat* : ${i.title}`
					}
					reply(jm.trim())
					break
				case 'welcome':
					if (args.length < 1) return reply('1 untuk mengaaktifkan / 0 untuk menonaktifkan')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('sudah aktif!')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ *succes* ❭ Mengaktifkan fitur welcome')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ *succes* ❭ Menonaktifkan fitur welcome')
					} else {
						reply('1 untuk mengaktifkan , 0 untuk menonaktifkan')
					}
					break
				case 'wait':
					if ((isMedia && !tod.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						media = await hafizh.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							hafizh.sendMessage(from, res.video, video, {quoted: tod, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('kirim/reply foto dengan caption .wait')
					}
					break
					case 'chatprank':
hafizh.updatePresence(from, Presence.composing)
if (args.length < 1) return reply(`Masukan teks\nContoh : ${prefix}chatprank p/unten`)
tels = body.slice(11)
var teks1 = tels.split("/")[0];
var teks2 = tels.split("/")[1];
hasil = `${teks1}‎͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${teks2}`
hafizh.sendMessage(from, hasil, text, {
  quoted: tod
})
break
				case 'listonline':
        		let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
			    let online = [...Object.keys(hafizh.chats.get(ido).presences), hafizh.user.jid]
			    hafizh.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: tod,
  			  contextInfo: { mentionedJid: online }
			    })
				break
				default:
			if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

                   

