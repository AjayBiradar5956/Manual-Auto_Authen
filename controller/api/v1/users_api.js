const user = require('../../../model/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function (req, res) {
    try {
        let User = await user.findOne({ email: req.body.email })
            .then((User) => {
                if (!User || User.password != req.body.password) {
                    return res.status(422).json({
                        message: "Invalid username or password"
                    })
                }
                return res.status(200).json({
                    message: "sign in successfull, here is your token please keep it safe",
                    data: {
                        token: jwt.sign(User.toJSON(), 'codeial', { expiresIn: '1000000' }),
                    }
                })
            })
    } catch (err) {
        console.log('******', err);
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}