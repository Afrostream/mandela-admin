'use strict';

module.exports = function (options) {
  return function (req, res, next) {
    if (req && req.body) {
      try {
        // avoiding to dump post on /api/users/.*/videos/
        if (!String(req.url).match(/^\/api\/users\/[^\/]+\/videos\/.*$/) &&
            ['POST', 'PUT', 'PATCH'].indexOf(req.method) !== -1) {
          // fix: do not dump users passwords into logentries.
          var body = JSON.parse(JSON.stringify(req.body));
          if (body.password) { body.password = 'xxxxxxxx'; }
          if (body.number) {
            body.number = '4111111111111111';
            if (body.year) body.year = 2018;
            if (body.month) body.month = 1;
          }
          if (body.cvv) { body.cvv = '123'; }
          console.log('[INFO]: ' + req.method + ' ' + req.url + ' body=', body);
        }
      } catch (e) { }
    }
    next();
  };
};
