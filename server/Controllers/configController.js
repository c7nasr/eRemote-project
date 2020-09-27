const Config = require("../Models/configModel")
exports.get_config = async (req, res) => {
    try {

        const c = await Config.findOne({}).sort("-createdAt");

        res.status(200).json({status: "ok",c})

    } catch (error) {
        if (error) res.status(200).json({ status: "failed", error });
    }
};

exports.set_config = async (req, res) => {
    try {

        const config = await Config.create({
            client_version:"1"
        })

        res.status(200).json({status: "ok",config})

    } catch (error) {
        console.log(error)
        if (error) res.status(200).json({ status: "failed", error });
    }
};
