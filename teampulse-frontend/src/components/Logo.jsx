import './Logo.css';

export default function Logo({ size = 110 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size * 0.35}
            viewBox="0 0 1200 300"
            className="teampulse-logo"
        >
            {/* Logo Text */}
            <text
                x='10%'
                y="45%"
                textAnchor="start"
                dominantBaseline="middle"
                fontFamily="var(--font-body)"
                fontWeight="530"
                fontSize="128"
                letterSpacing="0.036em"
                fill="var(--text-dark)"
            >
                teampulse
            </text>

            {/* Pulse Dot */}
            <circle
                cx="490"
                cy="132"
                r="22"
                className="pulse-dot"
            />

        </svg>
    );
}
