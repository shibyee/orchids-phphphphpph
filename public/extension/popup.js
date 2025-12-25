const DEFAULTS = {
    homeName: "111",
    bal: "1.22",
    delta: "-0.0274",
    pct: "-2.21",
    tokAmt: "0.01 SOL",
    tokUsd: "1.22",
    tokChg: "-0.03",
    badgeCount: "3"
};

let currentData = { ...DEFAULTS };

function updateUI() {
    const data = currentData;
    
    // Display updates
    document.getElementById('disp-homeName').textContent = data.homeName;
    document.getElementById('disp-bal').textContent = data.bal;
    
    // Delta
    const deltaVal = data.delta.replace('-', '').replace('+', '');
    const isNegDelta = data.delta.startsWith('-');
    document.getElementById('disp-delta').textContent = deltaVal;
    document.getElementById('disp-delta-sign').textContent = isNegDelta ? "-$" : "+$";
    document.getElementById('disp-delta-color').style.color = isNegDelta ? "#FF4D4D" : "#00FFA3";
    
    // Pct
    const pctVal = data.pct.replace('-', '').replace('+', '');
    const isNegPct = data.pct.startsWith('-');
    document.getElementById('disp-pct').textContent = pctVal;
    document.getElementById('disp-pct-sign').textContent = isNegPct ? "-" : "+";
    document.getElementById('disp-pct-badge').className = "pct-badge " + (isNegPct ? "" : "up");
    
    // Token
    document.getElementById('disp-tokAmt').textContent = data.tokAmt;
    document.getElementById('disp-tokUsd').textContent = data.tokUsd;
    
    const chgVal = data.tokChg.replace('-', '').replace('+', '');
    const isNegChg = data.tokChg.startsWith('-');
    document.getElementById('disp-tokChg').textContent = chgVal;
    document.getElementById('disp-tokChg-sign').textContent = isNegChg ? "-$" : "+$";
    document.getElementById('disp-tokChg-color').style.color = isNegChg ? "#FF4D4D" : "#00FFA3";
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function openEditor() {
    document.getElementById('edit-bal').value = currentData.bal;
    document.getElementById('edit-delta').value = currentData.delta;
    document.getElementById('edit-pct').value = currentData.pct;
    document.getElementById('edit-tokAmt').value = currentData.tokAmt;
    document.getElementById('edit-tokUsd').value = currentData.tokUsd;
    document.getElementById('edit-tokChg').value = currentData.tokChg;
    document.getElementById('edit-homeName').value = currentData.homeName;
    document.getElementById('editorModal').style.display = 'flex';
}

function closeEditor() {
    document.getElementById('editorModal').style.display = 'none';
}

function saveData() {
    currentData = {
        ...currentData,
        bal: document.getElementById('edit-bal').value,
        delta: document.getElementById('edit-delta').value,
        pct: document.getElementById('edit-pct').value,
        tokAmt: document.getElementById('edit-tokAmt').value,
        tokUsd: document.getElementById('edit-tokUsd').value,
        tokChg: document.getElementById('edit-tokChg').value,
        homeName: document.getElementById('edit-homeName').value,
    };
    
    updateUI();
    closeEditor();
    showScreen('s3');
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ mockData: currentData });
    } else {
        localStorage.setItem('phantom_mock_data', JSON.stringify(currentData));
    }
}

// Init
window.onload = () => {
    const saved = localStorage.getItem('phantom_mock_data');
    if (saved) {
        currentData = JSON.parse(saved);
        updateUI();
    } else if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['mockData'], (res) => {
            if (res.mockData) {
                currentData = res.mockData;
                updateUI();
            }
        });
    }
    updateUI();
};
