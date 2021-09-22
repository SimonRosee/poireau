const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Quel est ton nom ?  ', (answer) => {console.log(`Bonjour ${answer} !`);

rl.close();
});
