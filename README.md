# Email editors

### Usage:
To use library in your project you need to create *div* element with id='emails-editor' and import EmailsEditor like this (in HTML)
```html
<div id="emails-editor" style="width:540px;height:300px;"></div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var elem = document.getElementById('emails-editor');
            let instance = new EmailsEditor(elem);
            instance.initEmailsEditor();
        })
    </script>
```
... or like this (in your .js file)
```javascript
import EmailsEditor from 'emails-editor'

EmailsEditor.initEmailsEditor();
```

### Run build version:
```
$ npm i
$ npm run dev
```

### API:
- initializing form: **getEmailList()**

```javascript
import EmailsEditor from 'emails-editor';

var emailsList = EmailsEditor.getEmailList();
```

- get emails list: **getEmailList()**
```javascript
var emailsList = EmailsEditor.getEmailList();
```
the value of emailsList:
```
["lena4114@mail.ru", "galina2001@yandex.ru", "vova5@gmail.com"]
```

- set new email (single or several): **setEmails(value)**
Param - string
```javascript
EmailsEditor.setEmails('lena4114@mail.ru, galina2001@yandex.ru, vova5@gmail.com');
```

- subscribe for changes of emails list: **subscribeEmailChanges(callback)**
Param - function
```javascript
EmailsEditor.subscribeEmailChanges(() => console.log('List of emails has changed'));
```