const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (
    savedTheme === "dark" ||
    (
        !savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    )
) {
    body.classList.add("dark");
}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            body.classList.contains("dark")
                ? "dark"
                : "light"
        );

    });

}


/* Mobile menu */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Open navigation"
                : "Close navigation"
        );

        navLinks.classList.toggle("open");

    });

}


/* Course query parameter */

const params = new URLSearchParams(window.location.search);

const selectedService = params.get("service");

const serviceSelect =
    document.getElementById("service");

if (selectedService && serviceSelect) {

    serviceSelect.value = selectedService;

}


/* Contact form */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            let valid = true;

            const requiredFields =
                contactForm.querySelectorAll(
                    "[required]"
                );


            requiredFields.forEach((field) => {

                const error =
                    contactForm.querySelector(
                        `[data-error-for="${field.id}"]`
                    );


                if (!field.checkValidity()) {

                    valid = false;

                    field.setAttribute(
                        "aria-invalid",
                        "true"
                    );


                    if (error) {

                        if (field.id === "phone") {

                            error.textContent =
                                "Please enter a valid phone number.";

                        } else {

                            error.textContent =
                                "This field is required.";

                        }

                    }

                } else {

                    field.removeAttribute(
                        "aria-invalid"
                    );

                    if (error) {
                        error.textContent = "";
                    }

                }

            });


            const status =
                document.getElementById(
                    "formStatus"
                );


            if (!valid) {

                status.textContent =
                    "Please correct the highlighted fields.";

                status.style.color =
                    "#dc2626";

                return;

            }


            status.textContent =
                "Thank you! Your enquiry has been received.";

            status.style.color =
                "#16a34a";


            contactForm.reset();

        }
    );

}