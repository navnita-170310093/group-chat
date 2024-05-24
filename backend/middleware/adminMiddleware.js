const asyncHandler = require("express-async-handler");

const protectAdmin = asyncHandler(async (req, res, next) => {
 try {
        if (req.headers.role == 'admin') {
            next();
        }
        else {
            res.status(401);
            throw new Error("Not authorized, role failed");

        }

    } 
    catch (error) {
        res.status(401);
        throw new Error("Not authorized,  failed");
      }
    }
)

module.exports = { protectAdmin };
