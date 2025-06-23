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

const legendId = 'bs-legend';

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
    backBtn.classList.remove('hidden');

    // Remove any previous legend
    const oldLegend = document.getElementById(legendId);
    if (oldLegend) oldLegend.remove();

    if (algo === 'linear-search') {
        renderLinearSearchInput();
    }
    if (algo === 'binary-search') {
        renderBinarySearchInput();
        renderBinarySearchLegend();
    }
    if (algo === 'bubble-sort') {
        renderBubbleSortTheory();
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
    renderLinearSearchTheory();
}

// Show linear search theory, complexities, use cases, and example before input fields
function renderLinearSearchTheory() {
    inputSection.innerHTML = `
        <div class="algo-info-box">
            <b>Linear Search - Theoretical Knowledge</b><br>
            <ul style='margin:0.7em 0 0 1.2em;'>
                <li><b>Definition:</b> Linear Search checks each element in the array one by one to find the target value.</li>
                <li><b>Time Complexity:</b> O(n) &mdash; may need to check every element.</li>
                <li><b>Space Complexity:</b> O(1) &mdash; only a few variables are used.</li>
                <li><b>Use Cases:</b>
                    <ul style='margin:0.3em 0 0 1.2em;'>
                        <li>Searching in small or unsorted arrays</li>
                        <li>When the array is not sorted</li>
                        <li>Checking for the presence of a value in a list</li>
                    </ul>
                </li>
                <li><b>Example:</b><br>
                    <span style='display:inline-block;background:#f0f4fa;padding:0.5em 0.8em;border-radius:6px;'>
                        Array: [<b>4</b>, 2, 7, 1, 9]<br>
                        Target: <b>7</b><br>
                        Steps:<br>
                        1. index=0, arr[0]=4. 4 ≠ 7.<br>
                        2. index=1, arr[1]=2. 2 ≠ 7.<br>
                        3. index=2, arr[2]=7. 7 == 7, found at index 2.
                    </span>
                </li>
            </ul>
        </div>
        <button id="ls-start-sim-btn" style="margin-bottom:1.2em;">Start Simulation</button>
    `;
    document.getElementById('ls-start-sim-btn').onclick = function() {
        renderLinearSearchInputForm();
    };
}

