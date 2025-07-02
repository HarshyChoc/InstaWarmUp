const GSCRIPT_MACRO_URL = "https://script.google.com/macros/s/AKfycbzQmuLPKGOcd_3qilhfoWtgmSoE5aoVaRXTOrs6dYLnjxq-NxgPW80Z8V4QhQyqDDoO/exec";


// Define the steps with titles, instructions, demo videos, and durations

const steps = [
    {
        title: "Step 1: Follow Accounts",
        instructions: "Follow between 10-15 accounts from the following list",
        // demo: "steps/follow.mp4",
        duration: 60, // 1 minute
        listItems: [
            "drmaxbutterfield",
            "juminjuce",
            "relationships.usa",
            "jimmy_on_relationships",
            "relationship.lovegoals",
            "laurenohunter",
            "relationship_cards_usa",
            "Couplesofsociety",
            "Date_relation_quotes1",
            "relationships",
            "relationship_stats",
            "thatgirlgrow",
            "jordancandlish01",
            "kinkymemesdaily",
            "securerelationshipcoach",
            "rootvi",
            "relationshipreels",
            "secrets_relationship",
            "itsbaefeelings",
            "relationshipsusa",
            "lovesickrelationship"
            
        ]
    },
    {
        title: "Step 2: Repost Posts",
        instructions: "Repost 5-10 posts from the accounts you follow.",
        // demo: "steps/repost.mp4",
        duration: 120 // 2 minutes
    },
    {
        title: "Step 3: Engage with Search Terms",
        instructions: "Type any of the keywords below in the search bar. Like, comment, or share 5-10 posts.",
        // demo: "steps/keywords.mp4",
        duration: 120, // 1 minute
        listItems: [
            "relationship",
            "couple goals",
            "dating advice",
            "relationship advice",
            "relationship goals",
            "relationship advice",
            "couple prank",
            "dating tips",
            "relationship humor",
            "red flags",
        ]
        
    },
    {
        title: "Step 4: Engage in Main Feed",
        instructions: "Scroll on the main feed. Stop only at posts related to the Relationship, family, and life niche. Engage with the posts in any way you want (commenting, liking, saving).",
        // demo: "steps/feed.mp4",
        duration: 180 // 5 minutes
    }
];

// DOM Elements
const usernameScreen = document.getElementById("username-screen");
const stepScreen = document.getElementById("step-screen");
const successScreen = document.getElementById("success-screen");
const stepTitle = document.getElementById("step-title");
const stepInstructions = document.getElementById("step-instructions");
// const demoVideo = document.getElementById("demo-video");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const testBtn = document.getElementById("test-btn");
const usernameInput = document.getElementById("username");
// const restartVideoBtn = document.getElementById("restart-video-btn");
// const playVideoBtn = document.getElementById("play-video-btn");
const horizontalListContainer = document.getElementById("horizontal-list-container");
const horizontalList = document.getElementById("horizontal-list");
const listTitle = document.getElementById("list-title");

// Create toast notification element
const toastNotification = document.createElement('div');
toastNotification.className = 'toast-notification';
document.body.appendChild(toastNotification);

// State Variables
let currentStep = 0;
let username = "";
let timerInterval;
let toastTimeout;
let timerStartTime; // Add timestamp for when timer starts
let timerDuration; // Add total duration of current timer
let timerPaused = false; // Track if timer is paused

// Start Button Logic
startBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();
    if (username) {
        usernameScreen.style.display = "none";
        showStep(currentStep);
    } else {
        alert("Please enter a username!");
    }
});

// Test Button Logic - Auto Complete
testBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();
    if (username) {
        // Auto complete the entire process
        autoCompleteWarmup();
    } else {
        alert("Please enter a username!");
    }
});

// Auto Complete Function
function autoCompleteWarmup() {
    // Hide username screen and show success screen immediately
    usernameScreen.style.display = "none";
    successScreen.style.display = "block";
    successScreen.classList.add("fade-in");
    
    // Update the success message to indicate it was auto-completed
    const successTitle = successScreen.querySelector("h1");
    const successMessage = successScreen.querySelector("p");
    successTitle.textContent = "🧪 Test Complete!";
    successMessage.textContent = "Auto-completed warmup for testing purposes.";
    
    // Post to spreadsheet
    updateSpreadsheet(username);
    
    // Show toast notification
    showToast("Test completed - data sent to spreadsheet");
}

// Play Video Button Logic - Commented out
/*
playVideoBtn.addEventListener("click", () => {
    demoVideo.style.display = "block";
    demoVideo.play();
    playVideoBtn.style.display = "none";
});
*/

// Restart Video Button Logic - Commented out
/*
restartVideoBtn.addEventListener("click", () => {
    demoVideo.style.display = "block";
    demoVideo.currentTime = 0;
    demoVideo.play();
    restartVideoBtn.style.display = "none";
});
*/

// Video events - Commented out
/*
demoVideo.addEventListener("ended", () => {
    demoVideo.style.display = "none";
    restartVideoBtn.style.display = "block";
});
*/

