const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cron = require("node-cron");

const CHANNEL_ID = "1971995230311813120";


module.exports = function startRankingCron(client) {
  cron.schedule(
    "45 13 15 * * *",
    async () => {
      const dbPath = path.join(__dirname, "../data", "strava_bot.db");
      const db = new sqlite3.Database(dbPath);
      const channel = await client.channels.fetch(CHANNEL_ID);

      // Get current VN time
      const nowVN = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
      );
      // 7 days ago
      const sevenDaysAgoVN = new Date(nowVN);
      sevenDaysAgoVN.setDate(nowVN.getDate() - 7);
      const sevenDaysAgoStr = sevenDaysAgoVN.toISOString().split("T")[0];

      // Motivational messages
      const messages = [
        "Hãy cố gắng vận động hôm nay nhé! 💪",
        "Đừng bỏ lỡ cơ hội cải thiện sức khỏe! 🚴‍♂️",
        "Một ngày không vận động là một ngày lãng phí! 🏃‍♀️",
        "Cùng nhau duy trì thói quen tốt nào! 🏆",
        "Bạn có thể bắt đầu lại bất cứ lúc nào! 🔥",
        "Hãy để Strava ghi nhận nỗ lực của bạn! 📈",
        "Vận động để sống khỏe mạnh hơn! 🌟",
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];

      // Query all users
      const userQuery = `SELECT mezon_user_id, athlete_name FROM athletes`;
      db.all(userQuery, [], async (err, users) => {
        if (err) {
          await channel.send(`❌ Lỗi truy vấn danh sách user: ${err.message}`);
          db.close();
          return;
        }
        if (!users || users.length === 0) {
          await channel.send(`⛔️ Không tìm thấy user nào trong hệ thống.`);
          db.close();
          return;
        }

        // Query users with activity in last 7 days
        const activeQuery = `SELECT DISTINCT mezon_user_id FROM activities WHERE (deleted IS NULL OR deleted = 0) AND date(start_date_local) >= ?`;
        db.all(activeQuery, [sevenDaysAgoStr], async (err2, activeRows) => {
          if (err2) {
            await channel.send(`❌ Lỗi truy vấn hoạt động: ${err2.message}`);
            db.close();
            return;
          }
          const activeIds = (activeRows || []).map(u => u.mezon_user_id);
          // Find inactive users
          const inactiveUsers = (users || []).filter(u => !activeIds.includes(u.mezon_user_id));

          if (!inactiveUsers || inactiveUsers.length === 0) {
            await channel.send(`🎉 Tất cả thành viên đều đã có hoạt động trong 7 ngày qua!`);
            db.close();
            return;
          }

          // Tag inactive users
          const tags = inactiveUsers.map(u => `<@${u.mezon_user_id}>`).join(" ");
          const names = inactiveUsers.map(u => u.athlete_name).join(", ");

          const embed = [
            {
              color: 0xff9900,
              title: `🔔 Báo cáo thành viên chưa có hoạt động 7 ngày qua`,
              description:
                `Các thành viên sau chưa ghi nhận hoạt động nào trong 7 ngày qua:\n${tags}\n\nTên: ${names}\n\n${randomMsg}`,
              timestamp: new Date().toISOString(),
              footer: {
                text: "Powered by Mezon Bot Strava",
                icon_url:
                  "https://d3nn82uaxijpm6.cloudfront.net/favicon-32x32.png",
              },
            },
          ];
          await channel.send({ embed });
          db.close();
        });
      });
    },
    {
      timezone: "Asia/Ho_Chi_Minh",
    }
  );
};