function renderLinearSearchInputForm() {
    inputSection.innerHTML = `
        <form id="ls-form">
            <label>Enter array (comma separated):<br>
                <input type="text" id="ls-array" required placeholder="e.g. 2, 5, 8, 1, 9">
            </label><br><br>
            <label>Number to search:<br>
                <input type="number" id="ls-target" required placeholder="e.g. 8">
            </label><br><br>
            <button type="submit">Simulate</button>
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
        return `<span class="ls-item ${cls}">
            <div>${num}</div>
            <div class="ls-index">${idx}</div>
        </span>`;
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
    const oldLegend = document.getElementById(legendId);
    if (oldLegend) oldLegend.remove();
};

// Algorithm selection
[...document.querySelectorAll('.algo-btn')].forEach(btn => {
    btn.addEventListener('click', function() {
        showSimulator(btn.dataset.algo);
    });
});

// Render input fields for Binary Search
function renderBinarySearchInput() {
    renderBinarySearchTheory();
}

// Show binary search theory, complexities, use cases, and example before input fields
function renderBinarySearchTheory() {
    inputSection.innerHTML = `
        <div class="algo-info-box">
            <b>Binary Search - Theoretical Knowledge</b><br>
            <ul style='margin:0.7em 0 0 1.2em;'>
                <li><b>Definition:</b> Binary Search is a fast algorithm to find a value in a <b>sorted</b> array by repeatedly dividing the search interval in half.</li>
                <li><b>Time Complexity:</b> O(log n) &mdash; halves the search space each step.</li>
                <li><b>Space Complexity:</b> O(1) for iterative, O(log n) for recursive (due to call stack).</li>
                <li><b>Use Cases:</b>
                    <ul style='margin:0.3em 0 0 1.2em;'>
                        <li>Searching in sorted arrays or lists</li>
                        <li>Finding boundaries (lower/upper bounds) in sorted data</li>
                        <li>Efficient lookups in databases, dictionaries, etc.</li>
                    </ul>
                </li>
                <li><b>Example:</b><br>
                    <span style='display:inline-block;background:#f0f4fa;padding:0.5em 0.8em;border-radius:6px;'>
                        Array: [1, <b>3</b>, 5, 7, 9, 11, 13]<br>
                        Target: <b>3</b><br>
                        Steps:<br>
                        1. low=0, high=6, mid=3 (arr[3]=7). 3 &lt; 7, so high=2.<br>
                        2. low=0, high=2, mid=1 (arr[1]=3). 3 == 3, found at index 1.
                    </span>
                </li>
            </ul>
        </div>
        <button id="bs-start-sim-btn" style="margin-bottom:1.2em;">Start Simulation</button>
    `;
    document.getElementById('bs-start-sim-btn').onclick = function() {
        renderBinarySearchInputForm();
    };
}

function renderBinarySearchInputForm() {
    inputSection.innerHTML = `
        <form id="bs-form">
            <label>Enter sorted array (comma separated):<br>
                <input type="text" id="bs-array" required placeholder="e.g. 1, 2, 5, 8, 9">
            </label><br><br>
            <label>Number to search:<br>
                <input type="number" id="bs-target" required placeholder="e.g. 8">
            </label><br><br>
            <button type="submit">Simulate</button>
        </form>
    `;
    $('#bs-form').onsubmit = handleBinarySearchInput;
}

// Handle Binary Search input submission
function handleBinarySearchInput(e) {
    e.preventDefault();
    const arrStr = $('#bs-array').value.trim();
    const targetStr = $('#bs-target').value.trim();
    if (!arrStr || !targetStr) return;
    const arr = arrStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    const target = Number(targetStr);
    if (arr.length === 0 || isNaN(target)) {
        alert('Please enter a valid sorted array and target number.');
        return;
    }
    // Check if array is sorted
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i-1]) {
            alert('Array must be sorted in ascending order for binary search.');
            return;
        }
    }
    steps = buildBinarySearchSteps(arr, target);
    currentStep = 0;
    inputSection.innerHTML = '';
    updateBinarySearchStep();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    backBtn.classList.remove('hidden');
}

// Build step-by-step states for Binary Search
function buildBinarySearchSteps(arr, target) {
    const steps = [];
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        steps.push({
            arr,
            target,
            low,
            mid,
            high,
            found: arr[mid] === target,
            done: arr[mid] === target,
        });
        if (arr[mid] === target) break;
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    // If not found, add a final step
    if (!arr.includes(target)) {
        steps.push({
            arr,
            target,
            low,
            mid: null,
            high,
            found: false,
            done: true,
        });
    }
    return steps;
}

// Update the visualization and explanation for the current step (Binary Search)
function updateBinarySearchStep() {
    if (!steps.length) return;
    const step = steps[currentStep];
    visualization.innerHTML = step.arr.map((num, idx) => {
        let cls = '';
        if (idx < step.low || idx > step.high) cls = 'bs-outside';
        else if (idx === step.low && idx === step.high && idx === step.mid && step.found) cls = 'bs-found';
        else if (idx === step.mid && step.found) cls = 'bs-found';
        else if (idx === step.mid) cls = 'bs-mid';
        else if (idx === step.low) cls = 'bs-low';
        else if (idx === step.high) cls = 'bs-high';
        return `<span class="bs-item ${cls}">
            <div>${num}</div>
            <div class="bs-index">${idx}</div>
        </span>`;
    }).join(' ');
    // Detailed Explanation
    if (step.done && !step.found) {
        explanation.innerHTML = `Number <b>${step.target}</b> was not found in the array.<br>
        The search range is empty (low = ${step.low}, high = ${step.high}).`;
    } else if (step.found) {
        explanation.innerHTML = `Low = <b>${step.low}</b>, High = <b>${step.high}</b>, Mid = <b>${step.mid}</b>.<br>
        <b>Checking element at index ${step.mid}: ${step.arr[step.mid]}</b>.<br>
        <span style='color:#4caf50;'>${step.arr[step.mid]} equals the target ${step.target}.</span><br>
        <b>Search complete!</b>`;
    } else {
        let compare, action;
        if (step.arr[step.mid] < step.target) {
            compare = `<span style='color:#e53935;'>${step.arr[step.mid]} &lt; ${step.target}</span>`;
            action = `Move <b>low</b> to <b>mid + 1</b> (low = ${step.mid + 1})`;
        } else if (step.arr[step.mid] > step.target) {
            compare = `<span style='color:#e53935;'>${step.arr[step.mid]} &gt; ${step.target}</span>`;
            action = `Move <b>high</b> to <b>mid - 1</b> (high = ${step.mid - 1})`;
        } else {
            compare = `<span style='color:#4caf50;'>${step.arr[step.mid]} == ${step.target}</span>`;
            action = `<b>Found!</b>`;
        }
        explanation.innerHTML = `Low = <b>${step.low}</b> (value: ${step.arr[step.low]}), High = <b>${step.high}</b> (value: ${step.arr[step.high]}), Mid = <b>${step.mid}</b> (value: ${step.arr[step.mid]}).<br>
        Compare: ${compare}.<br>
        ${action}`;
    }
    // Button states
    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = currentStep === steps.length - 1;
}

// Step navigation (update for binary search)
const origPrev = prevBtn.onclick;
const origNext = nextBtn.onclick;
prevBtn.onclick = function() {
    if (currentAlgo === 'binary-search') {
        if (currentStep > 0) {
            currentStep--;
            updateBinarySearchStep();
        }
    } else if (origPrev) {
        origPrev();
    }
};
nextBtn.onclick = function() {
    if (currentAlgo === 'binary-search') {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateBinarySearchStep();
        }
    } else if (origNext) {
        origNext();
    }
};

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
    position: relative;
    vertical-align: bottom;
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
.bs-item {
    display: inline-block;
    min-width: 2.2em;
    padding: 0.5em 0.7em;
    margin: 0 0.2em;
    border-radius: 6px;
    background: #e3edff;
    font-size: 1.1em;
    transition: background 0.2s, color 0.2s;
    position: relative;
    vertical-align: bottom;
}
.bs-item.bs-low {
    background: #4caf50;
    color: #fff;
    font-weight: bold;
}
.bs-item.bs-high {
    background: #e53935;
    color: #fff;
    font-weight: bold;
}
.bs-item.bs-mid {
    background: #ffb84f;
    color: #fff;
    font-weight: bold;
}
.bs-item.bs-found {
    background: #4f8cff;
    color: #fff;
    font-weight: bold;
}
.bs-item.bs-outside {
    opacity: 0.3;
    background: #e0e0e0;
    color: #888;
}
.bs-index {
    display: block;
    font-size: 0.85em;
    color: #888;
    margin-top: 0.15em;
    text-align: center;
    letter-spacing: 0.5px;
}
.algo-info-box {
    background: #e3edff;
    border-left: 4px solid #4f8cff;
    border-radius: 8px;
    padding: 1em 1.2em;
    margin-bottom: 1em;
    color: #2a4d8f;
    font-size: 1.02em;
}
.ls-index {
    display: block;
    font-size: 0.85em;
    color: #888;
    margin-top: 0.15em;
    text-align: center;
    letter-spacing: 0.5px;
}
</style>`);

