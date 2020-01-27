'use strict';

const request = require('request');

module.exports.title = 'IP Restriction';
module.exports.init = function(app, done) {

    let reject = (session) => {
        let err = new Error('IP ' + session.remoteAddress +  ' not permitted to send!');
        err.responseCode = 530;
        return err;
    }

    app.addHook('smtp:connect', (session, next) => {
        let allowedIPs = app.config.allowedips;

        if (!app.config.interfaces.includes(session.interface)) {
            // not an interface we care about
            next();
        }

        // Config contains an url, checking against that
        if (typeof allowedIPs === 'string' && (allowedIPs.includes("https") || allowedIPs.includes("http"))) {
            let formData = {
                ip: session.remoteAddress
            };
            request.post({url: allowedIPs, formData: formData}, (err, httpResponse, body) => {
                if (err) {
                    // error means reject, so reject connection
                    return next(reject(session));
                }

                if (httpResponse.statusCode != 200) {
                    // none 200 status means reject, so reject connection
                    return next(reject(session));
                }

                // Response is a 200 so IP seems to be legit
                return next();
            });
        } else if (Array.isArray(allowedIPs)) {
            if (!allowedIPs.includes(session.remoteAddress)) {
                return next(reject(session));
            }

            // IP seems to be legit
            return next();
        } else {
            // unexpected config, deny connection for security reasons
            return next(reject(session));
        }
    });

    done();
};
