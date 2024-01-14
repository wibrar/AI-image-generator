export const getImageData = async (input) => {
    try {
        async function query(data) {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                {
                    headers: { Authorization: "Bearer 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" },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
        }

        const imageBlob = await query({ "inputs": input });

        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);

        reader.onloadend = () => {
            const base64data = reader.result;
            return base64data;
        };
    } catch (error) {
        console.error("Error fetching image:", error);
    }
};