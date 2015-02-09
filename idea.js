if (Meteor.isServer) {
    // Create API object
    var send = function (s) {
        return 'You\'ve called \'' + s + '\' method which trigger an excution at the server';
    };

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

    var wrapApi = wrapUp(api, 'api');
    // Wrap the APIs
    function wrapUp(o, s) {
        var wrap = {};
        s = s + '.';
        _.each(o, function (v, i) {
            if (typeof v === 'object') {
                _.each(wrapUp(v, i), function (v2, i2) {
                    wrap[s + i2] = v2;
                });
            } else {
                wrap[s + i] = v;
            }
        });
        return wrap;
    }

    wrapApi.apiList = function () {
        return _.keys(wrapApi);
    };

    Meteor.methods(wrapApi);
}

if (Meteor.isClient) {
    Meteor.call('apiList', null, function (e, r) {
        Session.set('methodList', r);
    });
    Template.hello.helpers({
        methodList: function() { return Session.get('methodList'); }
    });
}
