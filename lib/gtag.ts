export const GA_MEASUREMENT_ID = "G-THS71QL16S";

export const trackEvent = (
    eventName: string,
    params?: Record<string, unknown>
) => {
    const isProduction = process.env.NODE_ENV === "production";
    if (typeof window !== "undefined" && window.gtag && isProduction) {
        window.gtag("event", eventName, params);
    }
};
