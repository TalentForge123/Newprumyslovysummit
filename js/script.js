// Countdown Timer
function updateCountdown() {
    // Datum konání summitu: 14. 11. 2025
    const eventDate = new Date('2025-11-14T09:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Aktualizace HTML elementů
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Pokud je datum v minulosti, zobrazit nuly
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Spustit countdown při načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    // Aktualizovat každou sekundu
    setInterval(updateCountdown, 1000);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

document.querySelectorAll(\'a[href^="#"]\').forEach(anchor => {
    anchor.addEventListener(\'click\', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute(\'href\')).scrollIntoView({
            behavior: \'smooth\'
        });
    });
});

                });
            }
        });
    });
});

// Registration form functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (!form) return; // Exit if form doesn't exist

    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');

    // Real-time validation
    const fields = ['firstName', 'lastName', 'email', 'company', 'position', 'participationType'];
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field && errorElement) {
            field.addEventListener('blur', function() {
                validateField(field, errorElement);
            });

            field.addEventListener('input', function() {
            fetch('https://app.smartemailing.cz/api/v2/import', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ljynrlytol59itjsuq9faepexhkaiuqkenwvi4zg'
    },
    body: JSON.stringify({
        data: [{
            emailaddress: registrationData.email,
            name: registrationData.firstName,
            surname: registrationData.lastName,
            cellphone: registrationData.phone,
            company: registrationData.company,
            customfields: {
                position: registrationData.position,
                participation_type: registrationData.participationType,
                interests: registrationData.interests.join(', ')
            }
        }]
    })
})
.then(response => response.json())
.then(data => {
    if (loading) loading.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
    if (successMessage) {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
})
.catch(error => {
    console.error('Error:', error);
    // Handle error state
});
            });
        }
    });

    // Email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('input', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errorElement = document.getElementById('emailError');
            
            if (email && !emailRegex.test(email)) {
                this.classList.add('field-invalid');
                this.classList.remove('field-valid');
                if (errorElement) {
                    errorElement.style.display = 'block';
                    errorElement.textContent = 'Prosím zadejte platnou e-mailovou adresu';
                }
            } else if (email) {
                this.classList.add('field-valid');
                this.classList.remove('field-invalid');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    }

    function validateField(field, errorElement) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('field-invalid');
            field.classList.remove('field-valid');
            if (errorElement) errorElement.style.display = 'block';
            return false;
        } else if (field.value.trim()) {
            field.classList.add('field-valid');
            field.classList.remove('field-invalid');
            if (errorElement) errorElement.style.display = 'none';
            return true;
        }
        return true;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all required fields
        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(fieldName + 'Error');
            if (field && errorElement && !validateField(field, errorElement)) {
                isValid = false;
            }
        });

        // Validate GDPR consent
        const gdprConsent = document.getElementById('gdprConsent');
        const gdprError = document.getElementById('gdprError');
        if (gdprConsent && !gdprConsent.checked) {
            if (gdprError) gdprError.style.display = 'block';
            isValid = false;
        } else if (gdprError) {
            gdprError.style.display = 'none';
        }

        if (isValid) {
            // Show loading state
            if (submitBtn) submitBtn.disabled = true;
            if (loading) loading.style.display = 'block';
            form.style.display = 'none';

            // Collect form data
            const formData = new FormData(form);
            const interests = [];
            document.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
                interests.push(cb.value);
            });
            
            const registrationData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                position: formData.get('position'),
                participationType: formData.get('participationType'),
                interests: interests,
                gdprConsent: formData.get('gdprConsent')
            };

            // Here you would typically send data to SmartEmailing API
            // For now, we'll simulate the submission
            setTimeout(() => {
                if (loading) loading.style.display = 'none';
                if (successMessage) successMessage.style.display = 'block';
                
                console.log('Registration data:', registrationData);
                
                // Scroll to success message
                if (successMessage) {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 2000);
        }
    });

    // Smooth scrolling for better UX
    const inputs = document.querySelectorAll('#registrationForm input, #registrationForm select, #registrationForm textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
});
        });
    }
});

