let wallet;

const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const accountInfo = document.getElementById('accountInfo');

async function connectWallet() {
    try {
        if (window.solana && window.solana.isPhantom) {
            wallet = window.solana;
            await wallet.connect();
            wallet.on("connect", () => {
                console.log("Connected to Phantom wallet!");
                updateUI();
            });
        } else {
            alert('Phantom wallet not found. Please install it from https://phantom.app/');
        }
    } catch (err) {
        console.error('Failed to connect to Phantom wallet:', err);
    }
}

function disconnectWallet() {
    if (wallet) {
        wallet.disconnect();
        wallet.on('disconnect', () => {
            console.log("Disconnected from Phantom wallet!");
            updateUI();
        });
    }
}

function updateUI() {
    if (wallet && wallet.isConnected) {
        connectButton.style.display = 'none';
        disconnectButton.style.display = 'block';
        accountInfo.textContent = `Connected Account: ${wallet.publicKey.toString()}`;
    } else {
        connectButton.style.display = 'block';
        disconnectButton.style.display = 'none';
        accountInfo.textContent = 'Not connected';
    }
}

connectButton.addEventListener('click', connectWallet);
disconnectButton.addEventListener('click', disconnectWallet);

// Initial UI update
updateUI();