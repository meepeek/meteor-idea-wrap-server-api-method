# meteor-idea-wrap-server-api-method

This is the demonstration of an idea for API wrap up to make Meteor.methods easier to use.

Let say, if I would do an object API in my project as follow :
```
var api = {
        someObject: {
            c: function () {
                return send('c');
            },
            d: function () {
                return send('d');
            }
        },
        a: function () {
            return send('a');
        },
        b: function () {
            return send('b');
        }
    };
```

then wrap them to a flat one like this :

```
var apiWrap = {
        'api.someObject.c': function () {
            return send('c');
        },
        'api.someObject.d': function () {
            return send('d');
        }
        'api.a': function () {
            return send('a');
        },
        'api.b': function () {
            return send('b');
        }
    };
```

then putting them into Meteor.methods(apiWrap) in order to access the apis from the client.

Is there a better way to do so without repeating the object reconstruction pain ? Yes. Clone the repo and run meteor to see it for yourself.