function renderBinarySearchLegend() {
    const legend = document.createElement('div');
    legend.id = legendId;
    legend.style.margin = '0.5rem 0 1rem 0';
    legend.innerHTML = `
        <span class="bs-item bs-low" style="margin-right:8px;">Low</span>
        <span class="bs-item bs-high" style="margin-right:8px;">High</span>
        <span class="bs-item bs-mid" style="margin-right:8px;">Mid</span>
        <span class="bs-item bs-found" style="margin-right:8px;">Found</span>
        <span class="bs-item bs-outside" style="margin-right:8px;">Outside Range</span>
    `;
    visualization.parentNode.insertBefore(legend, visualization);
}

// Show algorithm info above input fields
function renderAlgorithmInfo(algo) {
    let info = '';
    if (algo === 'linear-search') {
        info = `<div class="algo-info-box">
            <b>About Linear Search:</b><br>
            Linear Search checks each element in the array one by one to find the target value.<br>
            <ul style='margin:0.5em 0 0 1.2em;'>
                <li>The array can be <b>unsorted</b> or <b>sorted</b>.</li>
                <li>You can search for <b>any number</b> in the array.</li>
                <li>It is simple but may be slow for large arrays.</li>
            </ul>
        </div>`;
    } else if (algo === 'binary-search') {
        info = `<div class="algo-info-box">
            <b>About Binary Search:</b><br>
            Binary Search is a fast algorithm for finding a value in a <b>sorted</b> array.<br>
            <ul style='margin:0.5em 0 0 1.2em;'>
                <li>The array <b>must be sorted in ascending order</b>.<br>
                    <span style='color:#e53935;'>Reason:</span> Binary Search works by repeatedly dividing the search range in half. If the array is not sorted, this process will not work correctly.</li>
                <li>It is much faster than linear search for large arrays.</li>
            </ul>
        </div>`;
    }
    inputSection.innerHTML = info + inputSection.innerHTML;
}

