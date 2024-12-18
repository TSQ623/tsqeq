class TreasureMap {
    static async getInitialClue() {
        try {
            const response = await fetch('./data/clues.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const clues = await response.text();
            return "在古老的图书馆里找到了第一个线索..." + clues;
        } catch (error) {
            console.error("获取初始线索失败:", error.message);
            return "在古老的图书馆里找到了第一个线索...";
        }
    }

    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!");
            }, 1000);
        });
    }

    static choosePath() {
        return new Promise((resolve) => {
            const paths = ["左", "右"];
            const pathChoice = document.getElementById('pathChoice');
            pathChoice.textContent = `选择路径: 左 或 右`;
            pathChoice.style.display = 'block';
            pathChoice.onclick = function() {
                const choice = paths[Math.random() < 0.5 ? 0 : 1];
                pathChoice.style.display = 'none';
                resolve(`你选择了${choice}路径，继续前进...`);
            };
        });
    }
}

async function findTreasureWithAsyncAwait() {
    try {
        const clue = await TreasureMap.getInitialClue();
        log(clue);
        const location = await TreasureMap.decodeAncientScript(clue);
        log(location);
        const path = await TreasureMap.choosePath();
        log(path);
        const box = await TreasureMap.searchTemple(location);
        log(box);
        const treasure = await TreasureMap.openTreasureBox();
        log(treasure);
        saveGameProgress();
    } catch (error) {
        console.error("任务失败:", error);
        log(error);
    }
}

function log(message) {
    const logDiv = document.getElementById('log');
    const clueDiv = document.createElement('div');
    clueDiv.className = 'clue';
    clueDiv.textContent = message;
    logDiv.appendChild(clueDiv);
}

// 玩家数据保存与加载
function savePlayerInfo(playerId, nickname) {
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('nickname', nickname);
}

function loadPlayerData() {
    const playerId = localStorage.getItem('playerId');
    const nickname = localStorage.getItem('nickname');
    // 初始化游戏历史等...
}

function saveGameProgress() {
    // 存储游戏进度...
}

// 假设这是初始化函数
function initGame() {
    const playerId = prompt("请输入你的玩家ID:");
    const nickname = prompt("请输入你的昵称:");
    savePlayerInfo(playerId, nickname);
    findTreasureWithAsyncAwait();
}

// 确保页面完全加载后再初始化游戏
window.addEventListener('load', initGame);