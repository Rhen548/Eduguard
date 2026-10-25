
/*
====================================================
EDUGUARD INTERACTIVE PROTOTYPE
====================================================

Features:
- Required demo username and password
- Administrator, Teacher, and Guidance role selection
- Remember Me
- Password visibility (handled by login.html)
- Sidebar navigation
- Modal interactions
- Student table filtering
- Student profile preview
- Early warning filtering
- QR attendance simulation
- Demo form validation
- Sample CSV exports

IMPORTANT:
- This is a demonstration only.
- No real authentication
- No database saving
- No AI prediction model
- No actual SMS sending
- No real password recovery

All student information is fictional.

====================================================
*/

(() => {
    "use strict";


    // ================================================
    // SECTION 1: HELPER FUNCTIONS
    // ================================================

    const q = (selector, root = document) =>
        root.querySelector(selector);

    const qa = (selector, root = document) =>
        Array.from(root.querySelectorAll(selector));

    let toastTimeout;

    function toast(message) {
        const box = q("#toast");

        if (!box) {
            window.alert(message);
            return;
        }

        const text = q("#toastText");

        if (text) {
            text.textContent = message;
        }

        box.classList.add("show");

        window.clearTimeout(toastTimeout);

        toastTimeout = window.setTimeout(() => {
            box.classList.remove("show");
        }, 3400);
    }


    // ================================================
    // SECTION 2: MODAL FUNCTIONS
    // ================================================

    function openModal(id) {
        const modal = document.getElementById(id);

        if (!modal) return;

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        const first = q("input, button", modal);

        if (first) {
            first.focus();
        }
    }

    function closeModal() {
        qa(".modal-backdrop").forEach(element => {
            element.hidden = true;
        });

        document.body.style.overflow = "";
    }


    // ================================================
    // SECTION 3: GENERAL BUTTON EVENTS
    // ================================================

    qa("[data-toast]").forEach(button => {
        button.addEventListener("click", () => {
            toast(button.dataset.toast);
        });
    });

    qa("[data-open-modal]").forEach(button => {
        button.addEventListener("click", () => {
            openModal(button.dataset.openModal);
        });
    });

    qa("[data-close-modal]").forEach(button => {
        button.addEventListener("click", closeModal);
    });

    qa(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", event => {
            if (event.target === backdrop) {
                closeModal();
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });


    // ================================================
    // SECTION 4: SIDEBAR NAVIGATION
    // ================================================

    const shell = q("#shell");

    q("#menuToggle")?.addEventListener("click", () => {
        shell?.classList.toggle("sidebar-open");
    });

    q("#mobileScrim")?.addEventListener("click", () => {
        shell?.classList.remove("sidebar-open");
    });


    // ================================================
    // SECTION 5: DASHBOARD ROLE SWITCHING
    // ================================================

    const allowedRoles = [
        "admin",
        "teacher",
        "guidance"
    ];

    q("#roleSwitch")?.addEventListener("change", event => {
        const selectedValue = event.target.value;

        const role = allowedRoles.includes(selectedValue)
            ? selectedValue
            : "admin";

        const destination = new URL(
            window.location.href
        );

        destination.searchParams.set("role", role);

        window.location.assign(destination.toString());
    });


    // ================================================
    // SECTION 6: LOGIN ELEMENTS AND ROLE SELECTION
    // ================================================

    const demoRoleInputs = qa(
        'input[name="demo_role"]'
    );

    const loginButton = q("#enterDemo");

    const usernameInput = q("#demoUsername");

    const passwordInput = q("#demoPassword");

    const rememberCheckbox = q("#rememberMe");

    const storageKey = "eduguard_demo_login";

    const loginForm = loginButton?.closest("form") ||
        q("#demoLoginForm");


    /*
    The dashboard URL can be supplied through:

    1. data-dashboard-url on the form;
    2. data-dashboard-url on the login button;
    3. href on an older anchor-style login button.

    If none exists, use /dashboard/ as a fallback.

    In the Django login template, prefer:
    data-dashboard-url="{% url 'prototype:dashboard' %}"
    */

    function getDashboardBaseUrl() {
        return (
            loginForm?.dataset.dashboardUrl ||
            loginButton?.dataset.dashboardUrl ||
            loginButton?.getAttribute("href") ||
            "/dashboard/"
        );
    }


    function getSelectedDemoRole() {
        const selected = q(
            'input[name="demo_role"]:checked'
        );

        const value = selected?.value || "admin";

        return allowedRoles.includes(value)
            ? value
            : "admin";
    }


    function getLoginDestination(role) {
        const destination = new URL(
            getDashboardBaseUrl(),
            window.location.href
        );

        destination.searchParams.set("role", role);

        return destination;
    }


    function updateDemoRoleSelection() {
        qa(".role-choice").forEach(label => {
            const radio = q("input", label);

            label.classList.toggle(
                "selected",
                Boolean(radio?.checked)
            );
        });
    }


    demoRoleInputs.forEach(radio => {
        radio.addEventListener(
            "change",
            updateDemoRoleSelection
        );
    });


    // ================================================
    // SECTION 7: REMEMBER ME
    // ================================================

    /*
    Remember Me stores:
    - Demo username
    - Selected demo role

    The password is NEVER stored.
    */

    function restoreRememberedLogin() {
        if (!rememberCheckbox || !usernameInput) {
            return;
        }

        try {
            const saved = JSON.parse(
                localStorage.getItem(storageKey) || "null"
            );

            if (!saved) return;

            usernameInput.value =
                typeof saved.username === "string"
                    ? saved.username
                    : "";

            rememberCheckbox.checked = true;

            const savedRole = demoRoleInputs.find(
                input => input.value === saved.role
            );

            if (savedRole) {
                savedRole.checked = true;
            }

        } catch (error) {
            // Continue when browser storage is unavailable.
        }
    }


    function saveRememberedLogin(username, role) {
        if (!rememberCheckbox) return;

        try {
            if (rememberCheckbox.checked) {
                localStorage.setItem(
                    storageKey,
                    JSON.stringify({
                        username: username,
                        role: role
                    })
                );
            } else {
                localStorage.removeItem(storageKey);
            }

        } catch (error) {
            // Demo login still works without storage.
        }
    }


    restoreRememberedLogin();

    updateDemoRoleSelection();


    // ================================================
    // SECTION 8: REQUIRED DEMO LOGIN VALIDATION
    // ================================================

    /*
    Rules:

    - Username is required.
    - Password is required.
    - Spaces-only values are invalid.
    - Any non-empty demo credentials are accepted.
    - User enters the selected role workspace.
    - No real authentication takes place.
    */


    function clearLoginError(input) {
        if (!input) return;

        input.setCustomValidity("");
        input.removeAttribute("aria-invalid");
    }


    function showLoginError(input, message) {
        input.setCustomValidity(message);

        input.setAttribute(
            "aria-invalid",
            "true"
        );

        input.focus();

        input.reportValidity();
    }


    function validateDemoLogin() {
        if (!usernameInput || !passwordInput) {
            console.error(
                "EduGuard login fields were not found."
            );

            return false;
        }

        clearLoginError(usernameInput);
        clearLoginError(passwordInput);

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();


        // Validate username.

        if (!username) {
            showLoginError(
                usernameInput,
                "Please enter your username."
            );

            return false;
        }


        // Validate password.

        if (!password) {
            showLoginError(
                passwordInput,
                "Please enter your password."
            );

            return false;
        }


        return true;
    }


    function performDemoLogin(event) {
        if (event) {
            event.preventDefault();
        }

        if (!validateDemoLogin()) {
            return;
        }

        const role = getSelectedDemoRole();

        const username = usernameInput.value.trim();

        const destination = getLoginDestination(role);


        // Store username and role only
        // after validation succeeds.

        saveRememberedLogin(username, role);


        // Navigate to the selected dashboard.

        window.location.assign(
            destination.toString()
        );
    }


    // Form submission is the main login event.

    if (loginForm) {
        loginForm.addEventListener(
            "submit",
            performDemoLogin
        );
    }


    // Support the old anchor-style button if present.
    // Prevent direct navigation without validation.

    if (
        loginButton &&
        loginButton.tagName.toLowerCase() === "a"
    ) {
        loginButton.addEventListener(
            "click",
            performDemoLogin
        );
    }


    // Clear errors as the user types.

    [usernameInput, passwordInput].forEach(input => {
        if (!input) return;

        input.addEventListener("input", () => {
            clearLoginError(input);
        });
    });


    // ================================================
    // SECTION 9: TABLE FILTERING
    // ================================================

    function applyTableFilters(tableId) {
        const table = document.getElementById(tableId);

        if (!table) return;

        const search = (
            q(`[data-filter-search="${tableId}"]`)
                ?.value.toLowerCase().trim() || ""
        );

        const selects = qa(
            `[data-filter-select="${tableId}"]`
        );

        let visible = 0;

        qa("tbody tr", table).forEach(row => {
            const searchHaystack = (
                row.dataset.search ||
                row.innerText ||
                ""
            ).toLowerCase();

            const validSearch =
                searchHaystack.includes(search);

            const validFilters = selects.every(select => {
                if (!select.value) return true;

                const field = select.dataset.filterField;

                const rowValue = (
                    row.dataset[field] || ""
                ).toLowerCase();

                return (
                    rowValue === select.value.toLowerCase()
                );
            });

            row.hidden = !(validSearch && validFilters);

            if (!row.hidden) {
                visible++;
            }
        });


        // Visible record count.

        const count = q(
            `[data-visible-count="${tableId}"]`
        );

        if (count) {
            count.textContent = String(visible);
        }


        // Empty-state message.

        const empty = q(
            `[data-empty-for="${tableId}"]`
        );

        if (empty) {
            empty.hidden = visible !== 0;
        }
    }


    qa("[data-filter-search]").forEach(input => {
        input.addEventListener("input", () => {
            applyTableFilters(
                input.dataset.filterSearch
            );
        });
    });


    qa("[data-filter-select]").forEach(select => {
        select.addEventListener("change", () => {
            applyTableFilters(
                select.dataset.filterSelect
            );
        });
    });


    // ================================================
    // SECTION 10: STUDENT PROFILE MODAL
    // ================================================

    qa("[data-profile]").forEach(button => {
        button.addEventListener("click", () => {
            const attrs = button.dataset;

            q("#profileName").textContent =
                attrs.name;

            q("#profileAvatar").textContent =
                attrs.name
                    .split(" ")
                    .map(word => word[0])
                    .slice(0, 2)
                    .join("");

            q("#profileId").textContent =
                attrs.id;

            q("#profileClass").textContent =
                attrs.class;

            q("#profileAverage").textContent =
                attrs.average + " / 100";

            q("#profileAttendance").textContent =
                attrs.attendance + "%";

            q("#profileRisk").textContent =
                attrs.risk;

            openModal("profileModal");
        });
    });


    // ================================================
    // SECTION 11: EARLY WARNING FILTER CHIPS
    // ================================================

    qa("[data-chip-group]").forEach(group => {
        const target = document.getElementById(
            group.dataset.chipGroup
        );

        if (!target) return;

        qa("[data-chip-value]", group).forEach(chip => {
            chip.addEventListener("click", () => {
                qa("[data-chip-value]", group).forEach(item => {
                    item.classList.toggle(
                        "active",
                        item === chip
                    );
                });

                qa("[data-risk]", target).forEach(card => {
                    card.hidden =
                        Boolean(chip.dataset.chipValue) &&
                        card.dataset.risk !== chip.dataset.chipValue;
                });
            });
        });
    });


    // ================================================
    // SECTION 12: QR ATTENDANCE SIMULATION
    // ================================================

    q("#simulateScan")?.addEventListener("click", () => {
        const scanInput = q("#scanStudentId");

        const entered = (
            scanInput?.value || ""
        ).trim().toUpperCase();

        const rows = qa(
            "#attendanceTable tbody tr"
        );

        const found = rows.find(row => {
            return (
                (row.dataset.search || "")
                    .toUpperCase()
                    .includes(entered)
                &&
                entered.startsWith("EDG-")
            );
        });

        const feedback = q("#scanFeedback");

        if (!feedback) return;

        feedback.hidden = false;


        // Student not found.

        if (!found) {
            feedback.textContent =
                "No matching example in this attendance preview. " +
                "Try EDG-1001, EDG-1004, or EDG-1012.";

            return;
        }


        // Student name.

        const name = found.querySelector(
            ".table-person strong"
        )?.textContent || "Sample student";


        // Attendance table cells.

        const cells = found.querySelectorAll("td");


        // Current demo time.

        const now = new Date().toLocaleTimeString(
            "en-PH",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


        if (cells[3]) {
            cells[3].textContent =
                now + " (demo)";
        }


        if (cells[5]) {
            cells[5].innerHTML =
                '<span class="status status-present">' +
                'Present · demo' +
                '</span>';
        }


        found.dataset.status = "Present";


        feedback.textContent =
            `${name}: sample time-in displayed at ${now}. ` +
            "No record was saved and no SMS was sent.";


        toast(
            "Demo scan preview completed. " +
            "Not saved to a database."
        );


        applyTableFilters("attendanceTable");
    });


    // ================================================
    // SECTION 13: DEMO FORM SUBMISSIONS
    // ================================================

    qa("[data-demo-submit]").forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.demoSubmit;


            // Lesson Plan Preview.

            if (
                type === "lesson" &&
                !q("#lessonDemoTitle")?.value.trim()
            ) {
                toast(
                    "Please enter a sample lesson-plan title first."
                );

                return;
            }


            // Requirement Preview.

            if (
                type === "requirement" &&
                !q("#requirementDemoTitle")?.value.trim()
            ) {
                toast(
                    "Please enter an example requirement title first."
                );

                return;
            }


            // Intervention Preview.

            if (
                type === "intervention" &&
                !q("#interventionDemoStudent")?.value
            ) {
                toast(
                    "Please choose a sample student first."
                );

                return;
            }


            closeModal();

            toast(
                "Preview completed. Nothing was saved — " +
                "database features come later."
            );
        });
    });


    // ================================================
    // SECTION 14: SUBJECT SELECTION PREVIEW
    // ================================================

    q("#subjectPreview")?.addEventListener("change", () => {
        toast(
            "Subject selection is visual only; " +
            "grade values are sample Mathematics data."
        );
    });


    // ================================================
    // SECTION 15: FICTIONAL SAMPLE CSV DATA
    // ================================================

    const csvData = {

        attendance: [
            [
                "Student ID",
                "Student",
                "Time In",
                "Time Out",
                "Status"
            ],
            [
                "EDG-1001",
                "Alyssa Reyes",
                "7:12 AM",
                "4:02 PM",
                "Present"
            ],
            [
                "EDG-1002",
                "Miguel Santos",
                "7:39 AM",
                "",
                "Late"
            ],
            [
                "EDG-1004",
                "Liam Cruz",
                "",
                "",
                "Absent"
            ],
            [
                "EDG-1012",
                "Jacob Bautista",
                "",
                "",
                "Absent"
            ]
        ],

        grades: [
            [
                "Student ID",
                "Student",
                "Written Work",
                "Performance Task",
                "Assessment",
                "Illustrative Grade"
            ],
            [
                "EDG-1001",
                "Alyssa Reyes",
                93,
                91,
                92,
                92
            ],
            [
                "EDG-1004",
                "Liam Cruz",
                73,
                69,
                71,
                71
            ],
            [
                "EDG-1006",
                "Noah Dela Cruz",
                75,
                72,
                71,
                73
            ],
            [
                "EDG-1012",
                "Jacob Bautista",
                71,
                68,
                66,
                69
            ]
        ],

        lesson_plans: [
            [
                "Title",
                "Subject",
                "Teacher",
                "Status"
            ],
            [
                "Introduction to Linear Equations",
                "Mathematics 8",
                "Maria Villanueva",
                "Approved"
            ],
            [
                "Chemical Reactions",
                "Science 9",
                "Daniel Torres",
                "For Review"
            ],
            [
                "Philippine Geography",
                "Araling Panlipunan 7",
                "Maria Villanueva",
                "Missing"
            ]
        ],

        requirements: [
            [
                "Title",
                "Subject",
                "Submitted",
                "Total",
                "Due Date"
            ],
            [
                "Linear Equations Activity",
                "Mathematics 8",
                31,
                35,
                "2026-10-16"
            ],
            [
                "Science Lab Report",
                "Science 9",
                26,
                34,
                "2026-10-15"
            ],
            [
                "Reading Reflection",
                "English 7",
                28,
                36,
                "2026-10-09"
            ]
        ],

        warnings: [
            [
                "Student ID",
                "Student",
                "Grade Average",
                "Attendance Rate",
                "Illustrative Concern"
            ],
            [
                "EDG-1012",
                "Jacob Bautista",
                69,
                "70%",
                "Low grades and absences"
            ],
            [
                "EDG-1004",
                "Liam Cruz",
                71,
                "74%",
                "Low grades and attendance decline"
            ],
            [
                "EDG-1006",
                "Noah Dela Cruz",
                73,
                "81%",
                "Below passing-grade threshold"
            ]
        ],

        interventions: [
            [
                "Case ID",
                "Student",
                "Type",
                "Status"
            ],
            [
                "INT-025",
                "Jacob Bautista",
                "Guidance counseling",
                "To Do"
            ],
            [
                "INT-023",
                "Noah Dela Cruz",
                "Academic support",
                "In Progress"
            ],
            [
                "INT-018",
                "Isabella Garcia",
                "Academic check-in",
                "Resolved"
            ]
        ]
    };


    // ================================================
    // SECTION 16: REPORT SUMMARY CSV
    // ================================================

    csvData.reports = [
        [
            "Metric",
            "Sample Value"
        ],
        [
            "Students",
            1248
        ],
        [
            "Attendance Rate",
            "94.6%"
        ],
        [
            "Class Average",
            85.3
        ],
        [
            "At-Risk Students",
            28
        ]
    ];


    // ================================================
    // SECTION 17: CSV DOWNLOAD FUNCTION
    // ================================================

    function downloadCSV(type) {
        const rows = csvData[type];

        if (!rows) {
            toast(
                "Sample export for this report " +
                "is not yet configured."
            );

            return;
        }


        // Convert data into CSV format.

        const csv = rows.map(row => {
            return row.map(value => {
                return '"' +
                    String(value).replace(/"/g, '""') +
                    '"';
            }).join(",");
        }).join("\r\n");


        // Create CSV file.

        const blob = new Blob(
            ["\uFEFF" + csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


        // Create temporary URL.

        const objectUrl = URL.createObjectURL(blob);


        // Create download link.

        const link = document.createElement("a");

        link.href = objectUrl;

        link.download = `eduguard-demo-${type}.csv`;

        document.body.appendChild(link);

        link.click();

        link.remove();


        // Clean up temporary URL.

        window.setTimeout(() => {
            URL.revokeObjectURL(objectUrl);
        }, 1000);


        toast(
            "Fictional sample CSV downloaded — " +
            "no student data used."
        );
    }


    // ================================================
    // SECTION 18: CSV EXPORT BUTTON EVENTS
    // ================================================

    qa("[data-export]").forEach(button => {
        button.addEventListener("click", () => {
            downloadCSV(button.dataset.export);
        });
    });

})();
