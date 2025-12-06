import React from "react";
import useCheckIns from "../hooks/use-checkins";
import "./AllCheckinView.css";

export default function AllCheckinsView() {
    // Pega todos os check-ins da semana via hook
    const { checkins, isLoading, error } = useCheckIns();

    if (isLoading) return <p>Loading check-ins...</p>;
    if (error) return <p>Error loading check-ins 😕</p>;

    console.log("All check-ins:", checkins);

    const moodOptions = [
        { id: 1, label: "Motivated", emoji: "⚡" },
        { id: 2, label: "Calm", emoji: "😊" },
        { id: 3, label: "Anxious", emoji: "🌧️" },
        { id: 4, label: "Angry", emoji: "😠" }
    ];

    const workloadOptions = [
        { id: 1, label: "Light", emoji: "🙂" },
        { id: 2, label: "Manageable", emoji: "📈" },
        { id: 3, label: "Under Pressure", emoji: "📉" },
        { id: 4, label: "Overwhelmed", emoji: "🔥" }
    ];

    if (!checkins || checkins.length === 0) {
        return <p>No check-ins for this week.</p>;
    }

    return (
        <div className="checkin-container">
            {checkins.map(item => (
                <div key={item.id} className="checkin-card">
                    <h3>{item.first_name} {item.last_name}</h3>
                    <div><strong>Mood:</strong> {moodOptions.find(m => m.id === item.mood)?.label}</div>
                    <div><strong>Workload:</strong> {workloadOptions.find(w => w.id === item.workload)?.label}</div>
                    <div><strong>Comments:</strong> {item.comment || "—"}</div>
                    {/* Mostra só a data da semana, sem hora */}
                    <div className="timestamp">{new Date(item.timestamp).toLocaleDateString()}</div>
                </div>
            ))}
        </div>
    );
}