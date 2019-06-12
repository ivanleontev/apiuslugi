const nodemailer = require('nodemailer');
const request = require('request-promise');

setInterval(function () {
  const options = {
      method: 'post',
      uri: 'https://uslugi.mosreg.ru/zdrav/doctor_appointment/api/doctors?lpuCode=5004014&departmentId=30&doctorId=&days=14'
  }
  request(options)
      .then(function (response) {

        var week1 = false;
        var week2 = false;
        var res = JSON.parse(response);

        for (var i = 0; i < 7; i++) {
          var tiketsWeek1 = res.items[0].doctors[0].week1[i].formatting.count_tickets;
          if (tiketsWeek1 != 0) {
            week1 = true;
          }
          var tiketsWeek2  = res.items[0].doctors[0].week2[i].formatting.count_tickets;
          if (tiketsWeek2 != 0) {
            week2 = true;
          }
        }

        var time = new Date().toTimeString();
        console.log('Первая неделя ' + week1);
        console.log('Вторая неделя ' + week2);
        console.log('Время проверки ' + time);
        console.log('-----');

        if (week1 || week2) {
          async function main(){
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
              host: 'smtp.yandex.ru',
              port: 465,
              auth: {
                user: "ЛОГИН_ПОЧТЫ",
                pass: "ПАРОЛЬ_ПОЧТЫ"
              }
            });
            let info = await transporter.sendMail({
              from: '"Запись к врачу" <ОТ_КОГО>',
              to: "КОМУ",
              subject: "Привет", 
              text: "Запись к врачу", 
              html: "<b>Есть талон у врача</b>" // html body
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            main().catch(console.error);
          }


      })
      .catch(function (err) {
        console.log('Не удалось обработать массив:' + err)
      })
}, 3000)
