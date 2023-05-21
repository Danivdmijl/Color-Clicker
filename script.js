var score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
var upgradeLevel = localStorage.getItem("upgradeLevel") ? parseInt(localStorage.getItem("upgradeLevel")) : 0;
var upgradeCost = localStorage.getItem("upgradeCost") ? parseInt(localStorage.getItem("upgradeCost")) : 10;
var pointsPerClick = localStorage.getItem("pointsPerClick") ? parseInt(localStorage.getItem("pointsPerClick")) : 1;
var clickCount = 0;
var cps = 0;
var cpsInterval;

// Function to generate a random color
function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to update the color of the color box
function updateColor() {
  var colorBox = document.getElementById("color-box");
  var randomColor = generateRandomColor();
  colorBox.style.backgroundColor = randomColor;
}

// Function to handle the click event on the color box
function handleClick() {
  score += (upgradeLevel + 1) * pointsPerClick;
  document.getElementById("score").textContent = "Score: " + score;
  updateColor();
  clickCount++;
  
  if (score >= upgradeCost) {
    document.getElementById("upgrade-button").disabled = false;
  }
  
  saveDataToLocalStorage();
}

// Function to handle the click event on the upgrade button
function handleUpgradeClick() {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    upgradeLevel++;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    pointsPerClick++;
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("upgrade").textContent = "Upgrade: " + upgradeLevel;
    document.getElementById("upgrade-button").textContent = "Buy Upgrade (" + upgradeCost + " points)";
    document.getElementById("upgrade-button").disabled = true;
    
    saveDataToLocalStorage();
  }
}

// Function to update the CPS counter
function updateCPS() {
  cps = clickCount;
  document.getElementById("cps").textContent = "CPS: " + cps;
  clickCount = 0;
}

// Function to save data to localStorage
function saveDataToLocalStorage() {
  localStorage.setItem("score", score.toString());
  localStorage.setItem("upgradeLevel", upgradeLevel.toString());
  localStorage.setItem("upgradeCost", upgradeCost.toString());
  localStorage.setItem("pointsPerClick", pointsPerClick.toString());
}

// Function to handle the click event on the reset button
function handleResetClick() {
  var confirmation = confirm("Are you sure you want to reset the game? This will clear all your progress.");
  if (confirmation) {
    localStorage.clear();
    score = 0;
    upgradeLevel = 0;
    upgradeCost = 10;
    pointsPerClick = 1;
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("upgrade").textContent = "Upgrade: " + upgradeLevel;
    document.getElementById("upgrade-button").textContent = "Buy Upgrade (" + upgradeCost + " points)";
    document.getElementById("upgrade-button").disabled = true;
  }
}

// Add click event listeners
document.getElementById("color-box").addEventListener("click", handleClick);
document.getElementById("upgrade-button").addEventListener("click", handleUpgradeClick);
document.getElementById("reset-button").addEventListener("click", handleResetClick);

// Start CPS counter
cpsInterval = setInterval(updateCPS, 1000);

// Initial setup
updateColor();
document.getElementById("score").textContent = "Score: " + score;
document.getElementById("upgrade").textContent = "Upgrade: " + upgradeLevel;
document.getElementById("upgrade-button").textContent = "Buy Upgrade (" + upgradeCost + " points)";
document.getElementById("cps").textContent = "CPS: " + cps;
