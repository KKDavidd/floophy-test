fetch('data/gallery.json')
    .then(res => res.json())
    .then(data => {
        const fGrid = document.getElementById('finished-grid');
        const sGrid = document.getElementById('sketches-grid');
        data.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="${item.image}" alt="${item.title}"><div class="overlay"><span>${item.title}</span><br><i>${item.type}</i></div>`;
            if (item.nsfw) applyNSFW(div, true);
            if (item.category === 'finished') fGrid.appendChild(div);
            if (item.category === 'sketch') sGrid.appendChild(div);
        });
    });
