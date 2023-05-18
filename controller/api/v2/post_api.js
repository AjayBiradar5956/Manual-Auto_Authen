module.exports.index = function (req, res) {
    return res.status(200).json({
        message: "this is v2 api",
    });
}