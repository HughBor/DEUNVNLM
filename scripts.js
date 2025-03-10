const contentData = [
 {
    type: "image",
    title: "微波炉海报-场景搭建",
    contentUrl: ["images/微波炉场景.jpg"],
    thumbnail: "images/微波炉场景-封面.jpg",
    category: "平面",
    contentId: "Graphic 001",
    date: "2023-09-13",
    description: "这是微波炉海报的场景搭建设计。" // 新增的文本内容
  }, /* 以上是平面 */
  
  {
    type: "image",
    title: "儿童益智画说明书",
    contentUrl: ["images/WuLiao/PBD12说明书.jpg", "images/WuLiao/岩石画说明书.jpg","images/WuLiao/数字颜色迷宫板.jpg"],
    thumbnail: "images/WuLiao/PBD12说明书-封面.jpg",
    category: "物料",
    contentId: "Materiel 001",
    date: "2022-08-20"
  }, /* 以上是物料 */

 {
    type: "image",
    title: "汽车专题渲染-C4D静帧练习",
    contentUrl: ["images/SanWei/车轮01.jpg"],
    thumbnail: "images/SanWei/车轮01-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 008",
    date: "2025-03-10"
  },
 {
    type: "video",
    title: "大疆灵眸云台-KS动画练习",
    contentUrl: ["videos/大疆灵眸云台.mp4","videos/口红.mp4"],
    thumbnail: "images/SanWei/大疆灵眸云台-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 007",
    date: "2025-03-04",
    description: "有关一个云台的运动动画和一只口红的扫光动画练习。" // 新增的文本内容
  },
  {
    type: "video",
    title: "行李箱-KS动画练习",
    contentUrl: "videos/行李箱.mp4",
    thumbnail: "images/SanWei/行李箱-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 006",
    date: "2025-02-26"
  },
  {
    type: "video",
    title: "Airpods Pro-KS动画练习",
    contentUrl: "videos/Airpods Pro.mp4",
    thumbnail: "images/SanWei/Airpods Pro-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 005",
    date: "2025-02-23"
  },
  {
    type: "video",
    title: "RTX4090-KS动画练习",
    contentUrl: "videos/RTX4090显卡.mp4",
    thumbnail: "images/SanWei/RTX4090-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 004",
    date: "2025-02-18"
  },
    {
    type: "image",
    title: "48/55/63系列电动升降桌-C4D静帧",
    contentUrl: ["images/SanWei/沃尔玛品牌横幅.jpg","images/SanWei/A+电机管材.jpg"],
    thumbnail: "images/SanWei/沃尔玛品牌横幅-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 003",
    date: "2024-08-16"
  },
  {
    type: "video",
    title: "铰链安装Demo-KS动画",
    contentUrl: "videos/Work/铰链.mp4",
    thumbnail: "images/SanWei/铰链-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 002",
    date: "2024-03-18"
  },
    {
    type: "image",
    title: "GoPro运动相机-C4D静帧练习",
    contentUrl: ["images/SanWei/GoPro运动相机.jpg"],
    thumbnail: "images/SanWei/GoPro运动相机-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional 001",
    date: "2021-12-04"
  }, /* 以上是三维 */
  
  {
    type: "image",
    title: "电动升降桌场景图-MJ",
    contentUrl: ["images/布料结构特写.jpg", "images/超哑面电子产品.jpg", "images/手持吸尘器.jpg"],
    thumbnail: "images/布料结构特写.jpg",
    category: "AI",
    contentId: "Artificial Intelligence 001",
    date: "2025-02-15"
  }, /* 以上是AI */

  {
    type: "image",
    title: "摄影图集",
    contentUrl: ["images/GoPro运动相机.jpg", "images/音响.jpg", "images/游戏机小场景.jpg"],
    thumbnail: "images/GoPro运动相机.jpg",
    category: "摄影",
    contentId: "Photographic 001",
    date: "2025-02-15"
  }, /* 以上是摄影 */

  {
    type: "image",
    title: "XXXXX",
    contentUrl: ["images/布料结构特写.jpg", "images/超哑面电子产品.jpg", "images/手持吸尘器.jpg"],
    thumbnail: "images/布料结构特写.jpg",
    category: "其它",
    contentId: "Other 001",
    date: "2025-02-15"
  }, /* 以上是其它 */
];

