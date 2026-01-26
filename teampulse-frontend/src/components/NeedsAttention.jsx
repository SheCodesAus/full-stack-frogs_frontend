import { useNeedsAttention } from '../hooks/use-needs-attention.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './NeedsAttentionBox.css';

export default function NeedsAttentionBox({ team }) {
    const { needsAttention, loading, error } = useNeedsAttention(team);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const flaggedMembers = needsAttention;

    const getReasonText = (member) => {
        if (member.mood === 1 && member.workload === 1) {
            return 'Low mood & Overwhelmed';
        }
        if (member.mood === 1) {
            return 'Low mood';
        }
        return 'Overwhelmed';
    };

    const getSeverity = (member) => {
        if (member.mood === 1 && member.workload === 1) return 'critical';
        if (member.mood === 1) return 'high';
        return 'medium';
    };

    if (flaggedMembers.length === 0) {
        return (
            <section className='needs-attention-box'>
                <div className='attention-header'>
                    <FontAwesomeIcon icon={faExclamationTriangle} className='attention-icon' />
                    <h3>Attention Needed</h3>
                </div>
                <p className='no-flags'>Great! No team members need immediate attention.</p>
            </section>
        );
    }

    return (
        <section className='needs-attention-box'>
            <div className='attention-header'>
                <FontAwesomeIcon icon={faExclamationTriangle} className='attention-icon' />
                <h3>Attention Needed</h3>
            </div>
            <div className='flagged-members-row'>
                {flaggedMembers.map((member) => (
                    <div key={member.user} className={`flag-item severity-${getSeverity(member)}`}>
                        <div className='flag-content'>
                            <p className='member-name'>{member.userName}</p>
                            <p className='flag-reason'>{getReasonText(member)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}