document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.gallery-card');
    filters.forEach(button => button.addEventListener('click', () => {
        filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
        cards.forEach(card => {
            card.hidden = button.dataset.filter !== 'all' && !card.dataset.category.split(' ').includes(button.dataset.filter);
        });
    }));

    const viewer = document.getElementById('image-viewer');
    if (!viewer || typeof viewer.showModal !== 'function') return;
    const image = viewer.querySelector('img');
    const caption = document.getElementById('viewer-caption');
    document.querySelectorAll('.image-zoom').forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        const sourceImage = link.querySelector('img');
        const title = link.closest('article')?.querySelector('h3')?.textContent || sourceImage?.alt || '';
        image.src = link.href;
        image.alt = title;
        caption.textContent = title;
        viewer.showModal();
    }));
    viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', event => {
        const bounds = viewer.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
    });
});
