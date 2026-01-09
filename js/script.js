const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
window.lenis = lenis;

let swapWords = ["hago", "fotografío", "diseño", "modelo"];
let currentSwapIndex = 0;
let swapTextSpan, swapOverlay;

window.updateSwapWords = (lang) => {
    if (lang === 'es') {
        swapWords = ["hago", "fotografío", "diseño", "modelo"];
    } else {
        swapWords = ["I do", "I photograph", "I design", "I model"];
    }
    if (swapTextSpan) {
        const newWord = swapWords[currentSwapIndex];
        swapTextSpan.innerText = newWord;
        if (newWord.length > 10) {
            swapTextSpan.classList.add('word-small');
        } else {
            swapTextSpan.classList.remove('word-small');
        }
    }
};

const yearSpan = document.getElementById('current-year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    const swapContainer = document.getElementById('word-swap');
    if (swapContainer) {
        swapContainer.innerHTML = '';
        swapTextSpan = document.createElement('span');
        swapTextSpan.className = 'current-word';
        swapContainer.appendChild(swapTextSpan);

        swapOverlay = document.createElement('div');
        swapOverlay.className = 'word-overlay';
        swapContainer.appendChild(swapOverlay);

        const cycleWord = () => {
            swapOverlay.classList.remove('animating-overlay');
            void swapOverlay.offsetWidth;
            swapOverlay.classList.add('animating-overlay');

            setTimeout(() => {
                currentSwapIndex = (currentSwapIndex + 1) % swapWords.length;
                const newWord = swapWords[currentSwapIndex];
                swapTextSpan.innerText = newWord;
                if (newWord.length > 10) {
                    swapTextSpan.classList.add('word-small');
                } else {
                    swapTextSpan.classList.remove('word-small');
                }
            }, 400);
        };

        const currentLang = localStorage.getItem('preferredLanguage') || 'es';
        window.updateSwapWords(currentLang);
        setInterval(cycleWord, 3000);
    }

    const elements = document.querySelectorAll('.btn-custom, .text-roll');
    elements.forEach(el => {
        if (el.querySelector('.btn-text-mask')) return;

        const text = el.innerText.trim();
        el.innerHTML = '';

        const mask = document.createElement('span');
        mask.className = 'btn-text-mask';

        const initialLayer = document.createElement('span');
        initialLayer.className = 'text-layer initial';

        const hoverLayer = document.createElement('span');
        hoverLayer.className = 'text-layer hover';

        const createLetters = (targetSpan, isHover) => {
            [...text].forEach((char, index) => {
                const s = document.createElement('span');
                s.textContent = char === ' ' ? '\u00A0' : char;
                s.className = 'char';
                s.style.transitionDelay = `${index * 0.025}s`;
                targetSpan.appendChild(s);
            });
        };

        createLetters(initialLayer, false);
        createLetters(hoverLayer, true);

        mask.appendChild(initialLayer);
        mask.appendChild(hoverLayer);
        el.appendChild(mask);
    });

    const openBtn = document.getElementById('openVideoBtn');
    const popup = document.getElementById('videoPopup');
    const closeBtn = document.getElementById('closeVideoBtn');
    const iframe = document.getElementById('videoFrame');
    const videoSrc = "https://www.youtube.com/embed/mV-nogiSnT8";

    if (openBtn && popup && iframe) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            popup.classList.add('active');
            iframe.src = videoSrc;
        });

        const closePopup = () => {
            popup.classList.remove('active');
            setTimeout(() => {
                iframe.src = "";
            }, 400);
        };

        if (closeBtn) closeBtn.addEventListener('click', closePopup);

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePopup();
            }
        });
    }

    const openPdfBtn = document.getElementById('openPdfBtn');
    const pdfPopup = document.getElementById('pdfPopup');
    const closePdfBtn = document.getElementById('closePdfBtn');
    const pdfFrame = document.getElementById('pdfFrame');

    if (openPdfBtn && pdfPopup && pdfFrame) {
        openPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferredLanguage') || 'es';
            const pdfSrc = currentLang === 'es' ? "assets/img/CV_Leo_public.pdf" : "assets/img/CV_Leo_public_EN.pdf";
            pdfPopup.classList.add('active');
            pdfFrame.src = pdfSrc;
        });

        const closePdfPopup = () => {
            pdfPopup.classList.remove('active');
            setTimeout(() => {
                pdfFrame.src = "";
            }, 400);
        };

        if (closePdfBtn) closePdfBtn.addEventListener('click', closePdfPopup);

        pdfPopup.addEventListener('click', (e) => {
            if (e.target === pdfPopup) closePdfPopup();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && pdfPopup.classList.contains('active')) closePdfPopup();
        });
    }

    const contactLinks = [document.getElementById('contactLinkDesktop'), document.getElementById('contactLinkMobile')];
    const contactPopup = document.getElementById('contactPopup');
    const closeContactBtn = document.getElementById('closeContactBtn');

    if (contactPopup) {
        contactLinks.forEach(link => {
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    contactPopup.classList.add('active');
                });
            }
        });

        const closeContactPopup = () => {
            contactPopup.classList.remove('active');
        };

        if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactPopup);

        contactPopup.addEventListener('click', (e) => {
            if (e.target === contactPopup) closeContactPopup();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactPopup.classList.contains('active')) closeContactPopup();
        });
    }

    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo('#presentation', { duration: 1.5 });
        });
    }

    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    const showInfoBtn = document.getElementById('showInfoBtn');
    const hideInfoBtn = document.getElementById('hideInfoBtn');
    const resumeSection = document.querySelector('.resume-section');

    if (showInfoBtn && resumeSection) {
        showInfoBtn.addEventListener('click', () => {
            resumeSection.classList.add('is-expanded');
            showInfoBtn.parentElement.style.display = 'none';

            setTimeout(() => {
                if (window.lenis) {
                    window.lenis.scrollTo(resumeSection, { offset: -50, duration: 1.2 });
                }
            }, 100);
        });
    }

    if (hideInfoBtn && resumeSection) {
        hideInfoBtn.addEventListener('click', () => {
            resumeSection.classList.remove('is-expanded');
            showInfoBtn.parentElement.style.display = 'block';

            if (window.lenis) {
                window.lenis.scrollTo('#presentation', { duration: 1.2 });
            }
        });
    }

    const revealContainer = document.getElementById('revealContainer');
    const revealCanvas = document.getElementById('revealCanvas');

    if (revealContainer && revealCanvas) {
        const ctx = revealCanvas.getContext('2d', { willReadFrequently: true });
        const hiddenImg = new Image();
        hiddenImg.src = 'assets/img/me2.jpg';

        let width, height;
        let isLoaded = false;
        let trail = [];

        const maskCanvas = document.createElement('canvas');
        const maskCtx = maskCanvas.getContext('2d');

        function resizeReveal() {
            width = revealContainer.offsetWidth;
            height = revealContainer.offsetHeight;
            revealCanvas.width = width;
            revealCanvas.height = height;
            maskCanvas.width = width;
            maskCanvas.height = height;
        }

        hiddenImg.onload = () => {
            isLoaded = true;
            resizeReveal();
            animateTrail();
        };

        window.addEventListener('resize', resizeReveal);

        const initialRadius = 80;
        const fadeSpeed = 0.8;

        const addPoint = (x, y) => {
            trail.push({
                x: x,
                y: y,
                radius: initialRadius
            });
        };

        revealContainer.addEventListener('mousemove', (e) => {
            const rect = revealCanvas.getBoundingClientRect();
            addPoint(e.clientX - rect.left, e.clientY - rect.top);
        });

        revealContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = revealCanvas.getBoundingClientRect();
            const touch = e.touches[0];
            addPoint(touch.clientX - rect.left, touch.clientY - rect.top);
        }, { passive: false });

        function animateTrail() {
            if (!isLoaded) return requestAnimationFrame(animateTrail);

            ctx.clearRect(0, 0, width, height);
            maskCtx.clearRect(0, 0, width, height);

            if (trail.length > 0) {
                maskCtx.fillStyle = 'rgba(255, 255, 255, 1)';

                for (let i = 0; i < trail.length; i++) {
                    const point = trail[i];

                    maskCtx.beginPath();
                    maskCtx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
                    maskCtx.fill();

                    point.radius -= fadeSpeed;

                    if (point.radius <= 0) {
                        trail.splice(i, 1);
                        i--;
                    }
                }
            }

            if (trail.length > 0) {
                ctx.drawImage(maskCanvas, 0, 0);
                ctx.globalCompositeOperation = 'source-in';
                ctx.drawImage(hiddenImg, 0, 0, width, height);
                ctx.globalCompositeOperation = 'source-over';
            }

            requestAnimationFrame(animateTrail);
        }
    }

    const drawerOverlay = document.getElementById('drawerOverlay');
    const projectDrawer = document.getElementById('projectDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerGrid = document.getElementById('drawerGrid');
    const drawerTitle = document.getElementById('drawerTitle');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImages = [];
    let currentImgIndex = 0;
    let lastOpenParams = null;

    const openDrawer = (project, title, prefix, count = 9, folder = 'fotografia', layout = 'grid-2', aspectRatio = 'auto', customOrder = null, exceptions = [], isContain = false, bgColor = 'transparent') => {
        const currentLang = localStorage.getItem('preferredLanguage') || 'es';
        lastOpenParams = { project, title, prefix, count, folder, layout, aspectRatio, customOrder, exceptions, isContain, bgColor };

        drawerTitle.innerText = title;
        drawerGrid.innerHTML = '';
        currentImages = [];

        drawerGrid.classList.remove('drawer-grid-1col');

        if (layout === 'grid-1') {
            drawerGrid.classList.add('drawer-grid-1col');
        }

        const getAspectRatioClass = (ratio) => {
            if (ratio === '16-9') return 'drawer-item-16-9';
            if (ratio === 'vertical') return 'drawer-item-vertical';
            if (ratio === 'square') return 'drawer-item-square';
            return '';
        };

        const prefixParts = prefix.split(',').map(p => p.trim());
        const countPerPrefix = Math.ceil(count / prefixParts.length);

        for (let pIdx = 0; pIdx < prefixParts.length; pIdx++) {
            let currentPrefix = prefixParts[pIdx];

            if (currentLang === 'en' && folder === 'disenografico') {
                if (project === 'IICV' || project === 'Donato' || project === '4Bullets') {
                    currentPrefix = currentPrefix + '_en';
                }
            }

            for (let i = 1; i <= countPerPrefix; i++) {
                const globalIdx = (pIdx * countPerPrefix) + i;
                if (globalIdx > count) break;

                const index = customOrder ? customOrder[globalIdx - 1] : i;

                let imgPath;
                if (currentPrefix.includes('(')) {
                    imgPath = `../assets/img/${folder}/${project}/${currentPrefix}${index}).jpg`;
                } else {
                    imgPath = `../assets/img/${folder}/${project}/${currentPrefix}${index}.jpg`;
                }

                currentImages.push(imgPath);

                const item = document.createElement('div');
                item.className = 'drawer-item';
                if (isContain) item.classList.add('drawer-item-contain');

                item.style.backgroundColor = bgColor;

                if (exceptions.includes(globalIdx)) {
                    item.classList.add('drawer-item-auto');
                } else {
                    const ratioClass = getAspectRatioClass(aspectRatio);
                    if (ratioClass) item.classList.add(ratioClass);
                }

                const img = document.createElement('img');
                img.src = '';
                img.dataset.src = imgPath;
                img.alt = `${title} ${globalIdx}`;
                img.loading = 'lazy';

                img.onerror = function () {
                    if (this.src && this.src.includes('_en')) {
                        const fallback = this.src.replace('_en', '');
                        this.src = fallback;
                        currentImages[clickIndex] = fallback;
                    }
                };

                item.appendChild(img);
                drawerGrid.appendChild(item);

                const clickIndex = currentImages.length - 1;
                item.addEventListener('click', () => openLightbox(clickIndex));
            }
        }

        drawerOverlay.classList.add('active');
        projectDrawer.classList.add('active');
        drawerGrid.parentElement.scrollTop = 0;
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();

        setTimeout(() => {
            const imgs = drawerGrid.querySelectorAll('img');
            imgs.forEach(img => {
                img.src = img.dataset.src;
            });
        }, 100);
    };

    window.refreshDrawer = () => {
        if (projectDrawer.classList.contains('active') && lastOpenParams) {
            const { project, title, prefix, count, folder, layout, aspectRatio, customOrder, exceptions, isContain, bgColor } = lastOpenParams;
            openDrawer(project, title, prefix, count, folder, layout, aspectRatio, customOrder, exceptions, isContain, bgColor);
        }
    };

    const closeDrawer = () => {
        drawerOverlay.classList.remove('active');
        projectDrawer.classList.remove('active');
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
        lastOpenParams = null;
    };

    const openLightbox = (index) => {
        currentImgIndex = index;
        lightboxImg.src = currentImages[currentImgIndex];

        lightboxImg.onerror = function () {
            if (this.src && this.src.includes('_en')) {
                const fallback = this.src.replace('_en', '');
                this.src = fallback;
                currentImages[currentImgIndex] = fallback;
            }
        };

        lightbox.classList.add('active');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }

    const navigateLightbox = (dir) => {
        currentImgIndex = (currentImgIndex + dir + currentImages.length) % currentImages.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = currentImages[currentImgIndex];
            lightboxImg.style.opacity = '1';
        }, 200);
    };

    document.querySelectorAll('.project-opener').forEach(btn => {
        btn.addEventListener('click', () => {
            const count = btn.dataset.count ? parseInt(btn.dataset.count) : 9;
            const folder = btn.dataset.folder || 'fotografia';

            let layout = btn.dataset.layout || 'grid-2';
            let aspectRatio = btn.dataset.aspectRatio || 'auto';

            if (btn.dataset.is169 === 'true') {
                layout = 'grid-1';
                aspectRatio = '16-9';
            }

            const orderAttr = btn.dataset.order;
            const customOrder = orderAttr ? orderAttr.split(',').map(n => parseInt(n.trim())) : null;
            const exceptionsAttr = btn.dataset.exceptions;
            const exceptions = exceptionsAttr ? exceptionsAttr.split(',').map(n => parseInt(n.trim())) : [];
            const isContain = btn.dataset.contain === 'true' || btn.classList.contains('photo-card-contain');
            const bgColor = btn.dataset.color || 'transparent';

            openDrawer(
                btn.dataset.project,
                btn.dataset.title,
                btn.dataset.prefix,
                count,
                folder,
                layout,
                aspectRatio,
                customOrder,
                exceptions,
                isContain,
                bgColor
            );
        });
    });

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'Escape') closeLightbox();
        } else if (projectDrawer.classList.contains('active')) {
            if (e.key === 'Escape') closeDrawer();
        }
    });

    const contactCanvas = document.getElementById('contact-canvas');
    if (contactCanvas) {
        const ctx = contactCanvas.getContext('2d');
        let width, height;
        let particles = [];

        function resizeContactCanvas() {
            width = contactCanvas.width = contactCanvas.offsetWidth;
            height = contactCanvas.height = contactCanvas.offsetHeight;
        }

        window.addEventListener('resize', resizeContactCanvas);
        resizeContactCanvas();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2;
                this.alpha = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        function animateContact() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(200, 200, 200, ${0.1 * (1 - distance / 150)})`;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animateContact);
        }
        animateContact();
    }

    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });

});
