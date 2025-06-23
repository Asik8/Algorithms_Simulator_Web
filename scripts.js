// Utility to get elements
const $ = (selector) => document.querySelector(selector);

const algoListSection = $('#algorithm-list');
const simulatorSection = $('#simulator');
const algoTitle = $('#algo-title');
const inputSection = $('#input-section');
const visualization = $('#visualization');
const explanation = $('#explanation');
const prevBtn = $('#prev-step');
const nextBtn = $('#next-step');
const backBtn = $('#back-to-home');

let currentAlgo = null;
let steps = [];
let currentStep = 0;

// Show simulator for selected algorithm
function showSimulator(algo) {
    currentAlgo = algo;
    algoListSection.classList.add('hidden');
    simulatorSection.classList.remove('hidden');
    algoTitle.textContent = algoToTitle(algo) + ' Simulation';
    inputSection.innerHTML = '';
    visualization.innerHTML = '';
    explanation.innerHTML = '';
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    backBtn.classList.add('hidden');

    if (algo === 'linear-search') {
        renderLinearSearchInput();
    }
    // Add more algorithms here
}

function algoToTitle(algo) {
    switch (algo) {
        case 'linear-search': return 'Linear Search';
        case 'bubble-sort': return 'Bubble Sort';
        case 'binary-search': return 'Binary Search';
        default: return algo;
    }
}

// Render input fields for Linear Search
function renderLinearSearchInput() {
    inputSection.innerHTML = `
        <form id="ls-form">
            <label>Enter array (comma separated):<br>
                <input type="text" id="ls-array" required placeholder="e.g. 2, 5, 8, 1, 9">
            </label><br><br>
            <label>Number to search:<br>
                <input type="number" id="ls-target" required placeholder="e.g. 8">
            </label><br><br>
            <button type="submit">Start Simulation</button>
        </form>
    `;
    $('#ls-form').onsubmit = handleLinearSearchInput;
}

// Handle Linear Search input submission
function handleLinearSearchInput(e) {
    e.preventDefault();
    const arrStr = $('#ls-array').value.trim();
    const targetStr = $('#ls-target').value.trim();
    if (!arrStr || !targetStr) return;
    const arr = arrStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    const target = Number(targetStr);
    if (arr.length === 0 || isNaN(target)) {
        alert('Please enter a valid array and target number.');
        return;
    }
    steps = buildLinearSearchSteps(arr, target);
    currentStep = 0;
    inputSection.innerHTML = '';
    updateLinearSearchStep();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    backBtn.classList.remove('hidden');
}

// Build step-by-step states for Linear Search
function buildLinearSearchSteps(arr, target) {
    const steps = [];
    for (let i = 0; i < arr.length; i++) {
        steps.push({
            arr,
            target,
            index: i,
            found: arr[i] === target,
            done: arr[i] === target,
        });
        if (arr[i] === target) break;
    }
    // If not found, add a final step
    if (!arr.includes(target)) {
        steps.push({
            arr,
            target,
            index: arr.length,
            found: false,
            done: true,
        });
    }
    return steps;
}

// Update the visualization and explanation for the current step
function updateLinearSearchStep() {
    if (!steps.length) return;
    const step = steps[currentStep];
    // Visualization
    visualization.innerHTML = step.arr.map((num, idx) => {
        let cls = '';
        if (idx === step.index && !step.done) cls = 'current';
        if (idx === step.index && step.found) cls = 'found';
        return `<span class="ls-item ${cls}">${num}</span>`;
    }).join(' ');
    // Explanation
    if (step.index >= step.arr.length) {
        explanation.textContent = `Number ${step.target} was not found in the array.`;
    } else if (step.found) {
        explanation.textContent = `Element at index ${step.index} is ${step.arr[step.index]}, which matches the target ${step.target}. Search complete!`;
    } else {
        explanation.textContent = `Checking element at index ${step.index}: ${step.arr[step.index]}. Not a match, moving to the next element.`;
    }
    // Button states
    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = currentStep === steps.length - 1;
}

// Step navigation
prevBtn.onclick = function() {
    if (currentStep > 0) {
        currentStep--;
        updateLinearSearchStep();
    }
};
nextBtn.onclick = function() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateLinearSearchStep();
    }
};

// Back to home
backBtn.onclick = function() {
    simulatorSection.classList.add('hidden');
    algoListSection.classList.remove('hidden');
    inputSection.innerHTML = '';
    visualization.innerHTML = '';
    explanation.innerHTML = '';
    steps = [];
    currentStep = 0;
};

// Algorithm selection
[...document.querySelectorAll('.algo-btn')].forEach(btn => {
    btn.addEventListener('click', function() {
        showSimulator(btn.dataset.algo);
    });
});

// Add styles for visualization highlights
document.head.insertAdjacentHTML('beforeend', `<style>
.ls-item {
    display: inline-block;
    min-width: 2.2em;
    padding: 0.5em 0.7em;
    margin: 0 0.2em;
    border-radius: 6px;
    background: #e3edff;
    font-size: 1.1em;
    transition: background 0.2s, color 0.2s;
}
.ls-item.current {
    background: #ffb84f;
    color: #fff;
    font-weight: bold;
}
.ls-item.found {
    background: #4f8cff;
    color: #fff;
    font-weight: bold;
}
</style>`);
