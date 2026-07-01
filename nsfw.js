(function () {
    const STORAGE_KEY = 'floophy_age_verified';

    function isAgeVerified() {
        try {
            return localStorage.getItem(STORAGE_KEY) === 'true';
        } catch (e) {
            return false;
        }
    }

    function setAgeVerified() {
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
        } catch (e) {
            /* localStorage not available, ignore */
        }
    }

    function showAgeGate(onConfirm) {
        if (document.getElementById('age-gate-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'age-gate-overlay';
        overlay.className = 'age-gate-overlay';
        overlay.innerHTML = `
            <div class="age-gate-box">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <h3>NSFW tartalom</h3>
                <p>Ez a kép felnőtteknek szóló (NSFW) tartalmat tartalmaz. Elmúltál már 18 éves?</p>
                <div class="age-gate-actions">
                    <button type="button" class="btn btn-outline" id="age-gate-no">Nem, vissza</button>
                    <button type="button" class="btn btn-primary" id="age-gate-yes">Igen, elmúltam 18</button>
                </div>
                <span class="age-gate-note"><i class="bi bi-shield-lock"></i> A válaszod csak ezen az eszközön, helyben (localStorage) kerül eltárolásra.</span>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        function close() {
            overlay.remove();
            document.body.style.overflow = '';
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
        overlay.querySelector('#age-gate-no').addEventListener('click', close);
        overlay.querySelector('#age-gate-yes').addEventListener('click', () => {
            setAgeVerified();
            close();
            onConfirm();
        });
    }

    // Marks a gallery item as NSFW: blurs it, adds a badge, and wires up
    // the click-to-reveal / age-gate flow.
    window.applyNSFW = function (container, isNSFW) {
        if (!isNSFW) return;

        container.classList.add('nsfw-item');
        if (isAgeVerified()) {
            container.classList.add('nsfw-revealed');
        }

        const badge = document.createElement('div');
        badge.className = 'nsfw-badge';
        badge.innerHTML = '<i class="bi bi-eye-slash-fill"></i> 18+ · Koppints a megtekintéshez';
        container.appendChild(badge);

        container.addEventListener('click', function (e) {
            if (container.classList.contains('nsfw-revealed')) return;

            e.preventDefault();
            e.stopPropagation();

            if (isAgeVerified()) {
                container.classList.add('nsfw-revealed');
                return;
            }

            showAgeGate(() => {
                container.classList.add('nsfw-revealed');
            });
        });
    };
})();
