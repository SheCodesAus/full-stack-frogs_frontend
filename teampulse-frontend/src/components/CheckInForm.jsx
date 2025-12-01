import React, { useState } from "react";
import { motion } from "framer-motion";
import { createCheckIn } from "../api/post-createcheckin";

export default function CheckInForm() {
    const [mood, setMood] = useState(null);
    const [workload, setWorkload] = useState(null);
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!mood || !workload) {
            setErrorMessage("Choose how you're feeling first — it helps us understand your day ✨");
            return;
        }

        setIsSubmitting(true);

        const payload = { mood, workload, notes, timestamp: new Date().toISOString() };

        try {
            await createCheckIn(payload);

            setSuccessMessage("Thanks for checking in 💛 Your feelings are valid and appreciated.");
            setMood(null);
            setWorkload(null);
            setNotes("");
        } catch (err) {
            setErrorMessage(
                "Oops! Our system spilled its coffee ☕ Your check-in didn’t save, but your feelings still matter. Want to give it another try?"
            );
        }

        setIsSubmitting(false);
    };

    return (
        <div className="survey-container">
            <h2>Share where you are at, so we can help build a better workplace together</h2>

            <form onSubmit={handleSubmit} className="survey-form">
                {/* Mood Selection */}
                <section>
                    <h3>How is your mood?</h3>
                    <div className="options-grid">
                        {moodOptions.map((option) => (
                            <motion.button
                                type="button"
                                key={option.id}
                                whileTap={{ scale: 0.95 }}
                                className={`option-card ${mood === option.id ? "selected" : ""}`}
                                onClick={() => setMood(option.id)}
                            >
                                <span className="emoji">{option.emoji}</span>
                                <span>{option.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Workload Selection */}
                <section>
                    <h3>Where is your workload at?</h3>
                    <div className="options-grid">
                        {workloadOptions.map((option) => (
                            <motion.button
                                type="button"
                                key={option.id}
                                whileTap={{ scale: 0.95 }}
                                className={`option-card ${workload === option.id ? "selected" : ""}`}
                                onClick={() => setWorkload(option.id)}
                            >
                                <span className="emoji">{option.emoji}</span>
                                <span>{option.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Notes */}
                <section>
                    <h3>Anything you'd like to share?</h3>
                    <textarea
                        placeholder="Your thoughts are safe here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="notes-box"
                    />
                </section>

                {/* Error / Success Messages */}
                {errorMessage && <p className="error-msg">{errorMessage}</p>}
                {successMessage && <p className="success-msg">{successMessage}</p>}

                {/* Submit Button */}
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Check-In"}
                </button>
            </form>
        </div>
    );
}