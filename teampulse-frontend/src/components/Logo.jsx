import './Logo.css';

export default function Logo({ size = 110 }) {
    return (
        <svg
            width={size}
            height={size * 0.3}
            className="teampulse-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 300"

            >
            <text
                x="80"
                y="50%"
                fontFamily="var(--font-body)"
                fontWeight="430"
                fontSize="90"
                letterSpacing="0.04em"
                fill="var(--primary)"
            >TEAMPULSE</text>
        </svg>
    );
}