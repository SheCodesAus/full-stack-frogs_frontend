import './DashboardCard.css';
import CardIcon from './CardIcon';
import { faUserGroup, faCircleExclamation, faTemperatureLow, faBriefcase } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
    "Check-in Rate": faUserGroup,
    "Needs Attention": faCircleExclamation,
    "Average Mood": faTemperatureLow,
    "Average Workflow": faBriefcase,
};
export default function DashboardCard({ title, number, detail }) {
    const icon = iconMap[title] || faUserGroup;
    return (

        <div className='card'>
            <div className='card-left'>
                <span className='card-icon'><CardIcon icon={icon} size='sm' color='var(--primary)' /></span>
                <span className='card-title'>{title}</span><br />
                <span className='card-nunmber'>{number}</span><br />
                <span className='card-detail'>{detail}</span><br />
            </div>
            <div className='card-right'></div>

        </div>
    )
}