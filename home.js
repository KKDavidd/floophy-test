fetch('data/gallery.json')
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById('preview-grid');
        const slots = ['1', '2', '3', '4'];
        slots.forEach(slot => {
            const foundItem = data.items.find(item => item.featured_order === slot);
            if (foundItem) {
                const a = document.createElement('a');
                a.href = 'gallery.html';
                a.className = 'gallery-item';
                a.innerHTML = `<img src="${foundItem.image}" alt="${foundItem.title}"><div class="overlay"><span>${foundItem.title}</span></div>`;
                grid.appendChild(a);
            }
        });
    });
