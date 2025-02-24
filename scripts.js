const contentData = [
  {
    type: "image",
    title: "微波炉海报-场景搭建",
    contentUrl: "images/微波炉场景.jpg",
    thumbnail: "images/微波炉场景-封面.jpg",
    category: "平面",
    contentId: "Graphic",
    date: "2023-09-13"
  },
  {
    type: "image",
    title: "产品设计图集",
    contentUrl: ["images/DJI Inspire1.jpg", "images/DJI Inspire1-02.jpg","images/DJI Inspire1-03.jpg","images/DJI Inspire1遥控器.jpg","images/DJI Inspire1遥控器-2.jpg","images/DJI Inspire1遥控器-3.jpg"],
    thumbnail: "images/DJI Inspire1.jpg",
    category: "物料",
    contentId: "Materiel",
    date: "2025-02-15"
  },
  {
    type: "video",
    title: "Airpods Pro-KS动画练习",
    contentUrl: "videos/Airpods Pro.mp4",
    thumbnail: "images/Airpods Pro-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional",
    date: "2025-02-23"
  },
  {
    type: "video",
    title: "RTX4090-KS动画练习",
    contentUrl: "videos/RTX4090.mp4",
    thumbnail: "images/RTX4090-封面.jpg",
    category: "三维",
    contentId: "Three-dimensional",
    date: "2025-02-18"
  },
    {
    type: "video",
    title: "AI Landing Page",
    contentUrl: "videos/004.mp4",
    thumbnail: "images/A.jpg",
    category: "三维",
    contentId: "NO.008",
    date: "2025-01-01"
  },
  {
    type: "image",
    title: "摄影图集",
    contentUrl: ["images/GoPro运动相机.jpg", "images/音响.jpg", "images/游戏机小场景.jpg"],
    thumbnail: "images/GoPro运动相机.jpg",
    category: "摄影",
    contentId: "Photographic",
    date: "2025-02-15"
  },
  {
    type: "image",
    title: "电动升降桌场景图-MJ",
    contentUrl: ["images/布料结构特写.jpg", "images/超哑面电子产品.jpg", "images/手持吸尘器.jpg"],
    thumbnail: "images/布料结构特写.jpg",
    category: "AI",
    contentId: "Artificial Intelligence",
    date: "2025-02-15"
  },
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
  
  modalBody.innerHTML = contentHTML;
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
