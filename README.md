# api uslugi
Получение информации о свободных талонах на [сайте мос услуг](https://uslugi.mosreg.ru)
### Url api: `https://uslugi.mosreg.ru/zdrav/doctor_appointment/api/doctors?lpuCode=&departmentId=&doctorId=&days=`

`npm install`

##### Некоторые параметры:
Код больницы `lpuCode=` если его не указать, запрос вернёт все больницы

Направление специалиста `departmentId=`

Кличество дней  `days=` по умолчанию 14 дней

Индентификатор доктора `doctorId=` можно получить определённое время, доступного для записи

------------

##### Response json:
Дата приёма `date`

Время начала приёма `time_from`

Время окончания приёма `time_to`

Количество талонов `count_tickets` 

Неделя 1,2  `week1`, `week2`

Отправка почты [nodemailer](https://nodemailer.com/about/ "nodemailer"), отлично работает с Yandex, Google решил, что меня взламывают.

```javascript
let transporter = nodemailer.createTransport({
	host: 'smtp.yandex.ru',
	port: 465,
	auth: {
	user: "ЛОГИН_ПОЧТЫ",
	pass: "ПАРОЛЬ_ПОЧТЫ"
	}});
```

```javascript
let info = await transporter.sendMail({
	from: '"Запись к врачу" <ОТ_КОГО>',
	to: "КОМУ",
	subject: "Привет", 
	text: "Запись к врачу", 
	html: "<b>Есть талон у врача</b>"
});
```
#### License
This project is licensed under the [ISC license.](https://opensource.org/licenses/ISC)
