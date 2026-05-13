/** * 1. MODEL PORTFOLIO MODAL LOGIC
 */
 function openPortfolio(name, height, loc, img) {
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('modalImg');
    
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalHeight').innerText = height;
    document.getElementById('modalLoc').innerText = loc;
    
    // Set background image with centering
    modalImg.style.backgroundImage = `url(${img})`;
    modalImg.style.backgroundSize = "cover";
    modalImg.style.backgroundPosition = "center";
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Stop page scroll
}

function closePortfolio() {
    const modal = document.getElementById('portfolioModal');
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scroll
}

// Close if user clicks outside the modal box
window.onclick = function(event) {
    const modal = document.getElementById('portfolioModal');
    if (event.target == modal) {
        closePortfolio();
    }
}

/** * 2. HAMBURGER MENU TOGGLE
 */
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

/** * 3. FORM SUBMISSION WITH SUCCESS OVERLAY
 */
const form = document.getElementById('model-form');
const successOverlay = document.getElementById('successOverlay');

form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Stop page from refreshing
    
    const submitButton = document.querySelector('.submit-btn');
    const formData = new FormData(this);
    
    // UI Feedback: Start
    submitButton.innerText = "SENDING...";
    submitButton.style.opacity = "0.7";
    submitButton.disabled = true;

    try {
        // Force the URL directly in the script so there is no confusion
const response = await fetch("https://formspree.io/f/mkooqeqb", {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Success! Show your new overlay
            successOverlay.style.display = "flex";
            this.reset(); // Clear the form
        } else {
            // Something went wrong (likely verification)
            const errorData = await response.json();
            alert("Submission Error: " + (errorData.error || "Please verify your Formspree email."));
            submitButton.innerText = "TRY AGAIN";
        }
    } catch (error) {
        alert("Network error. Please check your connection.");
        submitButton.innerText = "SEND APPLICATION";
    } finally {
        // Always restore the button regardless of success or failure
        submitButton.style.opacity = "1";
        submitButton.disabled = false;
        if(submitButton.innerText === "SENDING...") {
            submitButton.innerText = "SEND APPLICATION";
        }
    }
});

function closeSuccess() {
    successOverlay.style.display = "none";
}

/** * 4. SMOOTH SCROLL FOR BUTTONS
 */
const navCta = document.querySelector('.navbar .cta-btn');
if (navCta) {
    navCta.addEventListener('click', () => {
        const applySection = document.querySelector('#apply');
        applySection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    });
}
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
});
// Function to handle the instant popup
window.addEventListener('load', function() {
    const termsModal = document.getElementById('termsModal');
    
    // Show the modal instantly
    termsModal.style.display = 'flex';
    
    // Prevent scrolling of the background while terms are open
    document.body.style.overflow = 'hidden';
});

// Function to close terms and restore scroll
function acceptTerms() {
    const termsModal = document.getElementById('termsModal');
    termsModal.style.display = 'none';
    
    // Allow background scrolling again
    document.body.style.overflow = 'auto';
}