// Show Step Function
function showStep(stepIndex) {
    const step = steps[stepIndex];
    stepTitle.textContent = step.title;
    stepInstructions.textContent = step.instructions;
    // demoVideo.src = step.demo;

    // Initially hide the video element and show only the play tutorial button - Commented out
    /*
    demoVideo.style.display = "none";
    playVideoBtn.style.display = "block";
    restartVideoBtn.style.display = "none";
    */

    // Handle horizontal list items if they exist
    if (step.listItems && step.listItems.length > 0) {
        // Clear previous list items
        horizontalList.innerHTML = '';

        // Set appropriate list title based on step
        if (stepIndex === 0) {
            listTitle.textContent = "Suggested Accounts:";
        } else if (stepIndex === 2) {
            listTitle.textContent = "Suggested Keywords:";
        } else {
            listTitle.textContent = "Suggested Items:";
        }

        // randomize the list items
        step.listItems.sort(() => Math.random() - 0.5);

        // Create and append new list items
        step.listItems.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'list-item';
            listItem.textContent = item;

            // Add copy icon with SVG
            const copyIcon = document.createElement('span');
            copyIcon.className = 'copy-icon';
            copyIcon.setAttribute('title', 'Copy to clipboard');
            copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
            </svg>`;
            listItem.appendChild(copyIcon);

            // Add click event to copy text
            copyIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent item click event

                // Copy text to clipboard
                navigator.clipboard.writeText(item).then(() => {
                    // Show success state
                    copyIcon.classList.add('copied');

                    // Show toast notification
                    showToast(`Copied: ${item}`);

                    // Reset after 1.5 seconds
                    setTimeout(() => {
                        copyIcon.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });

            horizontalList.appendChild(listItem);
        });

        // Show the horizontal list container
        horizontalListContainer.style.display = 'block';
    } else {
        // Hide the horizontal list container if no list items
        horizontalListContainer.style.display = 'none';
    }

    stepScreen.style.display = "block";
    stepScreen.classList.add("fade-in");
    startTimer(step.duration);

    // Remove animation class after it runs to allow reuse
    setTimeout(() => stepScreen.classList.remove("fade-in"), 500);
}

// Timer Function
function startTimer(duration) {
    timerDuration = duration; // Store the total duration
    timerStartTime = Date.now(); // Record the start time
    let timeLeft = duration;
    nextBtn.textContent = `Go to next step (${formatTime(timeLeft)})`;
    nextBtn.disabled = true;
    nextBtn.classList.remove("pulse");

    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Update the timer immediately and then every second
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer based on elapsed time
function updateTimer() {
    if (timerPaused) return;
    
    const elapsedSeconds = Math.floor((Date.now() - timerStartTime) / 1000);
    const timeLeft = Math.max(0, timerDuration - elapsedSeconds);
    
    nextBtn.textContent = `Go to next step (${formatTime(timeLeft)})`;
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        nextBtn.disabled = false;
        nextBtn.textContent = "I'm done, go to next step";
        nextBtn.classList.add("pulse");
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        // Page is hidden, record the time when hidden
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    } else {
        // Page is visible again, recalculate the timer
        if (timerStartTime && nextBtn.disabled) {
            // If timer was running (button still disabled), restart the interval
            timerInterval = setInterval(updateTimer, 1000);
        }
    }
});

// Format Time (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Next Button Logic
nextBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerStartTime = null; // Reset timer start time
    // Hide video when moving to next step - Commented out
    /*
    demoVideo.style.display = "none";
    demoVideo.pause();
    */
    currentStep++;
    if (currentStep < steps.length) {
        showStep(currentStep);
    } else {
        stepScreen.style.display = "none";
        successScreen.style.display = "block";
        successScreen.classList.add("fade-in");
        updateSpreadsheet(username);
    }
});

// Update Google Spreadsheet
// function updateSpreadsheet(username) {
//     fetch(GSCRIPT_MACRO_URL, {
//         method: "POST",
//         mode: 'no-cors', // Add no-cors mode to bypass CORS restrictions
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: username })
//     })
//         .then(response => {
//             // With no-cors, we can't access the response content
//             console.log("Request sent successfully");
//             return { success: true };
//         })
//         .catch(error => console.error("Error updating spreadsheet:", error));
// }
// Update Google Spreadsheet
function updateSpreadsheet(username) {
    const payload = {
      username: username,
      platform: 'instagram'    // ← now sending “instagram”
    };
  
    fetch(GSCRIPT_MACRO_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(() => {
        console.log("Request sent with Instagram flag");
      })
      .catch(error => console.error("Error updating spreadsheet:", error));
  }
  


// Function to show toast notification
function showToast(message) {
    // Clear any existing timeout
    if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastNotification.classList.remove('toast-slide-in');
        toastNotification.classList.remove('toast-slide-out');
        toastNotification.classList.remove('show');
    }

    // Set toast content with checkmark icon
    toastNotification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
        ${message}
    `;

    // Show the toast with animation
    toastNotification.classList.add('show');
    toastNotification.classList.add('toast-slide-in');

    // Hide toast after 2 seconds
    toastTimeout = setTimeout(() => {
        toastNotification.classList.remove('toast-slide-in');
        toastNotification.classList.add('toast-slide-out');
        
        setTimeout(() => {
            toastNotification.classList.remove('show');
            toastNotification.classList.remove('toast-slide-out');
        }, 300);
    }, 2000);
}