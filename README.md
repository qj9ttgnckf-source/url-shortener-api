# URL Shortener API

Простой сервис сокращения ссылок

## Установка

```bash
npm install
```

## Запуск

```bash
npm start
```

Сервер: http://127.0.0.1:3005

## Создать короткую ссылку

```bash
curl -X POST http://127.0.0.1:3005/shorten \
 -H "Content-Type: application/json" \
 -d '{"url":"https://google.com"}'
```

## Открыть короткую ссылку

Пример:

http://127.0.0.1:3005/abc12
