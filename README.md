# Жабблер
Жабблер - социальная сеть, попытка создать простую CMS которая пародирует Tumblr. Представленный здесь исходный код на данный момент является нестабильным.

Tumblr принадлежит Дэвиду Карпу и Automatic.

Все найденные баги или предложения новых функций можете писать во вкладке [Issues](https://github.com/zhabbler/zhabbler/issues).

## Инстанции
Список инстаций Жабблера которые работают на данный момент:
* [zhabbler.ru](https://zhabbler.ru)

## Могу ли я создать свою собственную инстанцию?
Конечно!

Но рекомендуется использовать VDS или VPS, так как вы не сможете установить Жабблер на хостинге.

## И как же установить Жабблер?
1. Установите PHP версии >= 8.0, Apache, Composer, git, ffmpeg (для работы с видео), npm (nodejs).
2. Установите MySQL
   * Рекомендуем использовать MariaDB, но любая MySQL-совместимая база данных должна работать.
3. Создайте новую базу данных и импортируйте файл `zhabbler-dump.sql` и файлы sql в папке `sql` в вашу БД.
4. Установите Жабблер в той директории, где находится ваш сайт.
5. Зайдите в конфиг Apache того сайта, на котором будет установлен Жабблер, и допишите к директориям домашней папки сайта `/Web/public` и конечно же отключите список директорий на сайте (Directory listing).
6. Зайдите в конфиг самого Жабблера (`config.neon`) и измените настройки.
   * В `encryption_key` введите рандомные значения (чем больше - тем лучше), так как это значение используется в ключе шифрования сообщений.
7. Зайдите в `/Web/public/static/js/main.js` и в первой строке измените URL.
8. Установите все расширения используя команду `composer install`.
10. Зайдите в `/Web/public/static` и установите все расширения используя команду `npm install`.
11. Включите вебсокеты для сообщений `php bin/websockets-server.php`.
12. Перезагрузите Apache

Поздравляем, у вас теперь установлен Жабблер на вашем сервере!

Аккаунт администратора - `admin@localhost.lh` и пароль `qwerty123`.

Если случились какие-то проблемы во время установки, [напишите об этом в Issues](https://github.com/zhabbler/zhabbler/issues)

## Где мне получить помощь?
* В нашем [Telegram чате](https://t.me/ZhabblerChat)
* В [Issues](https://github.com/zhabbler/zhabbler/issues)
