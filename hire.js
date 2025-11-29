
        // 登录状态判断与导航栏渲染
        window.addEventListener('load', function() {
            const isLogin = localStorage.getItem('isLogin') === 'true';
            const username = localStorage.getItem('loginUsername');
            const userContainer = document.getElementById('loginOrUser');

            if (isLogin && username) {
                userContainer.innerHTML = `
                    <a href="personal.html" class="btn-user">
                        <i class="fa fa-user"></i> ${username}
                    </a>
                `;
            } else {
                userContainer.innerHTML = '<a href="login.html" class="btn-login">登录</a>';
            }

            // 职位筛选功能
            const filterBtns = document.querySelectorAll('.job-filter-btn');
            const jobCards = document.querySelectorAll('.job-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // 移除所有按钮的active类
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // 给当前点击的按钮添加active类
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    
                    // 筛选职位卡片
                    jobCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // 申请表单提交处理
            document.getElementById('applicationForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 在实际应用中，这里会有表单验证和数据提交到服务器的逻辑
                alert('申请已提交成功！我们会尽快与您联系。');
                this.reset();
            });

            // 平滑滚动到申请表单
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
