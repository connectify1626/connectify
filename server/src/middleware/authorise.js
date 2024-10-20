import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const authToken = req.cookies.token !== undefined ? req.cookies.token : (req.headers.authorization || req.headers.Authorization);
        console.log(authToken);
        
        if (!authToken?.startsWith('Bearer ')) return res.status(401).json({ success: false, message: "Access Denied." });
        const token = authToken.split(' ')[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                req.body.userId = decoded.id;
                next();
            }
        );

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};