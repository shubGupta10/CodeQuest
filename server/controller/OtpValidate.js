export const otpValidation = async (otpTime) => {
    try {
        const currentTime = new Date();
        const otpTimeInMillis = new Date(otpTime).getTime();
        const currentTimeInMillis = currentTime.getTime();

        var differenceValue = (currentTimeInMillis - otpTimeInMillis) / 1000;
        differenceValue /= 60;

        const minutes = Math.abs(differenceValue);

        console.log('OTP Generated Time:', new Date(otpTime));
        console.log('Current Time:', currentTime);
        console.log('Expired Minutes:', minutes);

        if (minutes > 5) {
            return true; 
        }

        return false; 
    } catch (error) {
        console.error(error.message);
        return true; 
    }
};
