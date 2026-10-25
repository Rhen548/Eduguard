
/* =====================================================
   EDUGUARD — FORGOT PASSWORD DEMO

   Important:
   - This is a client-side demonstration.
   - No email is sent.
   - No user account is checked.
   - No password is saved or changed.
   ===================================================== */

(() => {
    "use strict";

    /* ---------------------------------------------
       1. DOM HELPERS
       --------------------------------------------- */

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) =>
        Array.from(document.querySelectorAll(selector));

    const DEMO_CODE = "428619";

    let currentStep = 1;


    /* ---------------------------------------------
       2. PAGE ELEMENTS
       --------------------------------------------- */

    const stages = {
        1: $("#stageIdentify"),
        2: $("#stageVerify"),
        3: $("#stageReset"),
        4: $("#stageSuccess")
    };

    const identifyForm = $("#identifyForm");
    const verifyForm = $("#verifyForm");
    const resetForm = $("#resetForm");

    const emailInput = $("#recoveryEmail");
    const codeInput = $("#verificationCode");
    const newPassword = $("#newPassword");
    const confirmPassword = $("#confirmPassword");


    /* ---------------------------------------------
       3. ERROR MESSAGE HANDLING
       --------------------------------------------- */

    function showError(element, message, input) {
        element.textContent = message;
        element.hidden = false;

        if (input) {
            input.setAttribute("aria-invalid", "true");
            input.focus();
        }
    }

    function clearError(element, input) {
        element.textContent = "";
        element.hidden = true;

        if (input) {
            input.removeAttribute("aria-invalid");
        }
    }


    /* ---------------------------------------------
       4. UPDATE ACTIVE STEP
       --------------------------------------------- */

    function goToStep(step) {

        currentStep = step;

        Object.entries(stages).forEach(([number, element]) => {
            element.hidden = Number(number) !== step;
        });

        $$(".progress-step").forEach((element) => {

            const progress = Number(element.dataset.progress);

            element.classList.toggle(
                "active",
                progress === step
            );

            element.classList.toggle(
                "done",
                progress < step
            );

            if (progress === step) {
                element.setAttribute("aria-current", "step");
            } else {
                element.removeAttribute("aria-current");
            }

        });

        /* Success means all three stages are complete. */

        if (step === 4) {
            $$(".progress-step").forEach((element) => {
                element.classList.remove("active");
                element.classList.add("done");
                element.removeAttribute("aria-current");
            });
        }

        const headings = {
            1: "#identifyTitle",
            2: "#verifyTitle",
            3: "#resetTitle",
            4: "#successTitle"
        };

        $(headings[step])?.focus?.();

        /* Scroll the form into view on smaller devices. */

        if (window.innerWidth <= 950) {
            $(".recovery-form-side").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }


    /* ---------------------------------------------
       5. STEP 1 — IDENTIFY ACCOUNT
       --------------------------------------------- */

    identifyForm.addEventListener("submit", (event) => {

        event.preventDefault();

        clearError($("#identifyError"), emailInput);

        const email = emailInput.value.trim();

        if (!email) {
            showError(
                $("#identifyError"),
                "Please enter a sample email address.",
                emailInput
            );
            return;
        }

        emailInput.value = email;

        if (!emailInput.checkValidity()) {
            showError(
                $("#identifyError"),
                "Please enter a valid email address.",
                emailInput
            );
            return;
        }

        /* Display only: no account lookup. */

        $("#emailPreview").textContent = email;
        $("#displayDemoCode").textContent = DEMO_CODE;

        goToStep(2);
    });


    /* ---------------------------------------------
       6. STEP 2 — VERIFY DEMO CODE
       --------------------------------------------- */

    verifyForm.addEventListener("submit", (event) => {

        event.preventDefault();

        clearError($("#verifyError"), codeInput);

        const enteredCode = codeInput.value.trim();

        if (!/^\d{6}$/.test(enteredCode)) {
            showError(
                $("#verifyError"),
                "Please enter the six-digit demonstration code.",
                codeInput
            );
            return;
        }

        if (enteredCode !== DEMO_CODE) {
            showError(
                $("#verifyError"),
                "Incorrect demo code. Please use the code displayed above.",
                codeInput
            );
            return;
        }

        goToStep(3);
    });


    /* ---------------------------------------------
       7. STEP 3 — PREVIEW PASSWORD RESET
       --------------------------------------------- */

    resetForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const error = $("#resetError");

        clearError(error, newPassword);
        confirmPassword.removeAttribute("aria-invalid");

        const password = newPassword.value;
        const confirmation = confirmPassword.value;

        if (password.length < 8) {
            showError(
                error,
                "Use a sample password with at least 8 characters.",
                newPassword
            );
            return;
        }

        if (password !== confirmation) {
            showError(
                error,
                "The passwords do not match.",
                confirmPassword
            );
            return;
        }

        /* IMPORTANT:
           Never store the demo password.
           Clear both fields immediately. */

        newPassword.value = "";
        confirmPassword.value = "";

        goToStep(4);
    });


    /* ---------------------------------------------
       8. BACK BUTTONS
       --------------------------------------------- */

    $("#backToIdentify").addEventListener("click", () => {

        codeInput.value = "";
        clearError($("#verifyError"), codeInput);

        goToStep(1);
    });

    $("#backToVerify").addEventListener("click", () => {

        newPassword.value = "";
        confirmPassword.value = "";

        clearError($("#resetError"), newPassword);
        confirmPassword.removeAttribute("aria-invalid");

        goToStep(2);
    });


    /* ---------------------------------------------
       9. SHOW / HIDE PASSWORD
       --------------------------------------------- */

    $$("[data-toggle-password]").forEach((button) => {

        button.addEventListener("click", () => {

            const inputId = button.dataset.togglePassword;
            const input = document.getElementById(inputId);

            if (!input) return;

            const isCurrentlyHidden = input.type === "password";

            input.type = isCurrentlyHidden
                ? "text"
                : "password";

            button.textContent = isCurrentlyHidden
                ? "Hide"
                : "Show";

            button.setAttribute(
                "aria-pressed",
                String(isCurrentlyHidden)
            );

            button.setAttribute(
                "aria-label",
                isCurrentlyHidden
                    ? "Hide password"
                    : "Show password"
            );
        });
    });


    /* ---------------------------------------------
       10. RESTART DEMONSTRATION
       --------------------------------------------- */

    $("#restartDemo").addEventListener("click", () => {

        identifyForm.reset();
        verifyForm.reset();
        resetForm.reset();

        clearError($("#identifyError"), emailInput);
        clearError($("#verifyError"), codeInput);
        clearError($("#resetError"), newPassword);

        confirmPassword.removeAttribute("aria-invalid");

        $$("[data-toggle-password]").forEach((button) => {
            const input = document.getElementById(
                button.dataset.togglePassword
            );

            if (input) input.type = "password";

            button.textContent = "Show";
            button.setAttribute("aria-pressed", "false");
            button.setAttribute(
                "aria-label",
                "Show password"
            );
        });

        goToStep(1);
    });

})();
