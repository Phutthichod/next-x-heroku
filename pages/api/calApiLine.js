const request = require('request');
export default (req, res) => {
    const data = req.body
    request.post(data.url, {
        'auth': {
            'bearer': data.token
        }
    }).on('error', function (err) {
        // res.statusCode = 200
        // res.json({ test: "567" })
    })
    res.statusCode = 200
    res.json({ test: "123" })
}