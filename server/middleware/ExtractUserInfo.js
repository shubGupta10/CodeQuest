import { userInfo, getIPAdress } from '../utils/utils.js';

const extractUserInfo = (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const userInformation = userInfo(userAgent);
    const ip = getIPAdress(req);

    req.userInfo = { ...userInformation, ip };
    next();
};

export default extractUserInfo;
