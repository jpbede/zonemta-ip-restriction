'use strict';

module.exports.title = 'IP Restriction';
module.exports.init = function(app, done) {

    app.addHook('smtp:connect', (session, next) => {

        if (!app.config.interfaces.includes(session.interface)) {
            // not an interface we care about
            next();
        }

        if (!app.config.allowedips.includes(session.remoteAddress)) {
            let err = new Error('IP ' + session.remoteAddress +  ' not permitted to send!');
            err.responseCode = 530;
            return next(err);
        }

        // IP seems to be legit
        next();
    });

    done();
};
