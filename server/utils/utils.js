import UAParser from 'ua-parser-js'
import requestIp from 'request-ip'

const userInfo = (UserAgent) => {
    const parser = new UAParser();
    parser.setUA(UserAgent);

    const browser = parser.getBrowser().name;
    const os = parser.getOS().name;
    const device = parser.getDevice().type || 'desktop';

    if (UserAgent.includes('Brave')) {
        browser = 'Brave';
    }

    return {browser, os, device}
}


const getIPAdress = (req) => {
    return requestIp.getClientIp(req);
}


export {userInfo, getIPAdress}