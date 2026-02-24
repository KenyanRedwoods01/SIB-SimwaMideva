/**
 * Main Application JavaScript
 * Author: Simwa Mideva
 */

document.addEventListener('DOMContentLoaded', function () {

    // 1. MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navbarNav = document.getElementById('navbarNav');

    if (menuToggle && navbarNav) {
        menuToggle.addEventListener('click', function () {
            navbarNav.classList.toggle('show');
        });
    }

    // 2. MEMBERSHIP TOGGLE
    window.toggleMembership = function (type) {
        const body = document.getElementById(type + 'Body');
        const toggle = document.getElementById(type + 'Toggle');

        if (!body || !toggle) return;

        const isOpen = body.classList.contains('show');

        // Close all
        document.querySelectorAll('.membership-body').forEach(b => b.classList.remove('show'));
        document.querySelectorAll('.membership-toggle').forEach(t => t.classList.remove('rotated'));

        // Open if was closed
        if (!isOpen) {
            body.classList.add('show');
            toggle.classList.add('rotated');
        }
    };

    // 3. MODALS
    window.showMemberDetail = function (name, amount) {
        document.getElementById('modalName').textContent = name;
        document.getElementById('modalAmount').textContent = amount;
        new bootstrap.Modal(document.getElementById('memberModal')).show();
    };

    window.showDetails = function () {
        new bootstrap.Modal(document.getElementById('detailsModal')).show();
    };

    // 4. CUSTOM SELECT DROPDOWN
    window.toggleCustomSelect = function () {
        const trigger = document.querySelector('.custom-select-trigger');
        const options = document.getElementById('customOptions');

        trigger.classList.toggle('active');
        options.classList.toggle('open');
    };

    window.selectOption = function (value, text) {
        document.getElementById('selectedOption').textContent = text;
        document.getElementById('selectedOption').style.color = '#333';
        document.getElementById('interestSelect').value = value;

        // Close dropdown
        document.querySelector('.custom-select-trigger').classList.remove('active');
        document.getElementById('customOptions').classList.remove('open');

        // Mark as valid
        document.getElementById('interestSelect').classList.remove('is-invalid');
        document.getElementById('interestSelect').classList.add('is-valid');
        document.querySelector('.custom-select-trigger').style.borderColor = '#198754';

        // Update visual selection
        document.querySelectorAll('.custom-option').forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.value === value) {
                opt.classList.add('selected');
            }
        });
    };

    // Close custom select when clicking outside
    document.addEventListener('click', function (e) {
        const select = document.getElementById('customSelect');
        if (select && !select.contains(e.target)) {
            const trigger = document.querySelector('.custom-select-trigger');
            const options = document.getElementById('customOptions');
            if (trigger) trigger.classList.remove('active');
            if (options) options.classList.remove('open');
        }
    });

    // 5. FORM VALIDATION
    const detailsForm = document.getElementById('detailsForm');
    if (detailsForm) {
        detailsForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('userEmail');
            const select = document.getElementById('interestSelect');
            let isValid = true;

            // Email validation
            if (!email.value || !email.value.includes('@')) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
            }

            // Select validation
            if (!select.value) {
                select.classList.add('is-invalid');
                document.querySelector('.custom-select-trigger').style.borderColor = '#dc3545';
                isValid = false;
            } else {
                select.classList.remove('is-invalid');
                select.classList.add('is-valid');
                document.querySelector('.custom-select-trigger').style.borderColor = '#198754';
            }

            if (isValid) {
                alert('Thank you! We will contact you shortly.');
                bootstrap.Modal.getInstance(document.getElementById('detailsModal')).hide();
                detailsForm.reset();
                document.getElementById('selectedOption').textContent = 'Choose membership...';
                document.getElementById('selectedOption').style.color = '#666';
                email.classList.remove('is-valid');
                select.classList.remove('is-valid');
                document.querySelector('.custom-select-trigger').style.borderColor = '#e0e0e0';
                document.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            }
        });

        // Real-time email validation
        const emailInput = document.getElementById('userEmail');
        emailInput.addEventListener('blur', function () {
            if (this.value && !this.value.includes('@')) {
                this.classList.add('is-invalid');
            }
        });

        emailInput.addEventListener('input', function () {
            if (this.classList.contains('is-invalid') && this.value.includes('@')) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    }
});
