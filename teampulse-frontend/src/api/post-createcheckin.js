export async function createCheckIn(payload) {
    const response = await fetch("/api/wellbeing/create/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Hmm… looks like our system got a little overwhelmed. Your check-in didn’t go through, but your feelings still matter. Try submitting again when you’re ready.");
    }

    return response.json();
}