// Bubble Sort Theory Section
function renderBubbleSortTheory() {
    inputSection.innerHTML = `
        <div class="algo-info-box">
            <b>Bubble Sort - Theoretical Knowledge</b><br>
            <ul style='margin:0.7em 0 0 1.2em;'>
                <li><b>Definition:</b> Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.</li>
                <li><b>Time Complexity:</b> O(n<sup>2</sup>) &mdash; compares every pair in the worst case.</li>
                <li><b>Space Complexity:</b> O(1) &mdash; sorts in place.</li>
                <li><b>Use Cases:</b>
                    <ul style='margin:0.3em 0 0 1.2em;'>
                        <li>Educational purposes (easy to understand)</li>
                        <li>Small or nearly sorted arrays</li>
                    </ul>
                </li>
                <li><b>Example:</b><br>
                    <span style='display:inline-block;background:#f0f4fa;padding:0.5em 0.8em;border-radius:6px;'>
                        Array: [<b>5</b>, 1, 4, 2, 8]<br>
                        Steps (first pass):<br>
                        Compare 5 & 1 → swap → [1, 5, 4, 2, 8]<br>
                        Compare 5 & 4 → swap → [1, 4, 5, 2, 8]<br>
                        Compare 5 & 2 → swap → [1, 4, 2, 5, 8]<br>
                        Compare 5 & 8 → no swap → [1, 4, 2, 5, 8]<br>
                        Largest element (8) is now at the end.
                    </span>
                </li>
            </ul>
        </div>
        <button id="bsort-start-sim-btn" style="margin-bottom:1.2em;">Start Simulation</button>
    `;
    document.getElementById('bsort-start-sim-btn').onclick = function() {
        renderBubbleSortInputForm();
    };
}

function renderBubbleSortInputForm() {
    inputSection.innerHTML = `
        <form id="bsort-form">
            <label>Enter array (comma separated):<br>
                <input type="text" id="bsort-array" required placeholder="e.g. 5, 1, 4, 2, 8">
            </label><br><br>
            <button type="submit">Simulate</button>
        </form>
    `;
    $('#bsort-form').onsubmit = handleBubbleSortInput;
}

let bubbleSortSteps = [];
let bubbleSortStep = 0;

function handleBubbleSortInput(e) {
    e.preventDefault();
    const arrStr = $('#bsort-array').value.trim();
    if (!arrStr) return;
    const arr = arrStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    if (arr.length === 0) {
        alert('Please enter a valid array.');
        return;
    }
    bubbleSortSteps = buildBubbleSortSteps(arr);
    bubbleSortStep = 0;
    inputSection.innerHTML = '';
    renderBubbleSortLegend();
    updateBubbleSortStep();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

function buildBubbleSortSteps(arr) {
    const steps = [];
    let a = arr.slice();
    let n = a.length;
    let sortedUpto = n;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            let step = {
                arr: a.slice(),
                i,
                j,
                compared: [j, j + 1],
                swapped: false,
                sortedUpto: n - i,
                done: false
            };
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                step.swapped = true;
                swapped = true;
            }
            steps.push(step);
        }
        // Mark the last element as sorted
        steps.push({
            arr: a.slice(),
            i,
            j: null,
            compared: [],
            swapped: false,
            sortedUpto: n - i,
            done: false
        });
        if (!swapped) break;
    }
    // Final sorted state
    steps.push({
        arr: a.slice(),
        i: null,
        j: null,
        compared: [],
        swapped: false,
        sortedUpto: 0,
        done: true
    });
    return steps;
}

