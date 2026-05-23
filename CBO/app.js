document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------------------------
    // 1. Volunteer Form Submission & Capture
    // --------------------------------------------------------------------------
    const volunteerForm = document.getElementById("volunteerForm");
    const otherAreaGroup = document.getElementById("otherAreaGroup");
    const triggerOtherCheckbox = document.getElementById("triggerOther");
    const otherAreaInput = document.getElementById("otherArea");

    // Dynamic visibility of "Other Area" specify field
    if (triggerOtherCheckbox && otherAreaGroup && otherAreaInput) {
        triggerOtherCheckbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                otherAreaGroup.classList.add("show");
                otherAreaInput.setAttribute("required", "required");
                otherAreaInput.focus();
            } else {
                otherAreaGroup.classList.remove("show");
                otherAreaInput.removeAttribute("required");
                otherAreaInput.value = "";
            }
        });
    }

    if (volunteerForm) {
        volunteerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Collect checkboxes arrays securely
            const selectedAreas = [];
            const checkedBoxes = document.querySelectorAll('input[name="areas"]:checked');

            // Validation: Ensure at least one help area is selected
            if (checkedBoxes.length === 0) {
                alert("Please select at least one Help Area of interest.");
                return;
            }

            checkedBoxes.forEach((checkbox) => {
                selectedAreas.push(checkbox.value);
            });

            const otherAreaVal = otherAreaInput ? otherAreaInput.value : "";
            if (otherAreaVal.trim() !== "") {
                selectedAreas.push(`Other: ${otherAreaVal}`);
            }

            // Collect selected contact methods
            const selectedContactMethods = [];
            document.querySelectorAll('input[name="contactMethod"]:checked').forEach((cb) => {
                selectedContactMethods.push(cb.value);
            });

            // Capture functional key payload package
            const submissionPayload = {
                fullName: document.getElementById("fullName").value,
                age: document.getElementById("age").value,
                gender: document.getElementById("gender").value,
                phone: document.getElementById("phone").value,
                email: document.getElementById("email").value,
                location: document.getElementById("location").value,
                occupation: document.getElementById("occupation").value,
                reason: document.getElementById("reason").value,
                helpAreas: selectedAreas,
                physicalAvailability: document.querySelector('input[name="physical"]:checked')?.value,
                skills: document.getElementById("skills").value,
                contactMethods: selectedContactMethods
            };

            // Keep original log statement for data packet auditing
            console.log("Volunteer Data Packets Processed:", submissionPayload);

            // Populating data preview in the sleek success modal
            document.getElementById("previewName").textContent = submissionPayload.fullName;
            document.getElementById("previewEmail").textContent = submissionPayload.email;
            document.getElementById("previewAreas").textContent = submissionPayload.helpAreas.join(", ");
            document.getElementById("previewAvailability").textContent = submissionPayload.physicalAvailability || "Not Specified";

            // Open Success Modal Overlay (stunning modern feedback mechanism)
            openModal();

            // Reset volunteer form elements & collapse other field
            volunteerForm.reset();
            if (otherAreaGroup) {
                otherAreaGroup.classList.remove("show");
                otherAreaInput.removeAttribute("required");
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. Feedback Modal Management
    // --------------------------------------------------------------------------
    const successModal = document.getElementById("successModalOverlay");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalConfirmBtn = document.getElementById("modalConfirmBtn");

    function openModal() {
        if (successModal) {
            successModal.classList.add("show");
            document.body.style.overflow = "hidden"; // Disable scroll behind modal
        }
    }

    function closeModal() {
        if (successModal) {
            successModal.classList.remove("show");
            document.body.style.overflow = ""; // Re-enable scroll
        }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalConfirmBtn) modalConfirmBtn.addEventListener("click", closeModal);

    // Close modal if clicked on overlay area outside card
    if (successModal) {
        successModal.addEventListener("click", (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape keypress
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    // --------------------------------------------------------------------------
    // 3. Tab Navigation (About Section)
    // --------------------------------------------------------------------------
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            // Deactivate active states
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("active"));

            // Activate current tab state
            button.classList.add("active");
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add("active");
            }
        });
    });

    // --------------------------------------------------------------------------
    // 4. Header Behavior & Scroll Spy
    // --------------------------------------------------------------------------
    const header = document.querySelector(".main-header");
    const navLinks = document.querySelectorAll(".nav-link:not(.nav-btn)");
    const sections = document.querySelectorAll("section");

    // Add sticky class on scrolling down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Scroll Spy: Update active header menu links
    const scrollOptions = {
        threshold: 0.25,
        rootMargin: "0px 0px -20% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, scrollOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --------------------------------------------------------------------------
    // 5. Mobile Navigation Menu Toggle
    // --------------------------------------------------------------------------
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    const navMenuLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            navMenu.classList.toggle("show");
        });

        // Close menu when clicking on any links
        navMenuLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("show");
            });
        });
    }
});
