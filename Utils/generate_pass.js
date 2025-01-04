const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits, } = require('discord.js');

const fs = require("fs");

const path = require("path");

const battlepassDB = require('../Shemas/battlepass');

const { createCanvas, loadImage } = require('canvas');


async function generateImage(userId, premiumActivate) {
    const width = 400;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    let user_bp = await battlepassDB.findOne({ userId: userId });

    const backgroundImagePath = path.join(__dirname, '../Images/pass.jpg')
    const backgroundImage = await loadImage(backgroundImagePath);
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    const galochkaImagePath = path.join(__dirname, '../Images/check-mark.png');
    const checkmark = await loadImage(galochkaImagePath);

     // Настройки для отрисовки галочек
     const checkmarkSize = 60; // Размер галочки
     const padding = 4; // Отступы между галочками
     const freePassStartX = 75; // Начальная позиция X
     const freePassStartY = 60; // Центр по Y

     const goldPassStartX = 75;
     const goldPassStartY = 160;

    if (!premiumActivate) {
        //Если голдпасса нету то добавляем черную полосу
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, height - 110, width, 110)

        const LockedImagePath = path.join(__dirname, '../Images/padlock.png')
        const LockedImage = await loadImage(LockedImagePath);
        ctx.drawImage(LockedImage, width / 2 - 20, height - 90, 50, 50);

        ctx.globalAlpha = 0.8;
        for (let i = 0; i < user_bp.level; i++) {
            const x = freePassStartX + i * (checkmarkSize + padding);
            ctx.drawImage(checkmark, x, freePassStartY, checkmarkSize, checkmarkSize);
        }

        
    } else {

        ctx.globalAlpha = 0.8;

        for (let i = 0; i < user_bp.level; i++) {
            const x = goldPassStartX + i * (padding + checkmarkSize); // Позиция X для каждой галочки
            ctx.drawImage(checkmark, x, goldPassStartY, checkmarkSize, checkmarkSize);
        }

        for (let i = 0; i < user_bp.level; i++) {
            const x = freePassStartX + i * (checkmarkSize + padding);
            ctx.drawImage(checkmark, x, freePassStartY, checkmarkSize, checkmarkSize);
        }
    }
    
    

    

    return canvas.toBuffer();
}

module.exports = { generateImage };