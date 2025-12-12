 const productSearchManual = document.getElementById('productSearchManual');
        const typeFilterManual = document.getElementById('typeFilterManual');
        const productSearchMotorized = document.getElementById('productSearchMotorized');
        const typeFilterMotorized = document.getElementById('typeFilterMotorized');

        const manualSection = document.getElementById('manual-cat');
        const motorSection = document.getElementById('motorized-cat');

        const manualCards = manualSection ? manualSection.querySelectorAll('.product-card') : [];
        const motorCards = motorSection ? motorSection.querySelectorAll('.product-card') : [];

        const manualPagination = document.getElementById('manualPagination');
        const motorPagination = document.getElementById('motorizedPagination');

        function getPageSize() {
            const w = window.innerWidth;
            if (w > 1025) return 20; // Desktop 
            if (w > 600) return 15;  // Tablets (600px-1024px)
            return 10;              // Mobile (<=600px)
        }

        const currentPage = { manual: 1, motorized: 1 };

        function renderPagination(sectionKey, cardsNodeList, paginationEl) {
            if (!cardsNodeList || !paginationEl) return;

            const PAGE_SIZE = getPageSize();
            const cards = Array.from(cardsNodeList);
            const visibleCards = cards.filter(card => card.dataset.visibleByFilter !== '0');
            if (visibleCards.length === 0) {
                cards.forEach(card => card.style.display = 'none');
                paginationEl.innerHTML = '';
                return;
            }

            const totalPages = Math.max(1, Math.ceil(visibleCards.length / PAGE_SIZE));
            if (currentPage[sectionKey] > totalPages) currentPage[sectionKey] = totalPages;

            cards.forEach(card => card.style.display = 'none');

            const start = (currentPage[sectionKey] - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            visibleCards.slice(start, end).forEach(card => card.style.display = '');

            paginationEl.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                if (i === currentPage[sectionKey]) btn.classList.add('active');
                btn.addEventListener('click', () => {
                    currentPage[sectionKey] = i;
                    renderPagination(sectionKey, cardsNodeList, paginationEl);
                    const sectionEl = sectionKey === 'manual' ? manualSection : motorSection;
                    if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                paginationEl.appendChild(btn);
            }
        }

        function updateManualFilter() {
            const searchText = (productSearchManual ? productSearchManual.value : '').toLowerCase().trim();
            const selectedType = (typeFilterManual ? typeFilterManual.value : 'all');

            manualCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const cardDetail = (card.dataset.detail || '').toLowerCase();
                const matchesSearch = searchText === '' || cardText.includes(searchText);
                const matchesType = selectedType === '' || cardDetail === selectedType;
                card.dataset.visibleByFilter = (matchesSearch && matchesType) ? '1' : '0';
            });

            currentPage.manual = 1;
            renderPagination('manual', manualCards, manualPagination);
        }

        function updateMotorizedFilter() {
            const searchText = (productSearchMotorized ? productSearchMotorized.value : '').toLowerCase().trim();
            const selectedType = (typeFilterMotorized ? typeFilterMotorized.value : 'all');

            motorCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const cardDetail = (card.dataset.detail || '').toLowerCase();
                const matchesSearch = searchText === '' || cardText.includes(searchText);
                const matchesType = selectedType === '' || cardDetail === selectedType;
                card.dataset.visibleByFilter = (matchesSearch && matchesType) ? '1' : '0';
            });

            currentPage.motorized = 1;
            renderPagination('motorized', motorCards, motorPagination);
        }

        if (productSearchManual && typeFilterManual) {
            productSearchManual.addEventListener('input', updateManualFilter);
            typeFilterManual.addEventListener('change', updateManualFilter);
        }

        if (productSearchMotorized && typeFilterMotorized) {
            productSearchMotorized.addEventListener('input', updateMotorizedFilter);
            typeFilterMotorized.addEventListener('change', updateMotorizedFilter);
        }

        window.addEventListener('resize', () => { renderPagination('manual', manualCards, manualPagination); renderPagination('motorized', motorCards, motorPagination); });

        // initialize visible flags
        [...manualCards, ...motorCards].forEach(card => { card.dataset.visibleByFilter = '1'; });

        // initial render
        renderPagination('manual', manualCards, manualPagination);
        renderPagination('motorized', motorCards, motorPagination);