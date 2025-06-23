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
    if (algo === 'fibonacci-search') {
        renderFibonacciSearchTheory();
    }
    if (algo === 'hashing') {
        renderHashingTheory();
    }
    if (algo === 'radix-sort') {
        renderRadixSortTheory();
    }
    // Add more algorithms here
}

function algoToTitle(algo) {
    switch (algo) {
        case 'linear-search': return 'Linear Search';
        case 'bubble-sort': return 'Bubble Sort';
        case 'binary-search': return 'Binary Search';
        case 'fibonacci-search': return 'Fibonacci Search';
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
            <div class="algo-code-examples">
                <b>Linear Search Code Examples:</b>
                <div class="code-lang-tabs">
                    <button class="code-lang-tab active" data-lang="c">C</button>
                    <button class="code-lang-tab" data-lang="cpp">C++</button>
                    <button class="code-lang-tab" data-lang="python">Python</button>
                    <button class="code-lang-tab" data-lang="js">JavaScript</button>
                    <button class="code-lang-tab" data-lang="java">Java</button>
                </div>
                <div class="code-tab-content">
                    <pre class="code-block" data-lang="c"><code>// C
// Function to perform linear search
int linearSearch(int arr[], int n, int target) {
    // Loop through each element in the array
    for (int i = 0; i < n; i++) {
        // If the current element matches the target, return its index
        if (arr[i] == target)
            return i;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="cpp" style="display:none"><code>// C++
// Function to perform linear search
int linearSearch(vector<int>& arr, int target) {
    // Loop through each element in the vector
    for (int i = 0; i < arr.size(); i++) {
        // If the current element matches the target, return its index
        if (arr[i] == target)
            return i;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="python" style="display:none"><code># Python
# Function to perform linear search
def linear_search(arr, target):
    # Loop through each element with its index
    for i, num in enumerate(arr):
        # If the current element matches the target, return its index
        if num == target:
            return i
    # If not found, return -1
    return -1</code></pre>
                    <pre class="code-block" data-lang="js" style="display:none"><code>// JavaScript
// Function to perform linear search
function linearSearch(arr, target) {
    // Loop through each element in the array
    for (let i = 0; i < arr.length; i++) {
        // If the current element matches the target, return its index
        if (arr[i] === target) return i;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="java" style="display:none"><code>// Java
// Function to perform linear search
int linearSearch(int[] arr, int target) {
    // Loop through each element in the array
    for (int i = 0; i < arr.length; i++) {
        // If the current element matches the target, return its index
        if (arr[i] == target)
            return i;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                </div>
            </div>
        </div>
        <button id="ls-start-sim-btn" class="center-sim-btn">Start Simulation</button>
    `;
    // Tab switching logic
    const tabBtns = inputSection.querySelectorAll('.code-lang-tab');
    const codeBlocks = inputSection.querySelectorAll('.code-block');
    tabBtns.forEach(btn => {
        btn.onclick = function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            codeBlocks.forEach(cb => {
                if (cb.getAttribute('data-lang') === lang) {
                    cb.style.display = '';
                } else {
                    cb.style.display = 'none';
                }
            });
        };
    });
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
            <div class="algo-code-examples">
                <b>Binary Search Code Examples:</b>
                <div class="code-lang-tabs">
                    <button class="code-lang-tab active" data-lang="c">C</button>
                    <button class="code-lang-tab" data-lang="cpp">C++</button>
                    <button class="code-lang-tab" data-lang="python">Python</button>
                    <button class="code-lang-tab" data-lang="js">JavaScript</button>
                    <button class="code-lang-tab" data-lang="java">Java</button>
                </div>
                <div class="code-tab-content">
                    <pre class="code-block" data-lang="c"><code>// C
// Function to perform binary search (iterative)
int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    // Loop until the search range is valid
    while (low <= high) {
        // Find the middle index
        int mid = (low + high) / 2;
        // If the middle element is the target, return its index
        if (arr[mid] == target)
            return mid;
        // If the target is greater, ignore left half
        else if (arr[mid] < target)
            low = mid + 1;
        // If the target is smaller, ignore right half
        else
            high = mid - 1;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="cpp" style="display:none"><code>// C++
// Function to perform binary search (iterative)
int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    // Loop until the search range is valid
    while (low <= high) {
        // Find the middle index
        int mid = (low + high) / 2;
        // If the middle element is the target, return its index
        if (arr[mid] == target)
            return mid;
        // If the target is greater, ignore left half
        else if (arr[mid] < target)
            low = mid + 1;
        // If the target is smaller, ignore right half
        else
            high = mid - 1;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="python" style="display:none"><code># Python
// Function to perform binary search (iterative)
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    // Loop until the search range is valid
    while low <= high:
        // Find the middle index
        mid = (low + high) // 2
        // If the middle element is the target, return its index
        if arr[mid] == target:
            return mid
        // If the target is greater, ignore left half
        elif arr[mid] < target:
            low = mid + 1
        // If the target is smaller, ignore right half
        else:
            high = mid - 1
    // If not found, return -1
    return -1</code></pre>
                    <pre class="code-block" data-lang="js" style="display:none"><code>// JavaScript
// Function to perform binary search (iterative)
function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    // Loop until the search range is valid
    while (low <= high) {
        // Find the middle index
        let mid = Math.floor((low + high) / 2);
        // If the middle element is the target, return its index
        if (arr[mid] === target) return mid;
        // If the target is greater, ignore left half
        else if (arr[mid] < target) low = mid + 1;
        // If the target is smaller, ignore right half
        else high = mid - 1;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="java" style="display:none"><code>// Java
// Function to perform binary search (iterative)
int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    // Loop until the search range is valid
    while (low <= high) {
        // Find the middle index
        int mid = (low + high) / 2;
        // If the middle element is the target, return its index
        if (arr[mid] == target)
            return mid;
        // If the target is greater, ignore left half
        else if (arr[mid] < target)
            low = mid + 1;
        // If the target is smaller, ignore right half
        else
            high = mid - 1;
    }
    // If not found, return -1
    return -1;
}</code></pre>
                </div>
            </div>
        </div>
        <button id="bs-start-sim-btn" class="center-sim-btn">Start Simulation</button>
    `;
    // Tab switching logic
    const tabBtns = inputSection.querySelectorAll('.code-lang-tab');
    const codeBlocks = inputSection.querySelectorAll('.code-block');
    tabBtns.forEach(btn => {
        btn.onclick = function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            codeBlocks.forEach(cb => {
                if (cb.getAttribute('data-lang') === lang) {
                    cb.style.display = '';
                } else {
                    cb.style.display = 'none';
                }
            });
        };
    });
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
.algo-code-examples {
    margin-top: 1em;
}
.code-lang-tabs {
    display: flex;
    gap: 0.5em;
    margin: 0.7em 0 0.2em 0;
}
.code-lang-tab {
    background: #e3edff;
    color: #2a4d8f;
    border: none;
    border-radius: 6px 6px 0 0;
    padding: 0.4em 1.1em;
    font-size: 1em;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
    outline: none;
}
.code-lang-tab.active, .code-lang-tab:hover {
    background: #4f8cff;
    color: #fff;
}
.code-tab-content {
    background: #23272e;
    color: #e0e7ef;
    border-radius: 0 0 7px 7px;
    padding: 0.7em 0.8em;
    font-size: 0.98em;
    overflow-x: auto;
    margin-bottom: 0.5em;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.code-block {
    margin: 0;
    font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
    font-size: 0.97em;
    background: none;
    color: inherit;
    display: block;
    white-space: pre;
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
            <div class="algo-code-examples">
                <b>Bubble Sort Code Examples:</b>
                <div class="code-lang-tabs">
                    <button class="code-lang-tab active" data-lang="c">C</button>
                    <button class="code-lang-tab" data-lang="cpp">C++</button>
                    <button class="code-lang-tab" data-lang="python">Python</button>
                    <button class="code-lang-tab" data-lang="js">JavaScript</button>
                    <button class="code-lang-tab" data-lang="java">Java</button>
                </div>
                <div class="code-tab-content">
                    <pre class="code-block" data-lang="c"><code>// C
// Function to perform bubble sort
void bubbleSort(int arr[], int n) {
    // Traverse through all array elements
    for (int i = 0; i < n-1; i++) {
        // Last i elements are already in place
        for (int j = 0; j < n-i-1; j++) {
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}</code></pre>
                    <pre class="code-block" data-lang="cpp" style="display:none"><code>// C++
// Function to perform bubble sort
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    // Traverse through all array elements
    for (int i = 0; i < n-1; i++) {
        // Last i elements are already in place
        for (int j = 0; j < n-i-1; j++) {
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}</code></pre>
                    <pre class="code-block" data-lang="python" style="display:none"><code># Python
// Function to perform bubble sort
def bubble_sort(arr):
    n = len(arr)
    // Traverse through all array elements
    for i in range(n-1):
        // Last i elements are already in place
        for j in range(n-i-1):
            // Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
</code></pre>
                    <pre class="code-block" data-lang="js" style="display:none"><code>// JavaScript
// Function to perform bubble sort
function bubbleSort(arr) {
    let n = arr.length;
    // Traverse through all array elements
    for (let i = 0; i < n - 1; i++) {
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}</code></pre>
                    <pre class="code-block" data-lang="java" style="display:none"><code>// Java
// Function to perform bubble sort
void bubbleSort(int[] arr) {
    int n = arr.length;
    // Traverse through all array elements
    for (int i = 0; i < n-1; i++) {
        // Last i elements are already in place
        for (int j = 0; j < n-i-1; j++) {
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}</code></pre>
                </div>
            </div>
        </div>
        <button id="bsort-start-sim-btn" class="center-sim-btn">Start Simulation</button>
    `;
    // Tab switching logic
    const tabBtns = inputSection.querySelectorAll('.code-lang-tab');
    const codeBlocks = inputSection.querySelectorAll('.code-block');
    tabBtns.forEach(btn => {
        btn.onclick = function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            codeBlocks.forEach(cb => {
                if (cb.getAttribute('data-lang') === lang) {
                    cb.style.display = '';
                } else {
                    cb.style.display = 'none';
                }
            });
        };
    });
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

function renderBubbleSortLegend() {
    const legend = document.createElement('div');
    legend.id = legendId;
    legend.style.margin = '0.5rem 0 1rem 0';
    legend.innerHTML = `
        <span class="bsort-item bs-low" style="margin-right:8px;">Low</span>
        <span class="bsort-item bs-high" style="margin-right:8px;">High</span>
        <span class="bsort-item bs-mid" style="margin-right:8px;">Mid</span>
        <span class="bsort-item bs-found" style="margin-right:8px;">Found</span>
        <span class="bsort-item bs-outside" style="margin-right:8px;">Outside Range</span>
    `;
    visualization.parentNode.insertBefore(legend, visualization);
}

// Fibonacci Search Theory Section
function renderFibonacciSearchTheory() {
    inputSection.innerHTML = `
        <div class="algo-info-box">
            <b>Fibonacci Search - Theoretical Knowledge</b><br>
            <ul style='margin:0.7em 0 0 1.2em;'>
                <li><b>Definition:</b> Fibonacci Search is a search algorithm that uses Fibonacci numbers to divide the array and search for a value in a <b>sorted</b> array.</li>
                <li><b>Time Complexity:</b> O(log n)</li>
                <li><b>Space Complexity:</b> O(1)</li>
                <li><b>Use Cases:</b>
                    <ul style='margin:0.3em 0 0 1.2em;'>
                        <li>Searching in large sorted arrays</li>
                        <li>When division operations are expensive (Fibonacci Search uses only addition and subtraction)</li>
                    </ul>
                </li>
                <li><b>Example:</b><br>
                    <span style='display:inline-block;background:#f0f4fa;padding:0.5em 0.8em;border-radius:6px;'>
                        Array: [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100]<br>
                        Target: <b>85</b><br>
                        Steps:<br>
                        1. Find the smallest Fibonacci number greater than or equal to array length (here, 13).<br>
                        2. Set offset = -1.<br>
                        3. Probe index = min(offset + fibM2, n-1).<br>
                        4. Repeat until target is found or range is empty.
                    </span>
                </li>
            </ul>
            <div class="algo-code-examples">
                <b>Fibonacci Search Code Examples:</b>
                <div class="code-lang-tabs">
                    <button class="code-lang-tab active" data-lang="c">C</button>
                    <button class="code-lang-tab" data-lang="cpp">C++</button>
                    <button class="code-lang-tab" data-lang="python">Python</button>
                    <button class="code-lang-tab" data-lang="js">JavaScript</button>
                    <button class="code-lang-tab" data-lang="java">Java</button>
                </div>
                <div class="code-tab-content">
                    <pre class="code-block" data-lang="c"><code>// C
// Function to perform Fibonacci Search
int fibonacciSearch(int arr[], int n, int target) {
    // Initialize fibonacci numbers
    int fibMMm2 = 0; // (m-2)'th Fibonacci No.
    int fibMMm1 = 1; // (m-1)'th Fibonacci No.
    int fibM = fibMMm2 + fibMMm1; // m'th Fibonacci
    // Find the smallest Fibonacci number greater than or equal to n
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }
    int offset = -1;
    // While there are elements to be inspected
    while (fibM > 1) {
        int i = (offset + fibMMm2 < n-1) ? offset + fibMMm2 : n-1;
        // If target is greater, cut the subarray from offset to i
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        }
        // If target is less, cut the subarray after i+1
        else if (arr[i] > target) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        }
        // Element found
        else return i;
    }
    // Compare the last element
    if(fibMMm1 && arr[offset+1] == target) return offset+1;
    // Not found
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="cpp" style="display:none"><code>// C++
// Function to perform Fibonacci Search
int fibonacciSearch(vector<int>& arr, int target) {
    int n = arr.size();
    int fibMMm2 = 0, fibMMm1 = 1, fibM = fibMMm2 + fibMMm1;
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }
    int offset = -1;
    while (fibM > 1) {
        int i = min(offset + fibMMm2, n-1);
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else return i;
    }
    if(fibMMm1 && arr[offset+1] == target) return offset+1;
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="python" style="display:none"><code># Python
// Function to perform Fibonacci Search
def fibonacci_search(arr, target):
    n = len(arr)
    fibMMm2 = 0  # (m-2)'th Fibonacci No.
    fibMMm1 = 1  # (m-1)'th Fibonacci No.
    fibM = fibMMm2 + fibMMm1  # m'th Fibonacci
    # Find the smallest Fibonacci number greater than or equal to n
    while fibM < n:
        fibMMm2, fibMMm1 = fibMMm1, fibM
        fibM = fibMMm2 + fibMMm1
    offset = -1
    while fibM > 1:
        i = min(offset + fibMMm2, n-1)
        if arr[i] < target:
            fibM = fibMMm1
            fibMMm1 = fibMMm2
            fibMMm2 = fibM - fibMMm1
            offset = i
        elif arr[i] > target:
            fibM = fibMMm2
            fibMMm1 = fibMMm1 - fibMMm2
            fibMMm2 = fibM - fibMMm1
        else:
            return i
    if fibMMm1 and offset+1 < n and arr[offset+1] == target:
        return offset+1
    return -1</code></pre>
                    <pre class="code-block" data-lang="js" style="display:none"><code>// JavaScript
// Function to perform Fibonacci Search
function fibonacciSearch(arr, target) {
    let n = arr.length;
    let fibMMm2 = 0, fibMMm1 = 1, fibM = fibMMm2 + fibMMm1;
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }
    let offset = -1;
    while (fibM > 1) {
        let i = Math.min(offset + fibMMm2, n-1);
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else return i;
    }
    if(fibMMm1 && arr[offset+1] === target) return offset+1;
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="java" style="display:none"><code>// Java
// Function to perform Fibonacci Search
int fibonacciSearch(int[] arr, int target) {
    int n = arr.length;
    int fibMMm2 = 0, fibMMm1 = 1, fibM = fibMMm2 + fibMMm1;
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }
    int offset = -1;
    while (fibM > 1) {
        int i = Math.min(offset + fibMMm2, n-1);
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else return i;
    }
    if(fibMMm1 != 0 && arr[offset+1] == target) return offset+1;
    return -1;
}</code></pre>
                </div>
            </div>
        </div>
        <button id="fibo-start-sim-btn" class="center-sim-btn">Start Simulation</button>
    `;
    // Tab switching logic
    const tabBtns = inputSection.querySelectorAll('.code-lang-tab');
    const codeBlocks = inputSection.querySelectorAll('.code-block');
    tabBtns.forEach(btn => {
        btn.onclick = function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            codeBlocks.forEach(cb => {
                if (cb.getAttribute('data-lang') === lang) {
                    cb.style.display = '';
                } else {
                    cb.style.display = 'none';
                }
            });
        };
    });
    document.getElementById('fibo-start-sim-btn').onclick = function() {
        renderFibonacciSearchInputForm();
    };
}

function renderFibonacciSearchInputForm() {
    inputSection.innerHTML = `
        <form id="fibo-form">
            <label>Enter sorted array (comma separated):<br>
                <input type="text" id="fibo-array" required placeholder="e.g. 10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100">
            </label><br><br>
            <label>Number to search:<br>
                <input type="number" id="fibo-target" required placeholder="e.g. 85">
            </label><br><br>
            <button type="submit">Simulate</button>
        </form>
    `;
    $('#fibo-form').onsubmit = handleFibonacciSearchInput;
}

let fibonacciSteps = [];
let fibonacciStep = 0;

function handleFibonacciSearchInput(e) {
    e.preventDefault();
    const arrStr = $('#fibo-array').value.trim();
    const targetStr = $('#fibo-target').value.trim();
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
            alert('Array must be sorted in ascending order for Fibonacci search.');
            return;
        }
    }
    fibonacciSteps = buildFibonacciSearchSteps(arr, target);
    fibonacciStep = 0;
    inputSection.innerHTML = '';
    renderFibonacciSearchLegend();
    updateFibonacciSearchStep();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

function buildFibonacciSearchSteps(arr, target) {
    const steps = [];
    let n = arr.length;
    let fibMMm2 = 0, fibMMm1 = 1, fibM = fibMMm2 + fibMMm1;
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }
    let offset = -1;
    while (fibM > 1) {
        let i = Math.min(offset + fibMMm2, n-1);
        steps.push({
            arr: arr.slice(),
            low: offset+1,
            high: Math.min(offset+fibM, n-1),
            probe: i,
            found: arr[i] === target,
            done: arr[i] === target,
            value: arr[i],
            target,
        });
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else {
            break;
        }
    }
    // Check last element
    if (!arr.includes(target)) {
        if (fibMMm1 && arr[offset+1] === target) {
            steps.push({
                arr: arr.slice(),
                low: offset+1,
                high: offset+1,
                probe: offset+1,
                found: true,
                done: true,
                value: arr[offset+1],
                target,
            });
        } else {
            steps.push({
                arr: arr.slice(),
                low: 0,
                high: n-1,
                probe: null,
                found: false,
                done: true,
                value: null,
                target,
            });
        }
    }
    return steps;
}

function updateFibonacciSearchStep() {
    if (!fibonacciSteps.length) return;
    const step = fibonacciSteps[fibonacciStep];
    visualization.innerHTML = step.arr.map((num, idx) => {
        let cls = '';
        if (step.probe === idx && step.found) cls = 'fibo-found';
        else if (step.probe === idx) cls = 'fibo-probe';
        else if (idx >= step.low && idx <= step.high) cls = 'fibo-range';
        else cls = 'fibo-outside';
        return `<span class="fibo-item ${cls}">
            <div>${num}</div>
            <div class="fibo-index">${idx}</div>
        </span>`;
    }).join(' ');
    // Explanation
    if (step.done && !step.found) {
        explanation.innerHTML = `Number <b>${step.target}</b> was not found in the array.`;
    } else if (step.found) {
        explanation.innerHTML = `Probed index <b>${step.probe}</b> (value: ${step.value}) matches the target <b>${step.target}</b>. Search complete!`;
    } else {
        explanation.innerHTML = `Current search range: <b>${step.low}</b> to <b>${step.high}</b>.<br>
        Probing index <b>${step.probe}</b> (value: ${step.value}).`;
    }
    // Button states
    prevBtn.disabled = fibonacciStep === 0;
    nextBtn.disabled = fibonacciStep === fibonacciSteps.length - 1;
}

// Step navigation for Fibonacci Search
const origPrevFibo = prevBtn.onclick;
const origNextFibo = nextBtn.onclick;
prevBtn.onclick = function() {
    if (currentAlgo === 'fibonacci-search') {
        if (fibonacciStep > 0) {
            fibonacciStep--;
            updateFibonacciSearchStep();
        }
    } else if (origPrevFibo) {
        origPrevFibo();
    }
};
nextBtn.onclick = function() {
    if (currentAlgo === 'fibonacci-search') {
        if (fibonacciStep < fibonacciSteps.length - 1) {
            fibonacciStep++;
            updateFibonacciSearchStep();
        }
    } else if (origNextFibo) {
        origNextFibo();
    }
};

function renderFibonacciSearchLegend() {
    const legend = document.createElement('div');
    legend.id = 'fibo-legend';
    legend.style.margin = '0.5rem 0 1rem 0';
    legend.innerHTML = `
        <span class="fibo-item fibo-range" style="margin-right:8px;">Search Range</span>
        <span class="fibo-item fibo-probe" style="margin-right:8px;">Probed Index</span>
        <span class="fibo-item fibo-found" style="margin-right:8px;">Found</span>
        <span class="fibo-item fibo-outside" style="margin-right:8px;">Outside Range</span>
    `;
    visualization.parentNode.insertBefore(legend, visualization);
}

document.head.insertAdjacentHTML('beforeend', `<style>
.fibo-item {
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
.fibo-index {
    display: block;
    font-size: 0.85em;
    color: #888;
    margin-top: 0.15em;
    text-align: center;
    letter-spacing: 0.5px;
}
.fibo-range {
    background: #b2e3ff;
    color: #2a4d8f;
}
.fibo-probe {
    background: #ffb84f;
    color: #fff;
    font-weight: bold;
}
.fibo-found {
    background: #4f8cff;
    color: #fff;
    font-weight: bold;
}
.fibo-outside {
    opacity: 0.3;
    background: #e0e0e0;
    color: #888;
}
</style>`);

// Hashing (Hash Table Lookup) Theory Section
function renderHashingTheory() {
    inputSection.innerHTML = `
        <div class="algo-info-box">
            <b>Hashing (Hash Table Lookup) - Theoretical Knowledge</b><br>
            <ul style='margin:0.7em 0 0 1.2em;'>
                <li><b>Definition:</b> Hashing is a technique to map data (keys) to a fixed-size table (hash table) using a hash function. Lookup is done in constant time on average.</li>
                <li><b>Time Complexity:</b> O(1) average, O(n) worst-case (with collisions)</li>
                <li><b>Space Complexity:</b> O(n)</li>
                <li><b>Use Cases:</b>
                    <ul style='margin:0.3em 0 0 1.2em;'>
                        <li>Fast lookups (dictionaries, sets, caches)</li>
                        <li>Database indexing</li>
                        <li>Symbol tables in compilers</li>
                    </ul>
                </li>
                <li><b>Example:</b><br>
                    <span style='display:inline-block;background:#f0f4fa;padding:0.5em 0.8em;border-radius:6px;'>
                        Keys: [15, 11, 27, 8, 12]<br>
                        Hash table size: 7<br>
                        Hash function: key % 7<br>
                        Insert 15: 15 % 7 = 1 → table[1] = 15<br>
                        Insert 11: 11 % 7 = 4 → table[4] = 11<br>
                        Insert 27: 27 % 7 = 6 → table[6] = 27<br>
                        Insert 8: 8 % 7 = 1 (collision) → linear probe to next empty slot (table[2] = 8)<br>
                        Insert 12: 12 % 7 = 5 → table[5] = 12
                    </span>
                </li>
            </ul>
            <div class="algo-code-examples">
                <b>Hash Table Lookup Code Examples:</b>
                <div class="code-lang-tabs">
                    <button class="code-lang-tab active" data-lang="c">C</button>
                    <button class="code-lang-tab" data-lang="cpp">C++</button>
                    <button class="code-lang-tab" data-lang="python">Python</button>
                    <button class="code-lang-tab" data-lang="js">JavaScript</button>
                    <button class="code-lang-tab" data-lang="java">Java</button>
                </div>
                <div class="code-tab-content">
                    <pre class="code-block" data-lang="c"><code>// C
// Simple hash table with linear probing
#define SIZE 7
int table[SIZE];
void insert(int key) {
    int idx = key % SIZE;
    while (table[idx] != 0) // 0 means empty
        idx = (idx + 1) % SIZE;
    table[idx] = key;
}
int search(int key) {
    int idx = key % SIZE;
    int start = idx;
    while (table[idx] != 0) {
        if (table[idx] == key) return idx;
        idx = (idx + 1) % SIZE;
        if (idx == start) break;
    }
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="cpp" style="display:none"><code>// C++
// Simple hash table with linear probing
#define SIZE 7
int table[SIZE] = {0};
void insert(int key) {
    int idx = key % SIZE;
    while (table[idx] != 0)
        idx = (idx + 1) % SIZE;
    table[idx] = key;
}
int search(int key) {
    int idx = key % SIZE;
    int start = idx;
    while (table[idx] != 0) {
        if (table[idx] == key) return idx;
        idx = (idx + 1) % SIZE;
        if (idx == start) break;
    }
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="python" style="display:none"><code># Python
// Simple hash table with linear probing
SIZE = 7
table = [None] * SIZE
def insert(key):
    idx = key % SIZE
    while table[idx] is not None:
        idx = (idx + 1) % SIZE
    table[idx] = key
def search(key):
    idx = key % SIZE
    start = idx
    while table[idx] is not None:
        if table[idx] == key:
            return idx
        idx = (idx + 1) % SIZE
        if idx == start:
            break
    return -1</code></pre>
                    <pre class="code-block" data-lang="js" style="display:none"><code>// JavaScript
// Simple hash table with linear probing
const SIZE = 7;
const table = Array(SIZE).fill(null);
function insert(key) {
    let idx = key % SIZE;
    while (table[idx] !== null) {
        idx = (idx + 1) % SIZE;
    }
    table[idx] = key;
}
function search(key) {
    let idx = key % SIZE;
    const start = idx;
    while (table[idx] !== null) {
        if (table[idx] === key) return idx;
        idx = (idx + 1) % SIZE;
        if (idx === start) break;
    }
    return -1;
}</code></pre>
                    <pre class="code-block" data-lang="java" style="display:none"><code>// Java
// Simple hash table with linear probing
class HashTable {
    static final int SIZE = 7;
    int[] table = new int[SIZE];
    void insert(int key) {
        int idx = key % SIZE;
        while (table[idx] != 0)
            idx = (idx + 1) % SIZE;
        table[idx] = key;
    }
    int search(int key) {
        int idx = key % SIZE;
        int start = idx;
        while (table[idx] != 0) {
            if (table[idx] == key) return idx;
            idx = (idx + 1) % SIZE;
            if (idx == start) break;
        }
        return -1;
    }
}</code></pre>
                </div>
            </div>
        </div>
        <button id="hashing-start-sim-btn" class="center-sim-btn">Start Simulation</button>
    `;
    // Tab switching logic
    const tabBtns = inputSection.querySelectorAll('.code-lang-tab');
    const codeBlocks = inputSection.querySelectorAll('.code-block');
    tabBtns.forEach(btn => {
        btn.onclick = function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            codeBlocks.forEach(cb => {
                if (cb.getAttribute('data-lang') === lang) {
                    cb.style.display = '';
                } else {
                    cb.style.display = 'none';
                }
            });
        };
    });
    document.getElementById('hashing-start-sim-btn').onclick = function() {
        renderHashingInputForm();
    };
}

function renderHashingInputForm() {
    inputSection.innerHTML = `
        <form id="hashing-form">
            <label>Enter keys to insert (comma separated):<br>
                <input type="text" id="hashing-keys" required placeholder="e.g. 15, 11, 27, 8, 12">
            </label><br><br>
            <label>Key to look up:<br>
                <input type="number" id="hashing-target" required placeholder="e.g. 27">
            </label><br><br>
            <button type="submit">Simulate</button>
        </form>
    `;
    $('#hashing-form').onsubmit = handleHashingInput;
}

let hashingSteps = [];
let hashingStep = 0;

function handleHashingInput(e) {
    e.preventDefault();
    const keysStr = $('#hashing-keys').value.trim();
    const targetStr = $('#hashing-target').value.trim();
    if (!keysStr || !targetStr) return;
    const keys = keysStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    const target = Number(targetStr);
    if (keys.length === 0 || isNaN(target)) {
        alert('Please enter valid keys and a target number.');
        return;
    }
    hashingSteps = buildHashingSteps(keys, target);
    hashingStep = 0;
    inputSection.innerHTML = '';
    renderHashingLegend();
    updateHashingStep();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

function buildHashingSteps(keys, target) {
    const SIZE = 7;
    let table = Array(SIZE).fill(null);
    const steps = [];
    // Insert phase
    for (let k = 0; k < keys.length; k++) {
        let key = keys[k];
        let idx = key % SIZE;
        let probe = 0;
        let inserted = false;
        while (table[idx] !== null && probe < SIZE) {
            steps.push({
                table: table.slice(),
                idx,
                key,
                phase: 'insert',
                inserted: false,
                probe,
                highlight: idx,
                keys: keys.slice(0, k),
            });
            idx = (idx + 1) % SIZE;
            probe++;
        }
        table[idx] = key;
        steps.push({
            table: table.slice(),
            idx,
            key,
            phase: 'insert',
            inserted: true,
            probe,
            highlight: idx,
            keys: keys.slice(0, k+1),
        });
    }
    // Lookup phase
    let idx = target % SIZE;
    let probe = 0;
    let found = false;
    let start = idx;
    while (table[idx] !== null && probe < SIZE) {
        steps.push({
            table: table.slice(),
            idx,
            key: target,
            phase: 'lookup',
            found: table[idx] === target,
            probe,
            highlight: idx,
            keys,
        });
        if (table[idx] === target) {
            found = true;
            break;
        }
        idx = (idx + 1) % SIZE;
        probe++;
        if (idx === start) break;
    }
    if (!found) {
        steps.push({
            table: table.slice(),
            idx,
            key: target,
            phase: 'lookup',
            found: false,
            probe,
            highlight: idx,
            keys,
        });
    }
    return steps;
}

function updateHashingStep() {
    if (!hashingSteps.length) return;
    const step = hashingSteps[hashingStep];
    visualization.innerHTML = step.table.map((val, idx) => {
        let cls = '';
        if (step.phase === 'insert' && idx === step.highlight) {
            cls = step.inserted ? 'hash-inserted' : 'hash-probe';
        } else if (step.phase === 'lookup' && idx === step.highlight) {
            cls = step.found ? 'hash-found' : 'hash-lookup';
        } else if (val !== null) {
            cls = 'hash-filled';
        } else {
            cls = 'hash-empty';
        }
        return `<span class="hash-item ${cls}">
            <div>${val !== null ? val : ''}</div>
            <div class="hash-index">${idx}</div>
        </span>`;
    }).join(' ');
    // Explanation
    if (step.phase === 'insert') {
        if (step.inserted) {
            explanation.innerHTML = `Inserted <b>${step.key}</b> at index <b>${step.idx}</b> (after ${step.probe} probe${step.probe === 1 ? '' : 's'}).`;
        } else {
            explanation.innerHTML = `Collision at index <b>${step.idx}</b> for key <b>${step.key}</b>. Probing next slot...`;
        }
    } else if (step.phase === 'lookup') {
        if (step.found) {
            explanation.innerHTML = `Key <b>${step.key}</b> found at index <b>${step.idx}</b> after ${step.probe} probe${step.probe === 1 ? '' : 's'}.`;
        } else if (step.table[step.idx] === null) {
            explanation.innerHTML = `Key <b>${step.key}</b> not found. Slot <b>${step.idx}</b> is empty.`;
        } else {
            explanation.innerHTML = `Checking index <b>${step.idx}</b>... not a match, probing next slot.`;
        }
    }
    // Button states
    prevBtn.disabled = hashingStep === 0;
    nextBtn.disabled = hashingStep === hashingSteps.length - 1;
}

// Step navigation for Hashing
const origPrevHash = prevBtn.onclick;
const origNextHash = nextBtn.onclick;
prevBtn.onclick = function() {
    if (currentAlgo === 'hashing') {
        if (hashingStep > 0) {
            hashingStep--;
            updateHashingStep();
        }
    } else if (origPrevHash) {
        origPrevHash();
    }
};
nextBtn.onclick = function() {
    if (currentAlgo === 'hashing') {
        if (hashingStep < hashingSteps.length - 1) {
            hashingStep++;
            updateHashingStep();
        }
    } else if (origNextHash) {
        origNextHash();
    }
};

function renderHashingLegend() {
    const legend = document.createElement('div');
    legend.id = 'hashing-legend';
    legend.style.margin = '0.5rem 0 1rem 0';
    legend.innerHTML = `
        <span class="hash-item hash-inserted" style="margin-right:8px;">Inserted</span>
        <span class="hash-item hash-probe" style="margin-right:8px;">Probing</span>
        <span class="hash-item hash-lookup" style="margin-right:8px;">Lookup</span>
        <span class="hash-item hash-found" style="margin-right:8px;">Found</span>
        <span class="hash-item hash-filled" style="margin-right:8px;">Filled</span>
        <span class="hash-item hash-empty" style="margin-right:8px;">Empty</span>
    `;
    visualization.parentNode.insertBefore(legend, visualization);
}

document.head.insertAdjacentHTML('beforeend', `<style>
.hash-item {
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
.hash-index {
    display: block;
    font-size: 0.85em;
    color: #888;
    margin-top: 0.15em;
    text-align: center;
    letter-spacing: 0.5px;
}
.hash-inserted {
    background: #4f8cff;
    color: #fff;
    font-weight: bold;
}
.hash-probe {
    background: #ffb84f;
    color: #fff;
    font-weight: bold;
}
.hash-lookup {
    background: #ffe066;
    color: #2a4d8f;
    font-weight: bold;
}
.hash-found {
    background: #4caf50;
    color: #fff;
    font-weight: bold;
}
.hash-filled {
    background: #b2e3ff;
    color: #2a4d8f;
}
.hash-empty {
    background: #e0e0e0;
    color: #888;
    opacity: 0.5;
}
</style>`);

// Radix Sort Theory Section
function renderRadixSortTheory() {
    inputSection.innerHTML = `
        <div class="algo-info-box">
            <b>Radix Sort - Theoretical Knowledge</b><br>
            <ul style='margin:0.7em 0 0 1.2em;'>
                <li><b>Definition:</b> Radix Sort is a non-comparative sorting algorithm that sorts numbers by processing individual digits from least significant to most significant.</li>
                <li><b>Time Complexity:</b> O(d(n + k)), where d is the number of digits, n is the number of elements, and k is the range of digits (usually 10 for base-10).</li>
                <li><b>Space Complexity:</b> O(n + k)</li>
                <li><b>Use Cases:</b>
                    <ul style='margin:0.3em 0 0 1.2em;'>
                        <li>Sorting large numbers of integers</li>
                        <li>When keys are uniformly distributed and not too large</li>
                    </ul>
                </li>
                <li><b>Example:</b><br>
                    <span style='display:inline-block;background:#f0f4fa;padding:0.5em 0.8em;border-radius:6px;'>
                        Array: [170, 45, 75, 90, 802, 24, 2, 66]<br>
                        Pass 1 (unit place): [170, 90, 802, 2, 24, 45, 75, 66]<br>
                        Pass 2 (tens place): [802, 2, 24, 45, 66, 170, 75, 90]<br>
                        Pass 3 (hundreds place): [2, 24, 45, 66, 75, 90, 170, 802]
                    </span>
                </li>
            </ul>
            <div class="algo-code-examples">
                <b>Radix Sort Code Examples:</b>
                <div class="code-lang-tabs">
                    <button class="code-lang-tab active" data-lang="c">C</button>
                    <button class="code-lang-tab" data-lang="cpp">C++</button>
                    <button class="code-lang-tab" data-lang="python">Python</button>
                    <button class="code-lang-tab" data-lang="js">JavaScript</button>
                    <button class="code-lang-tab" data-lang="java">Java</button>
                </div>
                <div class="code-tab-content">
                    <pre class="code-block" data-lang="c"><code>// C
// Function to get maximum value in arr[]
int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}
// A function to do counting sort of arr[] according to the digit represented by exp
void countSort(int arr[], int n, int exp) {
    int output[n];
    int i, count[10] = {0};
    for (i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (i = 0; i < n; i++)
        arr[i] = output[i];
}
// The main function to that sorts arr[] of size n using Radix Sort
void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}</code></pre>
                    <pre class="code-block" data-lang="cpp" style="display:none"><code>// C++
#include <vector>
using namespace std;
// Function to get maximum value in arr[]
int getMax(vector<int>& arr) {
    int mx = arr[0];
    for (int i = 1; i < arr.size(); i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}
void countSort(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    int count[10] = {0};
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}
void radixSort(vector<int>& arr) {
    int m = getMax(arr);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, exp);
}</code></pre>
                    <pre class="code-block" data-lang="python" style="display:none"><code># Python
# Function to do counting sort of arr[] according to the digit represented by exp
def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
    for i in range(n):
        arr[i] = output[i]
# Main function to implement radix sort
def radix_sort(arr):
    max1 = max(arr)
    exp = 1
    while max1 // exp > 0:
        counting_sort(arr, exp)
        exp *= 10</code></pre>
                    <pre class="code-block" data-lang="js" style="display:none"><code>// JavaScript
// Function to do counting sort of arr[] according to the digit represented by exp
function countingSort(arr, exp) {
    let n = arr.length;
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);
    for (let i = 0; i < n; i++)
        count[Math.floor(arr[i] / exp) % 10]++;
    for (let i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
        let index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }
    for (let i = 0; i < n; i++)
        arr[i] = output[i];
}
// Main function to implement radix sort
function radixSort(arr) {
    let max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
        countingSort(arr, exp);
}</code></pre>
                    <pre class="code-block" data-lang="java" style="display:none"><code>// Java
// Function to get maximum value in arr[]
int getMax(int arr[]) {
    int mx = arr[0];
    for (int i = 1; i < arr.length; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}
// Function to do counting sort of arr[] according to the digit represented by exp
void countSort(int arr[], int exp) {
    int n = arr.length;
    int output[] = new int[n];
    int count[] = new int[10];
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}
// Main function to implement radix sort
void radixSort(int arr[]) {
    int m = getMax(arr);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, exp);
}</code></pre>
                </div>
            </div>
        </div>
        <button id="radix-start-sim-btn" class="center-sim-btn">Start Simulation</button>
    `;
    // Tab switching logic
    const tabBtns = inputSection.querySelectorAll('.code-lang-tab');
    const codeBlocks = inputSection.querySelectorAll('.code-block');
    tabBtns.forEach(btn => {
        btn.onclick = function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            codeBlocks.forEach(cb => {
                if (cb.getAttribute('data-lang') === lang) {
                    cb.style.display = '';
                } else {
                    cb.style.display = 'none';
                }
            });
        };
    });
    document.getElementById('radix-start-sim-btn').onclick = function() {
        renderRadixSortInputForm();
    };
}

function renderRadixSortInputForm() {
    inputSection.innerHTML = `
        <form id="radix-form">
            <label>Enter array (comma separated):<br>
                <input type="text" id="radix-array" required placeholder="e.g. 170, 45, 75, 90, 802, 24, 2, 66">
            </label><br><br>
            <button type="submit">Simulate</button>
        </form>
    `;
    $('#radix-form').onsubmit = handleRadixSortInput;
}

let radixSortSteps = [];
let radixSortStep = 0;

function handleRadixSortInput(e) {
    e.preventDefault();
    const arrStr = $('#radix-array').value.trim();
    if (!arrStr) return;
    const arr = arrStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    if (arr.length === 0) {
        alert('Please enter a valid array.');
        return;
    }
    radixSortSteps = buildRadixSortSteps(arr);
    radixSortStep = 0;
    inputSection.innerHTML = '';
    renderRadixSortLegend();
    updateRadixSortStep();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

function buildRadixSortSteps(arr) {
    // We'll simulate the steps of radix sort (LSD, base 10)
    let steps = [];
    let a = arr.slice();
    let max = Math.max(...a);
    let exp = 1;
    while (Math.floor(max / exp) > 0) {
        // Counting sort for this digit
        let output = new Array(a.length);
        let count = new Array(10).fill(0);
        for (let i = 0; i < a.length; i++)
            count[Math.floor(a[i] / exp) % 10]++;
        for (let i = 1; i < 10; i++)
            count[i] += count[i - 1];
        for (let i = a.length - 1; i >= 0; i--) {
            let digit = Math.floor(a[i] / exp) % 10;
            output[count[digit] - 1] = a[i];
            count[digit]--;
        }
        // Save step: show the array, the digit, and the buckets
        steps.push({
            arr: a.slice(),
            exp,
            digitBuckets: count.slice(),
            output: output.slice(),
            phase: 'sort',
        });
        // Copy output to a for next pass
        for (let i = 0; i < a.length; i++)
            a[i] = output[i];
        exp *= 10;
    }
    // Final sorted state
    steps.push({
        arr: a.slice(),
        exp: null,
        digitBuckets: null,
        output: null,
        phase: 'done',
    });
    return steps;
}

function updateRadixSortStep() {
    if (!radixSortSteps.length) return;
    const step = radixSortSteps[radixSortStep];
    // Visualization
    visualization.innerHTML = step.arr.map((num, idx) => {
        let cls = '';
        if (step.phase === 'done') cls = 'radix-sorted';
        else if (step.phase === 'sort') cls = 'radix-current';
        return `<span class="radix-item ${cls}">
            <div>${num}</div>
            <div class="radix-index">${idx}</div>
        </span>`;
    }).join(' ');
    // Explanation
    if (step.phase === 'done') {
        explanation.innerHTML = `<b>Array is fully sorted!</b>`;
    } else {
        explanation.innerHTML = `Sorting by digit place <b>${step.exp}</b> (1=units, 10=tens, 100=hundreds, ...).`;
    }
    // Button states
    prevBtn.disabled = radixSortStep === 0;
    nextBtn.disabled = radixSortStep === radixSortSteps.length - 1;
}

// Step navigation for Radix Sort
const origPrevRadix = prevBtn.onclick;
const origNextRadix = nextBtn.onclick;
prevBtn.onclick = function() {
    if (currentAlgo === 'radix-sort') {
        if (radixSortStep > 0) {
            radixSortStep--;
            updateRadixSortStep();
        }
    } else if (origPrevRadix) {
        origPrevRadix();
    }
};
nextBtn.onclick = function() {
    if (currentAlgo === 'radix-sort') {
        if (radixSortStep < radixSortSteps.length - 1) {
            radixSortStep++;
            updateRadixSortStep();
        }
    } else if (origNextRadix) {
        origNextRadix();
    }
};

function renderRadixSortLegend() {
    const legend = document.createElement('div');
    legend.id = 'radix-legend';
    legend.style.margin = '0.5rem 0 1rem 0';
    legend.innerHTML = `
        <span class="radix-item radix-current" style="margin-right:8px;">Current Pass</span>
        <span class="radix-item radix-sorted" style="margin-right:8px;">Sorted</span>
    `;
    visualization.parentNode.insertBefore(legend, visualization);
}

document.head.insertAdjacentHTML('beforeend', `<style>
.radix-item {
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
.radix-index {
    display: block;
    font-size: 0.85em;
    color: #888;
    margin-top: 0.15em;
    text-align: center;
    letter-spacing: 0.5px;
}
.radix-current {
    background: #ffb84f;
    color: #fff;
    font-weight: bold;
}
.radix-sorted {
    background: #4f8cff;
    color: #fff;
    font-weight: bold;
}
</style>`);
