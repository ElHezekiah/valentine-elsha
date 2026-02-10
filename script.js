// script.js

// --- 1. LOGIKA MUSIK ---
const musik = document.getElementById('bgMusic');
if (musik) {
    musik.volume = 0.05;
    const putarMusik = () => {
        musik.play().catch(e => console.log("Musik nunggu interaksi..."));
    };
    document.addEventListener('mousemove', putarMusik, { once: true });
    document.addEventListener('click', putarMusik, { once: true });
    document.addEventListener('touchstart', putarMusik, { once: true });
}

// --- 2. TOMBOL LARI (Hanya di index.html) ---
document.addEventListener('mouseover', (e) => {
    if (e.target.id === 'btnGak') {
        const b = e.target;
        const x = Math.random() * (window.innerWidth - b.offsetWidth);
        const y = Math.random() * (window.innerHeight - b.offsetHeight);
        b.style.position = 'fixed';
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
    }
});

// --- 3. FUNGSI KIRIM WA (Hanya di pesan.html) ---
function kirimWA() {
    const nomorWA = "6282294191447"; 
    const pesanInput = document.getElementById('pesanDoi');
    if (pesanInput) {
        const pesan = pesanInput.value;
        if (pesan && pesan.trim() !== "") {
            const url = `https://api.whatsapp.com/send?phone=${nomorWA}&text=Halo Sayang! Ini perasaan aku:%0A${encodeURIComponent(pesan)}`;
            window.open(url, '_blank');
        } else {
            alert("Isi dulu pesannya, Elsha sayang! ❤️");
        }
    }
}

// --- 4. KONTROL VIDEO (Hanya di video.html) ---
const vidUtama = document.getElementById('vidDoi');
const vidLatar = document.getElementById('bgVideoBlok');

if (vidUtama && vidLatar) {
    vidUtama.onplay = () => {
        vidLatar.play();
        vidLatar.currentTime = vidUtama.currentTime;
    };
    vidUtama.onpause = () => {
        vidLatar.pause();
    };
}

// --- 5. EFEK HUJAN FOTO & MAWAR (Hanya di video.html) ---
let sisiSekarang = 0; // 0 untuk kiri, 1 untuk kanan

function hujanCinta() {
    const vidCek = document.getElementById('vidDoi');
    if (!vidCek) return;

    const container = document.body;
    const daftarFoto = [
        '1766599747464.jpg', '1766599747473.jpg', 'IMG-20250412-WA0059.jpg', 
        'IMG-20250419-WA0010.jpg', 'IMG-20250419-WA0012.jpg', 'IMG-20250419-WA0016.jpg', 
        'IMG-20250729-WA0056.jpg', 'IMG-20250729-WA0057.jpg', 'IMG-20250729-WA0058.jpg'
    ];

    // Jalur yang lebih presisi
    const jalurKiri = [5, 12, 18];
    const jalurKanan = [82, 88, 94];

    setInterval(() => {
        const drop = document.createElement('div');
        const isFoto = Math.random() > 0.4; 
        
        if (isFoto) {
            const img = document.createElement('img');
            const fotoAcak = daftarFoto[Math.floor(Math.random() * daftarFoto.length)];
            img.src = fotoAcak; 
            img.className = 'hujan-foto';
            drop.appendChild(img);
            drop.className = 'hujan-item';

            // --- JURUS ADIL MERATA ---
            let xPos;
            if (sisiSekarang === 0) {
                // Jatuh di Kiri
                xPos = jalurKiri[Math.floor(Math.random() * jalurKiri.length)];
                sisiSekarang = 1; // Habis kiri, giliran kanan
            } else {
                // Jatuh di Kanan
                xPos = jalurKanan[Math.floor(Math.random() * jalurKanan.length)];
                sisiSekarang = 0; // Habis kanan, giliran kiri
            }
            
            const variasi = (Math.random() * 4) - 2;
            drop.style.left = (xPos + variasi) + 'vw';

        } else {
            // MAWAR: Tetap bebas biar gak kaku
            drop.innerHTML = '🌹';
            drop.className = 'hujan-item hujan-mawar';
            drop.style.left = (Math.random() * 100) + 'vw';
        }

        const durasi = (Math.random() * 2 + 5) + 's'; 
        drop.style.animationDuration = durasi;

        container.appendChild(drop);
        setTimeout(() => { drop.remove(); }, 7000);
    }, 700); 
}

// --- 6. EFEK SAKURA (Hanya di index.html & pesan.html) ---
// Kita buat sakura cuma muncul kalau BUKAN di halaman video biar gak tabrakan
if (!document.getElementById('vidDoi')) {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '🌸';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 500);
} else {
    // Kalau di halaman video, jalankan hujan foto
    hujanCinta();
}