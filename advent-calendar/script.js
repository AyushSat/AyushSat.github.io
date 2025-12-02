import { adventData } from './content.js';

const grid = document.getElementById('calendar-grid');
const modal = document.getElementById('entry-modal');
const modalImg = document.getElementById('modal-image');
const modalText = document.getElementById('modal-text');

// Configuration
const TARGET_YEAR = 2025;
const TARGET_MONTH = 11; // December is 11 (0-indexed)

// Helper to check if a day is unlockable
function isUnlockable(day) {
    const now = new Date();
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';

    if (isPreview) return true;

    // If it's not December 2025 yet, everything is locked (unless preview)
    if (now.getFullYear() < TARGET_YEAR) return false;
    if (now.getFullYear() === TARGET_YEAR && now.getMonth() < TARGET_MONTH) return false;

    // If it's past December 2025, everything is unlocked
    if (now.getFullYear() > TARGET_YEAR) return true;

    // It is December 2025
    return now.getDate() >= day;
}

function createCalendar() {
    adventData.forEach(entry => {
        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');
        dayCard.textContent = entry.day;

        if (isUnlockable(entry.day)) {
            dayCard.addEventListener('click', () => openEntry(entry));
        } else {
            dayCard.classList.add('locked');
            dayCard.title = "Not yet! Wait for the day to come ❤️";
        }

        grid.appendChild(dayCard);
    });
}

function openEntry(entry) {
    modal.style.display = 'flex';

    // Reset envelope state
    const envelope = document.querySelector('.envelope');
    envelope.classList.remove('open');

    // Reset content
    modalImg.src = entry.image;
    modalText.textContent = entry.text; // Set text immediately

    // Trigger envelope animation after a short delay
    setTimeout(() => {
        envelope.classList.add('open');
    }, 100);

    // Mark as opened visually
    const cards = document.querySelectorAll('.day-card');
    cards.forEach(card => {
        if (parseInt(card.textContent) === entry.day) {
            card.classList.add('opened');
        }
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    const envelope = document.querySelector('.envelope');
    envelope.classList.remove('open');
}

// Initialize
createCalendar();

// Add falling elements (snowflakes and hearts)
function addFallingElements() {
    const count = 30;
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');

        // Randomly choose between snowflake and heart
        if (Math.random() > 0.5) {
            element.classList.add('snowflake');
            element.textContent = '❄';
            element.style.opacity = 1;
            element.style.fontSize = Math.random() * 2 + 1 + 'em';
        } else {
            element.classList.add('heart');
            element.textContent = '❤️';
            element.style.opacity = Math.random();
        }

        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5-10s
        element.style.animationDelay = (Math.random() * 5) + 's';
        document.body.appendChild(element);
    }
}

addFallingElements();
