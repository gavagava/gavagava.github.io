# Email editors

## Run build version:
```
$ npm i
$ webpack-dev-server
```

## API:
- get list of emails: *getEmailList()*
```javascript
var emailsList = FormEmail.getEmailList();
```
result of emailsList:
```
["lena4114@mail.ru", "galina2001@yandex.ru", "vova5@gmail.com"]
```
- set single email or list: *setEmails()*
```javascript
FormEmail.setEmails('lena4114@mail.ru, galina2001@yandex.ru, vova5@gmail.com');
```