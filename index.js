'use strict';

const net = require('net');

const _allowlist = new net.BlockList();

module.exports.title = 'IP Restriction';
module.exports.init = function(app, done) {

    for (let ip of app.config.allowedips) {
        if (ip.includes('/')) {
            const [ip, mask] = ip.split('/');
            _allowlist.addSubnet(ip, mask);
        } else {
            _allowlist.addAddress(ip);
        }
    }

    app.addHook('smtp:connect', (session, next) => {
        if (!app.config.interfaces.includes(session.interface)) {
            // not an interface we care about
            next();
        }

        if (!_allowlist.check(session.remoteAddress)) {
            let err = new Error('IP ' + session.remoteAddress +  ' not permitted to send!');
            err.responseCode = 530;
            return next(err);
        }

        // IP seems to be legit
        next();
    });

    done();
};
