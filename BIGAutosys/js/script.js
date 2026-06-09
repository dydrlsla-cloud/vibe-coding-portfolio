document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Handle initial hash for filtering (e.g., #portfolio from Business Areas)
    if (window.location.hash === '#portfolio') {
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter'); // We might implementing query params later, or use hash state
        // Currently just scroll to portfolio is default behavior of ID link
        // If we want specific filter activation:
        // (This part depends on if we add ?filter=auto to the links in existing HTML)
    }

    // Business Card Click -> Portfolio Filter Integration
    // Assuming Business Cards have links like <a href="#portfolio" onclick="filterPortfolio('auto')">...
    // Or we attach listeners here if they don't have inline handlers.
    // Current HTML just has href="#portfolio". We can infer from context if needed, 
    // but the user requirement was just "refining user experience".

    // Let's make the Business Cards smart based on their text content or add data attributes in a future update.
    // For now, adhering to the specific requests.


    // --- ASSET PROTECTION & BLOB URL ---

    // 1. Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // 2. Disable Dragging (Images/Videos)
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
            return false;
        }
    });

    // 3. Blob URL Logic for Assets (Videos & Images)
    // This fetches the asset files creating a Blob, and sets the src to the Blob URL.
    // This hides the real path from the DOM inspection and simple copying.

    const protectAsset = (element, attribute) => {
        const originalUrl = element.getAttribute(attribute);
        // Only process relative paths or http links, avoid data/blob URIs
        if (originalUrl && !originalUrl.startsWith('blob:') && !originalUrl.startsWith('data:')) {
            fetch(originalUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Network error');
                    return response.blob();
                })
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    element[attribute] = blobUrl;
                })
                .catch(err => {
                    // Fail silently and keep original src (e.g., if running on local file system)
                    console.warn('Asset protection skipped (likely local file system):', err);
                });
        }
    };

    // Protect Videos
    document.querySelectorAll('video source').forEach(source => {
        const originalSrc = source.getAttribute('src');
        if (originalSrc) {
            fetch(originalSrc)
                .then(r => r.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    // Set src on the parent video element for playback
                    const video = source.parentElement;
                    video.src = url;
                })
                .catch(e => console.warn('Video protection skipped:', e));
        }
    });

    // Protect Images (Portfolio, Products, Partners)
    const targetImages = document.querySelectorAll('.portfolio-item img, .product-item img, .partner-card img');
    targetImages.forEach(img => {
        protectAsset(img, 'src');
    });

    // Mailto Logic for Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect Data
            const company = document.getElementById('company').value;
            const name = document.getElementById('name').value;
            const position = document.getElementById('position').value;
            const contact = document.getElementById('contact').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Constuct Mailto Body
            const subject = `[(주)빅오토시스 홈페이지 견적요청] ${company} - ${name}님`;
            const body = `
[견적 요청 내역]

■ 회사명: ${company}
■ 담당자: ${name} (${position})
■ 연락처: ${contact}
■ 이메일: ${email}

■ 문의내용:
${message}

--------------------------------------------------
※ 첨부파일이 있는 경우, 이 메일에 직접 첨부하여 발송해 주시기 바랍니다.
            `;

            const mailtoLink = `mailto:ykkim@bigautosys.co.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
        });
    }
});
