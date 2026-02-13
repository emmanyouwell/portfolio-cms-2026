import React from "react";

interface DividerProps {
    className?: string;
    fill?: string;
}

export const WaveDivider: React.FC<DividerProps> = ({ className, fill = "fill-background" }) => {
    return (
        <div className={`w-full overflow-hidden leading-[0] transform translate-y-[1px] ${className}`}>
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className={`relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[100px] ${fill}`}
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    className="fill-current"
                ></path>
            </svg>
        </div>
    );
};

export const SlopeDivider: React.FC<DividerProps> = ({ className, fill = "fill-background" }) => {
    return (
        <div className={`w-full overflow-hidden leading-[0] transform translate-y-[1px] ${className}`}>
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className={`relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[100px] ${fill}`}
            >
                <path
                    d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"
                    className="fill-current"
                ></path>
            </svg>
        </div>
    );
};

export const TiltDivider: React.FC<DividerProps> = ({ className, fill = "fill-background" }) => {
    return (
        <div className={`w-full overflow-hidden leading-[0] transform translate-y-[1px] ${className}`}>
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className={`relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[100px] ${fill}`}
            >
                <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-current"></path>
            </svg>
        </div>
    );
};

export const CurveDivider: React.FC<DividerProps> = ({ className, fill = "fill-background" }) => {
    return (
        <div className={`w-full overflow-hidden leading-[0] transform translate-y-[1px] ${className}`}>
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className={`relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[100px] ${fill}`}
            >
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25"
                    className="fill-current"
                ></path>
                <path
                    d="M0,0V15.81C13,36.92,46,62.34,98.58,81.28c52.54,18.91,114.16,30.54,168.35,33.59,48.65,2.74,96.39-16.51,146.5-16.51,36.91,0,76.53,10.6,110.15,22.29,26.54,9.23,54,19.82,82.49,27.09,61.85,15.76,128.52,14.65,191.88-5.32,59.34-18.7,98-48.45,133.72-88.72,39.81-44.87,41.92-74.88,68.33-68.52V0Z"
                    opacity=".5"
                    className="fill-current"
                ></path>
                <path
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    className="fill-current"
                ></path>
            </svg>
        </div>
    );
};
