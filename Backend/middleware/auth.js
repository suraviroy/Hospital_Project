const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const decode = jwt.verify(token, "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe");
        req.user = decode;
        console.log(decode);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "unauthorized" });
    }
};
module.exports = auth;