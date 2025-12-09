import { useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faAngry, faFire } from '@fortawesome/free-solid-svg-icons';
import './NeedsAttentionBox.css';

export default function NeedsAttention({ logs = [] }) {
    // Debug log
    useEffect(() => {
        console.log('NeedsAttention logs:', logs);
        console.log('Logs length:', logs.length);
        if (logs.length > 0) {
            console.log('First log:', logs[0]);
        }
    }, [logs]);

    const flaggedMembers = useMemo(() => {
        if (!logs || logs.length === 0) return [];

        const memberMap = {};

        logs.forEach(log => {
            if (!memberMap[log.user]) {
                memberMap[log.user] = {
                    user_id: log.user,
                    name: `${log.first_name || ''} ${log.last_name || ''}`.trim() || 'Unknown',
                    mood_value: log.mood_value,
                    workload_value: log.workload_value,
                    timestamp: log.timestamp
                };
            } else {
                if (new Date(log.timestamp) > new Date(memberMap[log.user].timestamp)) {
                    memberMap[log.user] = {
                        user_id: log.user,
                        name: `${log.first_name || ''} ${log.last_name || ''}`.trim() || 'Unknown',
                        mood_value: log.mood_value,
                        workload_value: log.workload_value,
                        timestamp: log.timestamp
                    };
                }
            }
        });

        const flagged = Object.values(memberMap).filter(member => 
            Math.round(member.mood_value) === 1 || Math.round(member.workload_value) === 1
        );
        console.log('Flagged members:', flagged);
        return flagged;
    }, [logs]);

    const getSeverity = (member) => {
        const moodVal = Math.round(member.mood_value);
        const workloadVal = Math.round(member.workload_value);
        if (moodVal === 1 && workloadVal === 1) return 'critical';
        if (moodVal === 1) return 'high';
        return 'medium';
    };

    const getReasonText = (member) => {
        const moodVal = Math.round(member.mood_value);
        const workloadVal = Math.round(member.workload_value);
        
        if (moodVal === 1 && workloadVal === 1) {
            return 'Low mood & overwhelmed with workload';
        }
        if (moodVal === 1) {
            return 'Low mood detected';
        }
        return 'Overwhelmed with workload';
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
                <h3>Attention Needed ({flaggedMembers.length})</h3>
            </div>
            <div className='flagged-members'>
                {flaggedMembers.map((member) => (
                    <div key={`member-${member.user_id}`} className={`flag-item severity-${getSeverity(member)}`}>
                        <div className='flag-left'>
                            <FontAwesomeIcon 
                                icon={Math.round(member.mood_value) === 1 ? faAngry : faFire} 
                                className='flag-icon'
                            />
                            <div className='flag-info'>
                                <p className='member-name'>{member.name}</p>
                                <p className='flag-reason'>{getReasonText(member)}</p>
                            </div>
                        </div>
                        <span className={`severity-badge severity-${getSeverity(member)}`}>
                            {getSeverity(member).toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}