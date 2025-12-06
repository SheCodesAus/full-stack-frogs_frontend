import React from "react";
import useCheckIns from "../hooks/use-checkins";

export default function AllCheckinsView({ selectedTeam }) {
    const { checkins, isLoading, error } = useCheckIns();

    if (isLoading) return <p>Loading check-ins...</p>;
    if (error) return <p>Error loading check-ins 😕</p>;

    const filtered = checkins.filter((item) => item.team === selectedTeam);

    return (
        <div className="raw-data-container">
            <h2>All Check-ins (Raw Data)</h2>

            <table className="raw-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mood</th>
                        <th>Workload</th>
                        <th>Notes</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.map((item) => (
                        <tr key={item.id}>
                            <td>{item.user_firstname} {item.user_lastname}</td>
                            <td>{item.mood_label}</td>
                            <td>{item.workload_label}</td>
                            <td>{item.comment || "—"}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
