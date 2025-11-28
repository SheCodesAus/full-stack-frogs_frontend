import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupform.css";
import { getTeams } from "../api/teams";

function SignupForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teamId, setTeamId] = useState("");
    const [error, setError] = useState("");
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        async function loadTeams() {
            try {
                const data = await getTeams();
                setTeams(data);
            } catch (err) {
                console.error("Failed to load teams:", err);
            }
        }

        loadTeams();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!name || !email || !password || !teamId) {
            setError("Please fill in all fields.");
            return;
        }

        try { // future API call  
            console.log("SIGNUP SENDING:", { name, email, password, teamId });
            navigate("/checkin");
        } catch (err) {
            setError("Oops! We need all the info to get you started");
        }
    };

    return (
        <div className="signup-page">

            <form className="signup-form" onSubmit={handleSubmit}>
                {error && <div className="error-box">{error}</div>}

                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Create your username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Fisrt Name</label>
                    <input
                        type="text"
                        placeholder="Your awesome name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Surname</label>
                    <input
                        type="text"
                        placeholder="Your awesome surname"
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
                    Join teampulse
                </button>
            </form>
        </div>
    );
}

export default SignupForm;