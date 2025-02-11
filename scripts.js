const videoData = [
  {
    title: "动画视频 1",
    videoUrl: "videos/video1.mp4",
    thumbnail: "images/video1-thumbnail.jpg"
  },
  {
    title: "动画视频 2",
    videoUrl: "videos/video2.mp4",
    thumbnail: "images/video2-thumbnail.jpg"
  },
  {
    title: "动画视频 3",
    videoUrl: "videos/video3.mp4",
    thumbnail: "images/video3-thumbnail.jpg"
  },
  // 添加更多视频项
];

let currentPage = 1;
const videosPerPage = 20;

function displayVideos(page) {
  const startIndex = (page - 1) * videosPerPage;
  const endIndex = page * videosPerPage;
  const currentVideos = videoData.slice(startIndex, endIndex);

  const videoGallery = document.getElementById("video-gallery");
  videoGallery.innerHTML = ""; // 清空现有的视频项

  currentVideos.forEach(video => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");

    const thumbnail = video.thumbnail ? video.thumbnail : video.videoUrl; // 如果没有封面，使用视频作为封面
    videoItem.innerHTML = `
      <a href="${video.videoUrl}" target="_blank">
        <img src="${thumbnail}" alt="${video.title}">
        <h3>${video.title}</h3>
      </a>
    `;
    videoGallery.appendChild(videoItem);
  });

  displayPagination();
}

function displayPagination() {
  const totalPages = Math.ceil(videoData.length / videosPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      displayVideos(currentPage);
    };
    pagination.appendChild(button);
  }
}

function searchVideos() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredVideos = videoData.filter(video => video.title.toLowerCase().includes(searchTerm));
  displayFilteredVideos(filteredVideos);
}

function displayFilteredVideos(filteredVideos) {
  const videoGallery = document.getElementById("video-gallery");
  videoGallery.innerHTML = ""; // 清空现有的视频项

  filteredVideos.forEach(video => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");

    const thumbnail = video.thumbnail ? video.thumbnail : video.videoUrl; // 如果没有封面，使用视频作为封面
    videoItem.innerHTML = `
      <a href="${video.videoUrl}" target="_blank">
        <img src="${thumbnail}" alt="${video.title}">
        <h3>${video.title}</h3>
      </a>
    `;
    videoGallery.appendChild(videoItem);
  });
}

// 初始化
displayVideos(currentPage);
