const API_KEY2 = ""
async function generateImage(description) {
    const apiKey = API_KEY2;
    const dalleApiUrl = 'https://api.openai.com/v1/images/generations';

    try {
        const response = await fetch(dalleApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "dall-e-2", // Cheapest model
                prompt: description,
                n: 1,
                size: "512x512"
            })
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            return data.data[0].url;
        } else {
            console.error("DALL·E API Error:", data);
            return null;
        }
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
}

async function assignImagesToCards(descriptions) {
    const cards = document.querySelectorAll('.card');


    console.log("images being generated");

    // Pause for 2 seconds to avoid rate limiting


    var length = descriptions.length;

    // length = min(length, 8)
    // const length = 1
    length = Math.min(length, 8);

    console.log(length);

    for (let i = 1; i <= length; i++) {
        const description = descriptions[(i - 1) % descriptions.length]; // Loop descriptions if more cards exist
        const imageUrl = await generateImage(description);
        console.log(imageUrl);

        if (imageUrl) {
            // for every card which has the card.dataset.card = i then set the background image to the imageUrl
            cards.forEach(card => {
                const cardNumber = card.querySelector('.card-inner').innerText;

                console.log(cardNumber, i, cardNumber == i);

                if ( cardNumber == i ) {
                    card.style.setProperty('--card-bg', `url(${imageUrl})`);
                    console.log(card);
                }
            });

        }

        console.log("out of loop");
    }

}

// Run the function when the page loads
