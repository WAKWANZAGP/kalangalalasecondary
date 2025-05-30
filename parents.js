document.addEventListener("DOMContentLoaded", function () {
    // On load, animate logo for zoom in
    const logo = document.querySelector(".school-logo");
    if (logo) {
        logo.style.transform = "scale(1.10)";
        setTimeout(() => {
            logo.style.transform = "scale(1.0)";
        }, 700);
    }

    const form = document.getElementById("parentRegistrationForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Collect form data
        const data = {
            first_name: form.firstName.value.trim(),
            middle_name: form.middleName.value.trim(),
            last_name: form.lastName.value.trim(),
            student_id: form.studentId.value.trim(),
            password: form.password.value,
            confirm_password: form.confirmPassword.value
        };

        // Password match validation
        if (data.password !== data.confirm_password) {
            alert("Passwords do not match.");
            form.password.value = '';
            form.confirmPassword.value = '';
            form.password.focus();
            return;
        }

        // Connect to backend (update URL as needed)
        try {
            const response = await fetch("http://localhost:8000/api/v1/parents/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("Registration successful! You can now log in.");
                window.location.href = "login.html";
            } else {
                const res = await response.json();
                alert("Registration failed: " + (res.detail || "Unknown error"));
            }
        } catch (error) {
            alert("Network or server error. Please try again later.");
        }
    });

    // Optionally handle login link (just navigates for now)
    document.getElementById("loginLink").addEventListener("click", function (e) {
        // SPA navigation can be added here if needed
    });
});