function updateBubbleSortStep() {
    if (!bubbleSortSteps.length) return;
    const step = bubbleSortSteps[bubbleSortStep];
    // Visualization
    visualization.innerHTML = step.arr.map((num, idx) => {
        let cls = '';
        if (step.compared.includes(idx)) cls = 'bsort-compared';
        if (step.swapped && step.compared.includes(idx)) cls = 'bsort-swapped';
        if (step.sortedUpto && idx >= step.sortedUpto) cls = 'bsort-sorted';
        return `<span class="bsort-item ${cls}">
            <div>${num}</div>
            <div class="bsort-index">${idx}</div>
        </span>`;
    }).join(' ');
    // Explanation
    if (step.done) {
        explanation.innerHTML = `<b>Array is fully sorted!</b>`;
    } else if (step.compared.length) {
        let msg = `Comparing <b>${step.arr[step.compared[0]]}</b> (index ${step.compared[0]}) and <b>${step.arr[step.compared[1]]}</b> (index ${step.compared[1]}).`;
        if (step.swapped) {
            msg += ` They are swapped because ${step.arr[step.compared[0]]} > ${step.arr[step.compared[1]]}.`;
        } else {
            msg += ` No swap needed.`;
        }
        explanation.innerHTML = msg;
    } else {
        explanation.innerHTML = `End of pass ${step.i + 1}. The largest unsorted element is now in place.`;
    }
    // Button states
    prevBtn.disabled = bubbleSortStep === 0;
    nextBtn.disabled = bubbleSortStep === bubbleSortSteps.length - 1;
}

// Step navigation for Bubble Sort
const origPrevBubble = prevBtn.onclick;
const origNextBubble = nextBtn.onclick;
prevBtn.onclick = function() {
    if (currentAlgo === 'bubble-sort') {
        if (bubbleSortStep > 0) {
            bubbleSortStep--;
            updateBubbleSortStep();
        }
    } else if (origPrevBubble) {
        origPrevBubble();
    }
};
nextBtn.onclick = function() {
    if (currentAlgo === 'bubble-sort') {
        if (bubbleSortStep < bubbleSortSteps.length - 1) {
            bubbleSortStep++;
            updateBubbleSortStep();
        }
    } else if (origNextBubble) {
        origNextBubble();
    }
};

function renderBubbleSortLegend() {
    const legend = document.createElement('div');
    legend.id = 'bsort-legend';
    legend.style.margin = '0.5rem 0 1rem 0';
    legend.innerHTML = `
        <span class="bsort-item bsort-compared" style="margin-right:8px;">Compared</span>
        <span class="bsort-item bsort-swapped" style="margin-right:8px;">Swapped</span>
        <span class="bsort-item bsort-sorted" style="margin-right:8px;">Sorted</span>
    `;
    visualization.parentNode.insertBefore(legend, visualization);
}

document.head.insertAdjacentHTML('beforeend', `<style>
.bsort-item {
    display: inline-block;
    min-width: 2.2em;
    padding: 0.5em 0.7em;
    margin: 0 0.2em;
    border-radius: 6px;
    background: #e3edff;
    font-size: 1.1em;
    transition: background 0.2s, color 0.2s;
    position: relative;
    vertical-align: bottom;
}
.bsort-index {
    display: block;
    font-size: 0.85em;
    color: #888;
    margin-top: 0.15em;
    text-align: center;
    letter-spacing: 0.5px;
}
.bsort-compared {
    background: #ffb84f;
    color: #fff;
    font-weight: bold;
}
.bsort-swapped {
    background: #e53935;
    color: #fff;
    font-weight: bold;
}
.bsort-sorted {
    background: #4f8cff;
    color: #fff;
    font-weight: bold;
}
</style>`);