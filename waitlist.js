fetch('data/waitlist.json')
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById('waitlist-grid');

        if (!data.clients || data.clients.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-inbox"></i>
                    <h3>The queue is currently empty</h3>
                    <p>There are no commissions in progress or waiting right now.</p>
                </div>
            `;
            return;
        }

        const statusConfig = {
            'waiting': { text: 'Waiting', class: 'status-waiting', icon: 'bi-hourglass-split' },
            'sketching': { text: 'Sketching', class: 'status-sketching', icon: 'bi-bezier2' },
            'coloring': { text: 'Rendering', class: 'status-coloring', icon: 'bi-box' },
            'done': { text: 'Done', class: 'status-done', icon: 'bi-check2-circle' }
        };

        data.clients.forEach(client => {
            const status = statusConfig[client.status] || statusConfig['waiting'];
            const div = document.createElement('div');
            div.className = 'waitlist-item';

            div.innerHTML = `
                <div class="waitlist-info">
                    <h3>${client.name}</h3>
                    <p>${client.type}</p>
                </div>
                <div class="waitlist-status ${status.class}">
                    <i class="bi ${status.icon}"></i> ${status.text}
                </div>
            `;
            grid.appendChild(div);
        });
    })
    .catch(() => {
        document.getElementById('waitlist-grid').innerHTML = `
            <div class="empty-state">
                <i class="bi bi-exclamation-triangle"></i>
                <h3>Something went wrong</h3>
                <p>The queue data could not be loaded right now.</p>
            </div>
        `;
    });
