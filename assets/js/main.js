// ************************ Show Nagivation ************************
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

// SHOW MENU: validate if constant exists
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// HIDE MENU: validate if constant exists
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// ************************ Remove Nagivation ************************
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// ************************ Typing Animation *************************
// Function to display the sentence with typing animation
function displaySentence() {
    var sentenceElement = document.getElementById("job-titles");
    var sentence = "Hi there, I am Ryoichi Homma, Full-Stack Developer, Software Engineer, Network Engineer, Database Engineer, and Android App Developer, in Canada!";
    var index = 0;
    var timeout;

    function typeSentence() {
        if(index < sentence.length) {
            sentenceElement.innerHTML += sentence.charAt(index);

            // if the current character is a comma, add a line break
            if(sentence.charAt(index) === ",") {
                sentenceElement.innerHTML += "<br>"; 
                index++; // move to the next character after the comma
            }
            timeout = setTimeout(typeSentence, 25); // delay between each character
            index++;
        }
        else {
            index = 0;  // reset the index to 0 to repeat the animation
            clearTimeout(timeout);  // clear the timeout to prevent repeating immediately

            // delay before clear the text to keep it visible for a few seconds
            setTimeout(function() {
                sentenceElement.innerHTML = "";
                setTimeout(typeSentence, 0); // start repeating immediately after clear the text
            }, 2000);
        }
    }
    typeSentence(); // start typing the sentence
}
displaySentence();  // all the function to start displaying the sentence with typing animation


// ************************ Swiper Settings **************************
let swiperProjects = new Swiper(".projects__container", {
    grabCursor: true,
    loop: true,
    spaceBetween: 24,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    mousewheel: true,  // to swiper by mouse
    keyboard: true,  // to swiper by keyboard
    breakpoints: {
        1200: {
            slidesPerView: 2,
            spaceBetween: -56,
        },
    },
});

// ************************* Credentials Tabs *************************** 
const tabs = document.querySelectorAll('[data-target]'), 
    tabContents = document.querySelectorAll('[info-content]'); 

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('credentials__active');
        });
        target.classList.add('credentials__active');

        tabs.forEach(tab => {
            tab.classList.remove('credentials__active');
        }); 
        tab.classList.add('credentials__active');
    });
});

// ********************** Contact Form Settings *************************
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactSubject = document.getElementById('contact-subject'),
    contactContent = document.getElementById('contact-content'),
    contactStatus = document.getElementById('contact-status');

// check if email domain is valid using Google DNS
const validateEmailDomain = async (email) => {
    const domain = email.split('@')[1]; 
    try {
        const response = await fetch(`https://dns.google.com/resolve?name=${domain}&type=MX`);
        const data = await response.json(); 
        return data.Answer && data.Answer.length > 0; 
    }
    catch (error) {
        console.error(error);
        return false; 
    }
}

const sendEmail = async (e) => {
    e.preventDefault();

    // check if all input fields are filled
    if(contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactContent.value === '') {
        contactStatus.classList.add('color-red');
        contactStatus.classList.remove('color-blue');
        contactStatus.textContent = "Please fill all input fields ⚠️";
        setTimeout(() => {
            contactStatus.textContent = '';
        }, 5000);
    }
    // check if input email is valid using Validator.js
    else if(!validator.isEmail(contactEmail.value)) {
        contactStatus.classList.add('color-red');
        contactStatus.classList.remove('color-blue');
        contactStatus.textContent = "Please enter a valid email address ⚠️";
        setTimeout(() => {
            contactStatus.textContent = '';
        }, 5000);
    }
    // check if email domain is valid using Google DNS
    else if(!await validateEmailDomain(contactEmail.value)) {
        contactStatus.classList.add('color-red');
        contactStatus.classList.remove('color-blue');
        contactStatus.textContent = "Invalid email domain, check for typos ⚠️";
        setTimeout(() => {
            contactStatus.textContent = '';
        }, 5000);    
    }
    else {
        // service ID, Template ID, #contact-form, Public key
        emailjs.sendForm('service_b0glpz8', 'template_tm31dkp', '#contact-form', 'JlD8T5SOu2dXKRnSW').then(() => {
            contactStatus.classList.add('color-blue');
            contactStatus.textContent = "Your inquiry submitted ✅";
        }, (error) => {
            alert("OOPS! SOMETHING HAS FAILED...", error);
        });
        setTimeout(() => {
            contactName.value = '';
            contactEmail.value = '';
            contactSubject.value = '';
            contactContent.value = '';
            contactStatus.textContent = '';
        }, 5000);
    }
}
contactForm.addEventListener('submit', sendEmail);

// ************************ Scroll Section & Active Link Settings ************************
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58, 
                sectionId = current.getAttribute('id'), 
                sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        }
        else {
            sectionsClass.classList.remove('active-link');
        }

        // const contactNavLink = document.querySelector('.nav__menu a[href="#contact"]');
        // if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        //     contactNavLink.classList.add('active-link');
        // }
        // else {
        //     contactNavLink.classList.remove('active-link');
        // }
    });
}
window.addEventListener('scroll', scrollActive);

const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    // when the scroll is higher than 350 viewport height, add the show-scroll class to teh a tag with the scrollup
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);


// ************************ Dark / Light Mode Settings ************************
const modeButton = document.getElementById('moonIcon');
const darkMode = 'dark-mode';
const iconMode = 'ri-sun-fill';

const selectedMode = localStorage.getItem('selected-mode');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentMode = () => document.body.classList.contains(darkMode) ? 'dark' : 'light';
const getCurrentIcon = () => modeButton.classList.contains(iconMode) ? 'ri-moon-fill' : 'ri-sun-line';

if(selectedMode) {
document.body.classList[selectedMode === 'dark' ? 'add' : 'remove'](darkMode);
modeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconMode);
}

// Activate / deactivate the mode manually with the button
modeButton.addEventListener('click', () => {
    // to add or remove the dark / icon mode
    document.body.classList.toggle(darkMode);
    modeButton.classList.toggle(iconMode);

    // to save the mode and the current icon that the user chose
    localStorage.setItem('selected-mode', getCurrentMode());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// ************************ Change Background Header ************************
const scrollHeader = () => {
    const header = document.getElementById('header');
    // when the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('background-header')
                       : header.classList.remove('background-header');
}
window.addEventListener('scroll', scrollHeader);

// ************************* ScrollReveal Animation ************************
const sr = ScrollReveal({
    origin: 'top', 
    distance: '60px', 
    duration: 2500, 
    delay: 400, 
    reset: true
});

sr.reveal('.home__profile, .projects__container, .credentials__contents, .footer__container');
sr.reveal('.home__info div', {delay: 600, origin: 'bottom', interval: 100});
sr.reveal('.skills__content:nth-child(1), .skills__content:nth-child(3)', {origin: 'left'});
sr.reveal('.skills__content:nth-child(2), .skills__content:nth-child(4)', {origin: 'right'});
sr.reveal('.service__card', {interval: 100});
sr.reveal('.contact__content:nth-child(1)', {origin: 'left'});
sr.reveal('.contact__content:nth-child(2)', {origin: 'right'});
