const request = require('request');
var fs = require('fs');
export default (req, res) => {
    fs.appendFile('./list_userlineId', req.body.url, function (err) {
        if (err) throw err;
        const data = req.body
        request.post(data.url, {
            'auth': {
                'bearer': data.token
            }
        }).on('response', function (err) {

        })
        res.statusCode = 200
        res.json({ test: "123" })
    });

}