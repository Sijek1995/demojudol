
        // ===== SIDEBAR FUNCTIONS =====
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Prevent body scroll when sidebar is open
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
        }

        // ===== GAME SIDEBAR FUNCTIONS =====
        function toggleGameSidebar(side) {
            const sidebar = document.getElementById(side + 'Sidebar');
            const mainContent = document.getElementById('mainContent');
            
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('with-sidebars');
            } else {
                // Close other sidebar if open
                const otherSide = side === 'left' ? 'right' : 'left';
                const otherSidebar = document.getElementById(otherSide + 'Sidebar');
                if (otherSidebar.classList.contains('active')) {
                    otherSidebar.classList.remove('active');
                }
                
                sidebar.classList.add('active');
                mainContent.classList.add('with-sidebars');
                
                // On mobile, close main sidebar if open
                if (window.innerWidth <= 768) {
                    const mainSidebar = document.getElementById('sidebar');
                    if (mainSidebar.classList.contains('active')) {
                        toggleSidebar();
                    }
                }
            }
            
            // Update toggle button icon
            updateToggleButtonIcon(side);
        }

        function updateToggleButtonIcon(side) {
            const sidebar = document.getElementById(side + 'Sidebar');
            const toggleBtn = document.querySelector('.' + side + '-toggle i');
            
            if (sidebar.classList.contains('active')) {
                toggleBtn.className = side === 'left' ? 'fas fa-chevron-left' : 'fas fa-chevron-right';
            } else {
                toggleBtn.className = side === 'left' ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
            }
        }

        // ===== LAUNCH GAME FUNCTION =====
        function launchGame(gameName, gameUrl) {
            Swal.fire({
                title: `Launch ${gameName}`,
                html: `
                    <p>Anda akan membuka <strong>${gameName}</strong> di tab baru.</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Informasi Game:</strong></p>
                        <p>• Game akan terbuka di tab/window baru</p>
                        <p>• Game dimiliki oleh pengembang eksternal</p>
                        <p>• Semua game gratis untuk dimainkan</p>
                    </div>
                    <p style="font-size: 0.9rem; color: #666;">Klik "Buka Game" untuk melanjutkan</p>
                `,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: '<i class="fas fa-external-link-alt"></i> Buka Game',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#1a237e',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            window.open(gameUrl, '_blank');
                            resolve();
                        }, 500);
                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Log game play
                    logGamePlay(gameName);
                }
            });
        }

        function logGamePlay(gameName) {
            // Simpan riwayat game yang dimainkan (local storage)
            let gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
            gameHistory.unshift({
                name: gameName,
                timestamp: new Date().toISOString()
            });
            
            // Simpan maksimal 10 riwayat
            if (gameHistory.length > 10) {
                gameHistory = gameHistory.slice(0, 10);
            }
            
            localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
        }

        // ===== SCROLL TO SECTION =====
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                // Close sidebars on mobile
                if (window.innerWidth <= 768) {
                    const leftSidebar = document.getElementById('leftSidebar');
                    const rightSidebar = document.getElementById('rightSidebar');
                    const mainSidebar = document.getElementById('sidebar');
                    
                    if (leftSidebar.classList.contains('active')) {
                        leftSidebar.classList.remove('active');
                    }
                    if (rightSidebar.classList.contains('active')) {
                        rightSidebar.classList.remove('active');
                    }
                    if (mainSidebar.classList.contains('active')) {
                        toggleSidebar();
                    }
                }
                
                // Smooth scroll to section
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Add active class to section
                document.querySelectorAll('.section').forEach(sec => {
                    sec.classList.remove('active');
                });
                setTimeout(() => {
                    section.classList.add('active');
                }, 300);
            }
        }

        // ===== ALERT FUNCTIONS =====
        function showDemoAlert() {
            Swal.fire({
                title: 'Jangan Depo Mulu Pung',
                html: `
                    <p>Selamat datang di portal game demo!</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Fitur Demo:</strong></p>
                        <p>• 20+ game online populer</p>
                        <p>• Semua game gratis</p>
                        <p>• Bisa dimainkan langsung di browser</p>
                        <p>• Tidak perlu download</p>
                    </div>
                    <p>Gunakan sidebar kiri/kanan untuk menjelajahi koleksi game!</p>
                `,
                icon: 'info',
                confirmButtonText: 'Mengerti',
                confirmButtonColor: '#1a237e'
            });
        }

        function showFeatureAlert(featureName) {
            Swal.fire({
                title: `${featureName} - Demo`,
                text: `Fitur ${featureName} sedang dalam pengembangan untuk versi demo.`,
                icon: 'info',
                confirmButtonText: 'Mengerti',
                confirmButtonColor: '#1a237e'
            });
        }

        function showLogoutAlert() {
            Swal.fire({
                title: 'Logout dari Demo',
                text: 'Anda akan keluar dari akun demo. Ini hanya simulasi logout.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Logout Demo',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#d32f2f'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Berhasil Logout!',
                        text: 'Anda telah logout dari akun demo (simulasi)',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#1a237e'
                    }).then(() => {
                        toggleSidebar();
                        scrollToSection('home');
                    });
                }
            });
        }

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', function() {
            // Load SweetAlert
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            document.head.appendChild(script);
            
            // Auto open left sidebar on desktop
            if (window.innerWidth > 1200) {
                setTimeout(() => {
                    document.getElementById('leftSidebar').classList.add('active');
                    document.getElementById('mainContent').classList.add('with-sidebars');
                    updateToggleButtonIcon('left');
                }, 1000);
            }
            
            // Close sidebars when clicking escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const leftSidebar = document.getElementById('leftSidebar');
                    const rightSidebar = document.getElementById('rightSidebar');
                    const mainSidebar = document.getElementById('sidebar');
                    
                    if (leftSidebar.classList.contains('active')) {
                        leftSidebar.classList.remove('active');
                        updateToggleButtonIcon('left');
                    }
                    if (rightSidebar.classList.contains('active')) {
                        rightSidebar.classList.remove('active');
                        updateToggleButtonIcon('right');
                    }
                    if (mainSidebar.classList.contains('active')) {
                        toggleSidebar();
                    }
                }
            });
            
            // Close sidebars when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    const leftSidebar = document.getElementById('leftSidebar');
                    const rightSidebar = document.getElementById('rightSidebar');
                    
                    if (leftSidebar.classList.contains('active') && 
                        !leftSidebar.contains(e.target) && 
                        !document.querySelector('.left-toggle').contains(e.target)) {
                        leftSidebar.classList.remove('active');
                        updateToggleButtonIcon('left');
                    }
                    
                    if (rightSidebar.classList.contains('active') && 
                        !rightSidebar.contains(e.target) && 
                        !document.querySelector('.right-toggle').contains(e.target)) {
                        rightSidebar.classList.remove('active');
                        updateToggleButtonIcon('right');
                    }
                }
            });
        });
  