## Программные зависимости
- nodejs+npm
- imagemagick

## Зависимости js модулей nodejs
В папке с проектом сделать npm install

## Инструменты
Рекомендуется использовать LiveReload он умеет компилировать less по сохранению

## Пояснения по папкам
- app 			- Папка с приложением
- dist		- Папка с компилированным приложением (обфусцированным, готовым к деплою)
- tasks			- Задания для сборщика Grunt
- Gruntfile.js	- Конфигурация сборщика Grunt
- package.json	- Зависимости для серверного приложения

## Сборка проекта и запуск локального сервера
npm install
- ./bin/deploy server 	- Запуск локального сервера [http://localhost:3010] для отладки app
- grunt build 	- Делает магию Yoman и собирает проект в папку dist
