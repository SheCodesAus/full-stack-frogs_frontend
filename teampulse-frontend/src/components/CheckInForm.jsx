import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFaceGrinStars,
    faSmileBeam,
    faFlushed,
    faTired,
    faSun,
    faCloudSun,
    faCloudRain,
    faCloudBolt
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { createCheckIn } from "../api/post-createcheckin";
import { useAuth } from "../hooks/use-auth";

export default function CheckInForm() {
    const [mood, setMood] = useState(null);
    const [workload, setWorkload] = useState(null);
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { auth } = useAuth();

    const moodOptions = [
        { id: 1, label: "Empowered", icon: faFaceGrinStars },
        { id: 2, label: "Calm", icon: faSmileBeam },
        { id: 3, label: "Anxious", icon: faFlushed },
        { id: 4, label: "Angry", icon: faTired }
    ];

    const workloadOptions = [
        { id: 1, label: "Light", icon: faSun },
        { id: 2, label: "Manageable", icon: faCloudSun },
        { id: 3, label: "Under Pressure", icon: faCloudRain },
        { id: 4, label: "Overwhelmed", icon: faCloudBolt }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!mood || !workload) {
            setErrorMessage("Choose how you're feeling first — it helps us understand your day ✨");
            return;
        }

        if (!auth?.token) {
            setErrorMessage("You must be logged in to submit a check-in.");
            return;
        }

        setIsSubmitting(true);

        const payload = {
            mood,
            workload,
            comment: notes,
            team: auth.user?.team || null, 
            timestamp: new Date().toISOString(),
        };

        try {
            await createCheckIn(payload, auth.token);

            setSuccessMessage("Thank you for checking in. Your feelings are valid and appreciated.");
            setMood(null);
            setWorkload(null);
            setNotes("");
        } catch (err) {
            console.error(err);
            setErrorMessage(
                err.message ||
                "Your check-in didn't save, but your feelings still matter. Want to give it another try?"
            );
        }

        setIsSubmitting(false);
    };

    return (
        <div className="survey-container">


            <h2>Share how you are, so we can help build a better workplace together</h2>

            <form onSubmit={handleSubmit} className="survey-form">

                {/* Mood */}
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
                                <FontAwesomeIcon icon={option.icon} size="2x" />
                                <span>{option.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Workload */}
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
                                <FontAwesomeIcon icon={option.icon} size="2x" />
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

                {/* Errors / Success */}
                {errorMessage && <p className="error-msg">{errorMessage}</p>}
                {successMessage && <p className="success-msg">{successMessage}</p>}

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Check-In"}
                </button>
            </form>
        </div>
    );
}
