
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const certificates = [
        {
            title: "Sertifikat AWS Academy",
            issuer: "AWS Academy",
            date: "2026-05-13",
            file: "assets/AWS_Academy.jpg"
        },
        {
            title: "Sertifikat HCIA-DataCom",
            issuer: "Huawei",
            date: "2026-01-24",
            file: "assets/HCIA.jpg"
        }
    ];

    // ====================================
    // 1. MOBILE NAVIGATION
    // ====================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu" : "Buka menu"
        );
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    // Tutup menu jika pengguna menekan Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // ====================================
    // 2. PROFILE PHOTO
    // ====================================

    const profilePhoto = document.getElementById("profilePhoto");
    const photoPlaceholder = document.getElementById("photoPlaceholder");

    function showPhoto() {
        photoPlaceholder.classList.add("hidden");
        profilePhoto.style.display = "block";
    }

    function showPlaceholder() {
        photoPlaceholder.classList.remove("hidden");
        profilePhoto.style.display = "none";
    }

    // Tampilkan inisial MR jika foto belum tersedia.
    profilePhoto.addEventListener("load", showPhoto);
    profilePhoto.addEventListener("error", showPlaceholder);

    // Menangani gambar yang mungkin sudah selesai dimuat
    // sebelum event listener dipasang.
    if (profilePhoto.complete) {
        if (profilePhoto.naturalWidth > 0) {
            showPhoto();
        } else {
            showPlaceholder();
        }
    }

    // Gunakan ilustrasi bawaan jika gambar proyek belum tersedia.
    document.querySelectorAll(".project-preview-image").forEach((image) => {
        const showProjectImage = () => {
            image.parentElement.classList.add("has-image");
        };

        image.addEventListener("load", showProjectImage);

        if (image.complete && image.naturalWidth > 0) {
            showProjectImage();
        }
    });

    // ====================================
    // 3. CERTIFICATES
    // ====================================

    const certificatesGrid = document.getElementById("certificatesGrid");
    const certificatesEmpty = document.getElementById("certificatesEmpty");

    certificates.forEach((certificate) => {
        const card = document.createElement("article");
        card.className = "certificate-card reveal";

        const fileExtension = certificate.file.split(".").pop().toLowerCase();
        const isImage = ["jpg", "jpeg", "png", "webp"].includes(fileExtension);
        const preview = document.createElement("div");
        preview.className = "certificate-preview";

        if (isImage) {
            const image = document.createElement("img");
            image.src = certificate.file;
            image.alt = `Pratinjau ${certificate.title}`;
            image.loading = "lazy";
            preview.append(image);
        } else {
            const fileType = document.createElement("span");
            fileType.className = "certificate-file-type";
            fileType.textContent = fileExtension.toUpperCase();
            preview.append(fileType);
        }

        const details = document.createElement("div");
        details.className = "certificate-details";

        const title = document.createElement("h3");
        title.textContent = certificate.title;

        const issuer = document.createElement("p");
        issuer.className = "certificate-issuer";
        issuer.textContent = certificate.issuer;

        const date = document.createElement("p");
        date.className = "certificate-date";
        date.textContent = certificate.date;

        const link = document.createElement("a");
        link.className = "certificate-link";
        link.href = certificate.file;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Lihat sertifikat ↗";
        link.setAttribute("aria-label", `Lihat sertifikat ${certificate.title}`);

        details.append(title, issuer, date, link);
        card.append(preview, details);
        certificatesGrid.append(card);
    });

    certificatesEmpty.hidden = certificates.length > 0;

    // ====================================
    // 4. SCROLL REVEAL ANIMATION
    // ====================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        // Fallback untuk browser yang tidak mendukung observer.
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // ====================================
    // 5. DYNAMIC FOOTER YEAR
    // ====================================

    const currentYear = document.getElementById("currentYear");

    currentYear.textContent = new Date().getFullYear();

    // ====================================
    // 6. ACTIVE NAVIGATION ON SCROLL
    // ====================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const activeId = entry.target.id;

                    navLinks.forEach((link) => {
                        const targetId = link.getAttribute("href")
                            .replace("#", "");

                        link.classList.toggle(
                            "active",
                            targetId === activeId
                        );
                    });
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }
});
