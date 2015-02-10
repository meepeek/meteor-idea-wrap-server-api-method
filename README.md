# meteor-issue-3675-Meteor.methods-wrapup-idea

*** Usage

1. Create new meteor project. (meteor create [name])
2. Put these files in another meteor project newly created (I cannot include .meteor directory in the project.)
3. Run meteor server. (meteor run)
4. Browse with web browser (http://localhost:3000/)
5. Open debug console.
6. You will be able to access Meteor.api at the client web console.

*** Concept

** Introduction

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

Is there a better way to do so without repeating the object reconstruction pain ? This is the goal of this example.

** New Approach

