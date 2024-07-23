import UAParser from 'ua-parser-js';
import requestIp from 'request-ip';

const userInfo = (userAgent) => {
    const parser = new UAParser();
    parser.setUA(userAgent);

    let browser = parser.getBrowser().name;
    const os = parser.getOS().name;
    const device = parser.getDevice().type || 'desktop';

    if (userAgent.includes('Brave')) {
        browser = 'Brave';
    }

    return { browser, os, device };
};

const getIPAdress = (req) => {
    return requestIp.getClientIp(req);
};

export { userInfo, getIPAdress };
