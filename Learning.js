
        // 图片轮播功能
        const sliderWrapper = document.getElementById('sliderWrapper');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');
        let currentIndex = 0;
        const totalImages = document.querySelectorAll('.slider-image').length;

        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // 更新指示器状态
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        });

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                currentIndex = parseInt(indicator.getAttribute('data-index'));
                updateSlider();
            });
        });

        // 自动轮播
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        }, 5000);

        // 鼠标悬停时暂停自动轮播
        document.querySelector('.image-slider').addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        // 鼠标离开时恢复自动轮播
        document.querySelector('.image-slider').addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages;
                updateSlider();
            }, 5000);
        });

        // AI助手功能
        const aiToggleBtn = document.getElementById('aiToggleBtn');
        const aiCloseBtn = document.getElementById('aiCloseBtn');
        const aiAssistant = document.getElementById('aiAssistant');
        const aiInput = document.getElementById('aiInput');
        const aiSendBtn = document.getElementById('aiSendBtn');
        const chatArea = document.getElementById('chatArea');

        aiToggleBtn.addEventListener('click', () => {
            aiAssistant.classList.remove('hidden');
            aiToggleBtn.classList.add('hidden');
        });

        aiCloseBtn.addEventListener('click', () => {
            aiAssistant.classList.add('hidden');
            aiToggleBtn.classList.remove('hidden');
        });

        function sendMessage() {
            const message = aiInput.value.trim();
            if (!message) return;

            const userMessage = document.createElement('div');
            userMessage.className = 'ai-message';
            userMessage.innerHTML = `<div class="ai-user-message">${message}</div>`;
            chatArea.appendChild(userMessage);

            aiInput.value = '';

            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'ai-message';
                botMessage.innerHTML = `<div class="ai-bot-message">${getRandomReply(message)}</div>`;
                chatArea.appendChild(botMessage);
                chatArea.scrollTop = chatArea.scrollHeight;
            }, 800);
        }

        aiSendBtn.addEventListener('click', sendMessage);
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function getRandomReply(question) {
            const replies = {
                "这道数学题怎么解": "请把题目拍给我，我来帮你分析解题步骤~",
                "英语单词怎么记": "可以试试词根词缀记忆法，比如...",
                "编程入门学什么语言": "推荐Python，语法简洁且应用广泛...",
                "谢谢你": "不客气，有问题随时问我哦~"
            };
            return replies[question] || "抱歉，我暂时还不太明白你的问题，能再详细说明一下吗？";
        }

        // 分类筛选功能
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有按钮的active类
                categoryBtns.forEach(b => b.classList.remove('active'));
                // 给当前点击的按钮添加active类
                btn.classList.add('active');
            });
        });
// 保留原有轮播图、分类筛选、AI助手等功能代码不变

// 新增：卡片视频悬停播放/暂停功能
const cardVideos = document.querySelectorAll('.card-image');
cardVideos.forEach(video => {
    // 鼠标移入播放
    video.addEventListener('mouseenter', () => {
        video.play();
        video.classList.add('play');
    });
    
    // 鼠标移出暂停
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.classList.remove('play');
    });
});

// 修改：卡片视频点击放大功能（替换原图片点击逻辑）
const cardModal = document.getElementById('cardModal');
const modalClose = document.getElementById('modalClose');
const modalMedia = document.getElementById('modalMedia');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalPlayBtn = document.getElementById('modalPlayBtn');

// 打开弹窗（适配视频/图片，优先视频）
function openModal(cardVideo) {
    const card = cardVideo.closest('.card');
    const cardContent = card.querySelector('.card-content');
    
    // 填充弹窗内容
    const videoSrc = cardVideo.src;
    const posterSrc = cardVideo.poster;
    
    // 弹窗媒体区域替换为视频
    modalMedia.parentNode.innerHTML = `<video src="${videoSrc}" class="modal-media" muted loop poster="${posterSrc}"></video>`;
    const modalVideo = modalMedia.parentNode.querySelector('.modal-media');
    
    // 填充其他信息
    modalTitle.textContent = cardContent.querySelector('.card-title').textContent;
    modalMeta.innerHTML = cardContent.querySelector('.card-meta').innerHTML;
    modalDescription.textContent = cardContent.querySelector('.card-description').textContent;
    modalPrice.textContent = cardContent.querySelector('.card-price').textContent;
    
    // 设置"开始学习"按钮功能（单独播放视频）
    const detailLink = cardContent.querySelector('.card-link').href;
    modalPlayBtn.onclick = () => {
        // 暂停弹窗视频，跳转到详情页（或直接播放完整视频）
        modalVideo.pause();
        window.location.href = detailLink; // 如需直接播放，可替换为视频播放逻辑
    };
    
    // 显示弹窗并播放视频
    cardModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalVideo.play();
}

// 关闭弹窗
function closeModal() {
    const modalVideo = document.querySelector('.modal-media');
    if (modalVideo) modalVideo.pause();
    
    cardModal.style.display = 'none';
    document.body.style.overflow = '';
}

// 为所有卡片视频添加点击事件
cardVideos.forEach(video => {
    video.addEventListener('click', () => {
        openModal(video);
    });
});

// 保留原有关闭弹窗逻辑（关闭按钮、遮罩点击、ESC键）
modalClose.addEventListener('click', closeModal);
cardModal.addEventListener('click', (e) => {
    if (e.target === cardModal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cardModal.style.display === 'flex') closeModal();
});