let currentPage = 1;
let itemsPerPage = 10;
let currentCategory = "全部";

/* ================= 全局主题系统 ================= */
const THEME_KEY = "hughbor_theme";

// 强制同步主题到所有元素
function syncTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  const isDarkMode = savedTheme === "dark";
  
  // 设置body主题类
  document.body.classList.toggle("dark-theme", isDarkMode);
  
  // 同步所有页面切换按钮状态
  const themeToggles = document.querySelectorAll("#theme-toggle");
  themeToggles.forEach(toggle => {
    toggle.checked = isDarkMode;
  });

  // 同步导航链接颜色
  document.querySelectorAll("nav a").forEach(link => {
    link.style.color = isDarkMode ? "#fff" : "#333";
  });

  // 同步页脚颜色
  document.querySelectorAll("footer").forEach(footer => {
    footer.style.color = isDarkMode ? "#fff" : "inherit";
  });
}

// 初始化主题系统
function initThemeSystem() {
  const themeToggles = document.querySelectorAll("#theme-toggle");
  
  // 初始化主题状态
  if (!localStorage.getItem(THEME_KEY)) {
    localStorage.setItem(THEME_KEY, "light");
  }
  
  // 绑定切换事件
  themeToggles.forEach(toggle => {
    toggle.addEventListener("change", (e) => {
      const newTheme = e.target.checked ? "dark" : "light";
      localStorage.setItem(THEME_KEY, newTheme);
      syncTheme();
      
      // 强制同步模态框主题
      const modal = document.getElementById("content-modal");
      if (modal) {
        modal.classList.toggle("dark-theme", newTheme === "dark");
      }
      // 更新粒子画布透明度
      const particleCanvas = document.getElementById('particle-canvas');
      if (particleCanvas) {
        particleCanvas.style.opacity = newTheme === 'dark' ? 1 : 0.8;
      }
    });
  });
}

/* ================= 全局初始化 ================= */
function initCommon() {
  // 初始化主题系统
  initThemeSystem();
  syncTheme();

  // 解决主题闪烁问题
  document.body.style.visibility = "visible";
}

/* ================= 首页功能 ================= */
function displayContent(page, category) {
  const filteredData = category === "全部" 
    ? contentData 
    : contentData.filter(item => item.category === category);
  
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const gallery = document.getElementById("content-gallery");
  gallery.innerHTML = currentItems.map(item => `
    <div class="content-item ${item.type}-item" data-id="${item.contentId}">
      <div class="content-thumbnail">
        ${item.type === 'video' ? `
          <div class="video-thumbnail-container">
            ${item.thumbnail ? `<img src="${item.thumbnail}" class="video-thumbnail" alt="${item.title}">` : ''}
            <video class="video-preview" preload="metadata" ${item.thumbnail ? 'style="display: none;"' : ''}>
              <source src="${item.contentUrl}#t=0.5" type="video/mp4">
            </video>
          </div>
        ` : `
          <img src="${item.thumbnail}" class="thumbnail" alt="${item.title}">
        `}
        <div class="category-label">${item.category}</div>
        <div class="content-id">${item.contentId}</div>
      </div>
      <div class="content-info">
        <h3>${item.title}</h3>
        <span class="content-date">${item.date}</span>
      </div>
    </div>
  `).join("");

  initContentItemsInteraction();
  displayPagination(filteredData.length);
}

function initContentItemsInteraction() {
  document.querySelectorAll(".content-item").forEach(item => {
    item.addEventListener("click", () => {
      const contentId = item.dataset.id;
      const content = contentData.find(c => c.contentId === contentId);
      showContentModal(content);
    });
  });
}

