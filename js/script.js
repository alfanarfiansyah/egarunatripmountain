
/* =========================================
   EGARUNA MOUNTAIN TRIP
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   KONFIGURASI WHATSAPP
========================================= */

// Ganti dengan nomor WhatsApp admin.
// Gunakan format 62 tanpa tanda + atau 0 di depan.

const whatsappNumber = "6285382920804";


/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});


/* =========================================
   NAVBAR BUBBLE
========================================= */

const bubbleNav = document.getElementById("bubbleNav");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll(".nav-link");


/* Toggle Menu */

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    const icon = menuToggle.querySelector("i");

    if (isOpen) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close Menu */

function closeMenu() {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

}


navItems.forEach(link => {

    link.addEventListener("click", function () {

        closeMenu();

    });

});


/* Close Menu When Clicking Outside */

document.addEventListener("click", function (event) {

    if (
        !bubbleNav.contains(event.target) &&
        navLinks.classList.contains("open")
    ) {

        closeMenu();

    }

});


/* Sticky Navbar */

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        bubbleNav.classList.add("scrolled");

    } else {

        bubbleNav.classList.remove("scrolled");

    }

});


/* Active Navbar On Scroll */

const pageSections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    let currentSection = "home";

    pageSections.forEach(section => {

        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    function (entries, observer) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCounter = document.getElementById("lightboxCounter");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");

const lightboxNext = document.getElementById("lightboxNext");


let currentGalleryIndex = 0;

let galleryImages = [];


/* Ambil Semua Gambar */

galleryItems.forEach((item, index) => {

    const image = item.querySelector("img");

    galleryImages.push({

        src: image.src,
        alt: image.alt

    });


    item.addEventListener("click", function () {

        currentGalleryIndex = index;

        openLightbox();

    });

});


/* Open Lightbox */

function openLightbox() {

    updateLightbox();

    lightbox.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* Update Image */

function updateLightbox() {

    const image = galleryImages[currentGalleryIndex];

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxCounter.textContent =
        `${currentGalleryIndex + 1} / ${galleryImages.length}`;

}


/* Close Lightbox */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


lightboxClose.addEventListener("click", closeLightbox);


/* Previous Image */

function previousImage() {

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex = galleryImages.length - 1;

    }

    updateLightbox();

}


lightboxPrev.addEventListener("click", previousImage);


/* Next Image */

function nextImage() {

    currentGalleryIndex++;

    if (currentGalleryIndex >= galleryImages.length) {

        currentGalleryIndex = 0;

    }

    updateLightbox();

}


lightboxNext.addEventListener("click", nextImage);


/* Click Outside Image */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* Keyboard Navigation */

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowRight") {

        nextImage();

    }

    if (event.key === "ArrowLeft") {

        previousImage();

    }

});


/* Swipe Mobile */

let touchStartX = 0;

let touchEndX = 0;

lightbox.addEventListener("touchstart", function (event) {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });


lightbox.addEventListener("touchend", function (event) {

    touchEndX = event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {

        nextImage();

    } else {

        previousImage();

    }

}, { passive: true });


/* =========================================
   TESTIMONIAL SLIDER
========================================= */

const testimonialTrack = document.getElementById("testimonialTrack");

const testimonialCards = document.querySelectorAll(".testimonial-card");

const testimonialPrev = document.getElementById("testimonialPrev");

const testimonialNext = document.getElementById("testimonialNext");

const testimonialDots = document.getElementById("testimonialDots");

const testimonialSlider = document.getElementById("testimonialSlider");


let testimonialIndex = 0;

let testimonialInterval;

const totalTestimonials = testimonialCards.length;


/* Create Dots */

testimonialCards.forEach((card, index) => {

    const dot = document.createElement("button");

    dot.classList.add("testimonial-dot");

    dot.setAttribute("aria-label", `Testimoni ${index + 1}`);

    if (index === 0) {

        dot.classList.add("active");

    }

    dot.addEventListener("click", function () {

        testimonialIndex = index;

        updateTestimonial();

        restartTestimonial();

    });

    testimonialDots.appendChild(dot);

});


/* Update Slider */

function updateTestimonial() {

    testimonialTrack.style.transform =
        `translateX(-${testimonialIndex * 100}%)`;


    const dots = document.querySelectorAll(".testimonial-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === testimonialIndex
        );

    });

}


/* Next Testimonial */

function nextTestimonial() {

    testimonialIndex++;

    if (testimonialIndex >= totalTestimonials) {

        testimonialIndex = 0;

    }

    updateTestimonial();

}


/* Previous Testimonial */

function previousTestimonial() {

    testimonialIndex--;

    if (testimonialIndex < 0) {

        testimonialIndex = totalTestimonials - 1;

    }

    updateTestimonial();

}


testimonialNext.addEventListener("click", function () {

    nextTestimonial();

    restartTestimonial();

});


testimonialPrev.addEventListener("click", function () {

    previousTestimonial();

    restartTestimonial();

});


/* Auto Slide */

function startTestimonial() {

    clearInterval(testimonialInterval);

    testimonialInterval = setInterval(() => {

        nextTestimonial();

    }, 4500);

}


function stopTestimonial() {

    clearInterval(testimonialInterval);

}


function restartTestimonial() {

    stopTestimonial();

    startTestimonial();

}


testimonialSlider.addEventListener("mouseenter", stopTestimonial);

testimonialSlider.addEventListener("mouseleave", startTestimonial);


/* Pause When Tab Is Hidden */

document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        stopTestimonial();

    } else {

        startTestimonial();

    }

});


startTestimonial();


/* =========================================
   WHATSAPP BOOKING
========================================= */


/* Booking Per Paket */

function bookTrip(packageName) {

    const message =
        `Halo Egaruna Mountain Trip, saya ingin bertanya mengenai paket ${packageName}. Mohon informasi harga, durasi, jadwal, dan fasilitas trip. Terima kasih.`;

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


/* Contact Admin */

function contactAdmin() {

    const message =
        "Halo Egaruna Mountain Trip, saya ingin bertanya mengenai informasi paket dan jadwal perjalanan. Mohon informasinya. Terima kasih.";

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =========================================
   IMAGE FALLBACK
========================================= */

// Jika gambar belum tersedia, tampilkan warna pengganti
// agar layout tidak berantakan.

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", function () {

        this.style.backgroundColor = "#eadbd5";

        this.style.color = "#7f1f20";

        this.style.objectFit = "contain";

    });

});
