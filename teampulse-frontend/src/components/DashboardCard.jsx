import './DashboardCard.css';
import CardIcon from './CardIcon';
import { faUserGroup, faCircleExclamation, faTemperatureLow, faBriefcase } from "@fortawesome/free-solid-svg-icons";

const iconStyleMap = {
    "Check-in Rate": faUserGroup,
    "Needs Attention": faCircleExclamation,
    "Average Mood": faTemperatureLow,
    "Average Workflow": faBriefcase,
};
const iconColorMap = {
    "Check-in Rate": 'var(--primary)',
    "Needs Attention": 'var(--accent)',
    "Average Mood": 'var(--secondary)',
    "Average Workflow": 'var(--highlight',
};


export default function DashboardCard({ title, number, detail }) {
    const iconStyle = iconStyleMap[title] || faUserGroup;
    const iconColor = iconColorMap[title] || 'var(--primary)'
    return (

        <div className='card'>
            <div className='card-left'>
                <span className='card-icon'><CardIcon icon={iconStyle} size='sm' color={iconColor} /></span>
                <span className='card-title'>{title}</span><br />
                <span className='card-nunmber'>{number}</span><br />
                <span className='card-detail'>{detail}</span><br />
            </div>
            <div className='card-right'></div>
        </div>
    )
}