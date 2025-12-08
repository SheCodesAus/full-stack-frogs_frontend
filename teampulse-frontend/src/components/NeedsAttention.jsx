import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faAngry, faFire } from '@fortawesome/free-solid-svg-icons';
import './NeedsAttentionBox.css';

export default function NeedsAttentionBox({ logs }) {
    const flaggedMembers = useMemo(() => {
        if (!logs || logs.length === 0) return [];

        const memberMap = {};

        logs.forEach(log => {
            if (!memberMap[log.user_id]) {
                memberMap[log.user_id] = {
                    user_id: log.user_id,
                    name: `${log.user_firstname} ${log.user_lastname}`,
                    mood_value: log.mood_value,
                    workload_value: log.workload_value,
                    timestamp: log.timestamp
                };
            } else {
                // Keep the most recent entry
                if (new Date(log.timestamp) > new Date(memberMap[log.user_id].timestamp)) {
                    memberMap[log.user_id] = {
                        user_id: log.user_id,
                        name: `${log.user_firstname} ${log.user_lastname}`,
                        mood_value: log.mood_value,
                        workload_value: log.workload_value,
                        timestamp: log.timestamp
                    };
                }
            }
        });

        return Object.values(memberMap).filter(member => 
            member.mood_value === 1 || member.workload_value === 1
        );
    }, [logs]);

    const getSeverity = (member) => {
        if (member.mood_value === 1 && member.workload_value === 1) return 'critical';
        if (member.mood_value === 1) return 'high';
        return 'medium';
    };

    const getReasonText = (member) => {
        if (member.mood_value === 1 && member.workload_value === 1) {
            return 'Low mood & overwhelmed with workload';
        }
        if (member.mood_value === 1) {
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
                <h3>Attention Needed</h3>
            </div>
            <div className='flagged-members'>
                {flaggedMembers.map((member) => (
                    <div key={member.user_id} className={`flag-item severity-${getSeverity(member)}`}>
                        <div className='flag-left'>
                            <FontAwesomeIcon 
                                icon={member.mood_value === 1 ? faAngry : faFire} 
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