function showContentModal(content) {
  const modal = document.getElementById("content-modal");
  const modalBody = document.getElementById("modal-body");
  const modalText = document.getElementById("modal-text");
  
  let contentHTML = "";
  if (content.type === "video") {
    contentHTML = `
      <div class="modal-video-container">
        <video controls autoplay>
          <source src="${content.contentUrl}" type="video/mp4">
        </video>
      </div>
    `;
  } else {
    contentHTML = content.contentUrl.map(url => 
      `<img src="${url}" class="modal-image">`
    ).join("");
  }
  
  modalBody.innerHTML = `
    <div class="modal-text">${content.description || ""}</div>
    ${contentHTML}
  `;
  modal.classList.add("show");
  
  // 同步模态框主题
  modal.classList.toggle("dark-theme", 
    document.body.classList.contains("dark-theme")
  );
}

/* ================= 分页功能 ================= */
function displayPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationNumbers = document.getElementById("pagination-numbers");
  paginationNumbers.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      displayContent(currentPage, currentCategory);
    };
    paginationNumbers.appendChild(button);
  }

  // 更新箭头按钮状态
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;

  prevPageButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayContent(currentPage, currentCategory);
    }
  };

  nextPageButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayContent(currentPage, currentCategory);
    }
  };
}

/* ================= 模态框控制 ================= */
function initModalControl() {
  const modal = document.getElementById("content-modal");
  const closeBtn = document.querySelector(".close-modal");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.querySelector("video")?.pause();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modal.querySelector("video")?.pause();
    }
  });
}

/* ================= 分类筛选 ================= */
function filterContent(category) {
  currentCategory = category;
  currentPage = 1;
  displayContent(currentPage, category);
  updateCategoryButtons(category);
}

function updateCategoryButtons(activeCategory) {
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.toggle("active", btn.textContent === activeCategory);
  });
}


// 自定义光标和点击特效
document.addEventListener('DOMContentLoaded', () => {
  // 监听点击事件
  document.addEventListener('click', (e) => {
    // 获取准确坐标（考虑页面滚动）
    const x = e.pageX;
    const y = e.pageY;
    // 创建尾焰特效
    const flame = document.createElement('div');
    flame.className = 'flame-effect';
    flame.style.left = `${x}px`;
    flame.style.top = `${y}px`;
    document.body.appendChild(flame);

    // 创建涟漪特效
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    // 移除特效元素
    setTimeout(() => {
      flame.remove();
      ripple.remove();
    }, 600);
  });
});


// 添加光标轨迹
document.addEventListener('DOMContentLoaded', () => {
  const trails = [];
  const trailCount = 8; // 拖尾数量
  const colors = ['#FF6B6B', '#4ECDC4', '#556270', '#C7F464', '#FFEEAD'];
  const shapes = ['circle', 'square', 'triangle'];

  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.backgroundColor = colors[i % colors.length];
    trail.style.borderRadius = shapes[i % shapes.length] === 'circle' ? '50%' : '0';
    trail.style.opacity = 1 - (i / trailCount);
    trail.style.transform = `scale(${1 - (i * 0.2)})`;
    document.body.appendChild(trail);
    trails.push(trail);
  }

  document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;

    trails.forEach((trail, i) => {
      setTimeout(() => {
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
      }, i * 30);
    });
  });
});


// 图片懒加载
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      lazyLoader.unobserve(img);
    }
  });
});


// 监控FPS
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
  const now = performance.now();
  frameCount++;
  if (now > lastTime + 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = now;
  }
  requestAnimationFrame(monitorPerformance);
}

monitorPerformance();



/* ================= 主初始化 ================= */
document.addEventListener("DOMContentLoaded", () => {
  initCommon();
  
  // 首页特有初始化
  if (document.getElementById("content-gallery")) {
    displayContent(1, "全部");
    initModalControl();
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", () => filterContent(btn.textContent));
    });
  }

  // 博客页箭头交互
  document.querySelectorAll(".article-arrow").forEach(arrow => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      // 这里可以添加具体跳转逻辑
      console.log("导航到文章详情页");
    });
  });
});
