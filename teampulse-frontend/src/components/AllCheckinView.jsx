import React from "react";
import useCheckIns from "../hooks/use-checkins";

export default function AllCheckinsView() {
    const { checkins, isLoading, error } = useCheckIns();

    if (isLoading) return <p>Loading check-ins...</p>;
    if (error) return <p>Error loading check-ins 😕</p>;

    return (
        <div className="raw-data-container">
            <h2>All Check-ins (Raw Data)</h2>

            <table className="raw-table">
                <thead>
                    <tr>
                        <th>Mood</th>
                        <th>Workload</th>
                        <th>Notes</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>

                <tbody>
                    {checkins.map((item) => (
                        <tr key={item.id}>
                            <td>{item.mood}</td>
                            <td>{item.workload}</td>
                            <td>{item.notes || "—"}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
