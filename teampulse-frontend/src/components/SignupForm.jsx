import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";
import useTeams from "../hooks/use-teams";
import postSignup from "../api/post-signup";

function SignupForm() {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teamId, setTeamId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { teams, isLoading, error: teamsError } = useTeams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!username || !firstName || !surname || !email || !password || !teamId) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const createdUser = await postSignup({
                username,
                firstName,
                surname,
                email,
                password,
                teamId,
            });

            console.log("SIGNUP SUCCESS:", createdUser);
            navigate("/checkin");

        } catch (err) {
            setError(err.message || "Signup failed.");
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="Your awesome name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Surname</label>
                    <input
                        type="text"
                        placeholder="Your awesome surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
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
                    {isLoading ? (
                        <p>Loading teams...</p>
                    ) : teamsError ? (
                        <p>Error loading teams</p>
                    ) : (
                        <select
                            value={teamId}
                            onChange={(e) => setTeamId(e.target.value)}
                        >
                            <option value="">Choose a team</option>
                            {teams.map((team) => (
                                <option key={team.Id} value={team.Id}>
                                    {team.team_name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <button type="submit" className="signup-button">
                    Join teampulse
                </button>
            </form>
        </div>
    );
}

export default SignupForm;