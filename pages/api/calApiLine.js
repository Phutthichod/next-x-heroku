const request = require('request');
export default async (req, res) => {
    const data = req.body
    await request.post(data.url, {
        'auth': {
            'bearer': data.token
        }
    }).on('response', function (err) {
        res.statusCode = 200
        res.json({ test: "123" })
    })
}