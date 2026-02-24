/**
 * Membership Module
 */

const Membership = (function () {
    'use strict';

    const state = {
        foundation: { open: false, selected: false },
        economy: { open: false, selected: false }
    };

    function toggle(type) {
        const body = document.getElementById(type + 'Body');
        const toggle = document.getElementById(type + 'Toggle');
        if (!body || !toggle) return;

        const isOpen = body.classList.contains('show');
        document.querySelectorAll('.membership-body').forEach(b => b.classList.remove('show'));
        document.querySelectorAll('.membership-toggle').forEach(t => t.classList.remove('rotated'));

        if (!isOpen) {
            body.classList.add('show');
            toggle.classList.add('rotated');
        }
    }

    return {
        toggle
    };
})();
