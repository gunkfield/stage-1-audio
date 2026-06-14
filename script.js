// ======================================
// SECURITY STUFF
// ======================================

document.addEventListener("contextmenu",
    e => e.preventDefault());

document.addEventListener("keydown",
    function(e)
    {
        if(e.key === "F12")
        {
            e.preventDefault();
        }

        if(e.ctrlKey &&
            e.shiftKey &&
            (
                e.key === "I" ||
                e.key === "J" ||
                e.key === "C"
            ))
        {
            e.preventDefault();
        }
    });


// ======================================
// SHA-256 HELPER
// ======================================

async function sha256(message)
{
    const encoder = new TextEncoder();

    const data =
        encoder.encode(message);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(b =>
            b.toString(16)
                .padStart(2,"0"))
        .join("");
}


// ======================================
// CUSTOMIZE THESE
// ======================================

// Example hash placeholder.
// Replace with your answer hash.

const ANSWER_HASH =
"f9e8ba7f8b6a96f50d31b4c6cb8eb66cdde0edd1996f92b16eb49c2c6fa86588";


// This should be encrypted later.
// Placeholder for now.

// Base64 encoded Stage 2 URL
const NEXT_URL_ENC =
"aHR0cHM6Ly9naXRodWIuY29tL2d1bmtmaWVsZC9zdGFnZS0yLWNpcGhlci5naXQ=";


// ======================================
// ANSWER CHECK
// ======================================

async function checkAnswer()
{
    const answer =
        document
            .getElementById(
                "answerInput")
            .value
            .trim()
            .toUpperCase();

    const hash =
        await sha256(answer);

    const result =
        document.getElementById(
            "result");

    if(hash === ANSWER_HASH)
    {
        const nextURL = atob(NEXT_URL_ENC);

                document.getElementById("result").innerHTML = `
                    <h2>Correct</h2>
                    <a href="${nextURL}" target="_blank">Continue to Stage 2</a>
                `;
    }
    else
    {
        result.innerHTML =
            "<p>Incorrect</p>";
    }
}