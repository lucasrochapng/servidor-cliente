const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const HOST = 'localhost';
const PORT = 6000;

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMessage(message) {
    client.send(message, PORT, HOST, (err) => {
        if (err) {
            console.error(`Erro ao enviar mensagem: ${err}`);
        }
    });
}

client.on('message', (message) => {
    console.log(`\nMsg Recebida: ${message.toString()}`);
    rl.prompt();
});

client.on('error', (err) => {
    console.error(`Erro do cliente UDP: ${err}`);
    client.close();
});

rl.setPrompt('Digite uma mensagem: ');
rl.prompt();

rl.on('line', (input) => {
    sendMessage(input);
});

rl.on('close', () => {
    console.log('\nCliente encerrado.');
    client.close()
});
