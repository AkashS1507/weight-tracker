const addBtn = document.getElementById('addBtn');
const weightInput = document.getElementById('weightInput');
const lastWeightsList = document.getElementById('lastWeights');
const highestWeight = document.getElementById('highestWeight');
const lowestWeight = document.getElementById('lowestWeight');

let weights = JSON.parse(localStorage.getItem('weights')) || [];

// Helper to get date format YYYY-MM-DD
function getToday() {
    return new Date().toISOString().split("T")[0];
}

function renderWeights() {
    if (weights.length === 0) {
        lastWeightsList.innerHTML = '<li class="empty">No data yet</li>';
        highestWeight.textContent = '--';
        lowestWeight.textContent = '--';
        return;
    }

    // Last 3 days (reverse)
    const lastThree = weights.slice(-3).reverse();
    lastWeightsList.innerHTML = lastThree.map(w => `<li>${w.weight} kg</li>`).join('');


    const allWeights = weights.map(w => w.weight);
    highestWeight.textContent = Math.max(...allWeights) + ' kg';
    lowestWeight.textContent = Math.min(...allWeights) + ' kg';
}

addBtn.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    if (isNaN(weight) || weight <= 0) return;

    const today = getToday();

    // Check if today's entry already exists
    const existing = weights.find(w => w.date === today);

    if (existing) {
        existing.weight = weight; // update today's weight
    } else {
        weights.push({ date: today, weight });
    }

    localStorage.setItem('weights', JSON.stringify(weights));
    weightInput.value = '';
    renderWeights();
});

renderWeights();

// Reset button
const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', () => {
    if (!confirm("Reset all saved weight data?")) return;

    localStorage.removeItem('weights');
    weights = [];
    renderWeights();
});
