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


    Meteor.methods(wrapApi);
    Meteor.methods({
        list: function () {
            return _.keys(wrapApi);
        }
    });
}

if (Meteor.isClient) {
    Meteor.call('list', null, function (e, r) {
        Session.set('methodList', r);

        var finalResult = {};
        _.each(r, function (v) {
            var vSplit = v.split('.');
            var p = finalResult;
            for (var i in vSplit) {
                if (i == vSplit.length - 1) {
                    p[vSplit[i]] = function(o, cb) {
                        Meteor.call(v, o, cb);
                    };
                } else {
                    if (!p[vSplit[i]]) p[vSplit[i]] = {};
                    p = p[vSplit[i]];
                }
            }
        });
        window.api = finalResult.api;
        Meteor.api = finalResult.api;
        console.log('window.api :', window.api);
    });
    Template.hello.helpers({
        methodList: function () {
            return Session.get('methodList');
        }
    });
}
