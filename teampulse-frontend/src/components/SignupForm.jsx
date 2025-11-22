import { useState } from "react";
import "./signupform.css";
import AuthToggle from "./AuthToggle.jsx";

function SignupForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teamId, setTeamId] = useState("");
    const [error, setError] = useState("");


    const teams = [
        { id: "1", name: "Team A" },
        { id: "2", name: "Team B" },
        { id: "3", name: "Team C" },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!name || !email || !password || !teamId) {
            setError("Please fill in all fields.");
            return;
        }

        try { // future API call  
            console.log("SIGNUP SENDING:", { name, email, password, teamId });
        } catch (err) {
            setError("Oops! We need all the info to get you started");
        }
    };

    return (
        <div className="signup-page">
            <AuthToggle current="signup" />

            <form className="signup-form" onSubmit={handleSubmit}>
                {error && <div className="error-box">{error}</div>}

                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Your awesome name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="you@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Select your team</label>
                    <select
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                    >
                        <option value="">Choose a team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="signup-button">
                    Join TeamPulse
                </button>
            </form>
        </div>
    );
}

export default SignupForm;