document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SCROLL REVEAL ANIMATIONS --- //
    const reveals = document.querySelectorAll(".reveal");

    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.15 
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });


    // --- 2. LOOK INSIDE MODAL LOGIC --- //
    const modal = document.getElementById('lookInsideModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.modal-close');

    // Open Modal
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    });

    // Close Modal via (X) button
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restores background scrolling
    });

    // Close Modal by clicking outside the modal content box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- 3. CART FORM TO WHATSAPP LOGIC --- //
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stops the page from refreshing
            
            // Grab the values the user typed in
            const name = document.getElementById('orderName').value;
            const email = document.getElementById('orderEmail').value;
            
            // Format the message for WhatsApp
            const message = `Hi, I would like to order a copy of 'A Baby on a Mission'.%0A%0AName: ${name}%0AEmail: ${email}`;
            
            // Client's WhatsApp number from the onboarding form
            const waUrl = `https://wa.me/2347060505413?text=${message}`;
            
            // Redirect the user to WhatsApp
            window.location.href = waUrl;
        });
    }

});