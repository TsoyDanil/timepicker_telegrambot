const TelegramBot = require('node-telegram-bot-api');

const TOKEN = "6649626004:AAH74eyaQQf2W1oGIgvMKJ-dutDJCd7IoLc";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name;

    bot.sendMessage(chatId, `Привет, ${username}! Нажми на кнопку, чтобы выбрать время.`, {
        reply_markup: {
            keyboard: [[{ text: 'Выбрать время', request_contact: false, request_location: false }]],
            one_time_keyboard: true,
        },
    });
});

bot.onText(/Выбрать время/, (msg) => {
    const timeArray = []
    for (let i = 0; i < 24; i++){
        timeArray.push([{ text: `${i.toString().padStart(2, '0')}:00`, callback_data: `${i.toString().padStart(2, '0')}:00` }])
    }
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Выберите время:', {
        reply_markup: {
            inline_keyboard: [...timeArray]
        },
    });
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const chosenTime = query.data;
    bot.sendMessage(chatId, `Ты выбрал время: ${chosenTime}. Спасибо!`);
});
