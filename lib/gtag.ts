export const GA_MEASUREMENT_ID = "G-THS71QL16S";

export const trackEvent = (
    eventName: string,
    params?: Record<string, any>
) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, params);
    }
};
