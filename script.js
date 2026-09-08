// 1. 大學四年專案資料集（可自行修改標題、描述、年份與連結）
const projectsData = [
    {
        title: "大一：基礎程式設計網頁專案",
        yearCategory: "freshman",
        yearLabel: "大一作品",
        description: "第一次使用 HTML/CSS 打造的個人靜態主題網頁，練習結構排版與基礎互動。",
        techStack: "HTML, CSS",
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "大二：網頁互動遊戲開發",
        yearCategory: "sophomore",
        yearLabel: "大二作品",
        description: "運用 JavaScript 實現的邏輯與計時小遊戲，練習 DOM 操作與事件處理。",
        techStack: "JavaScript, CSS Grid",
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "大三：全端資料庫應用系統",
        yearCategory: "junior",
        yearLabel: "大三作品",
        description: "課堂專題作品，建立一個具備使用者註冊、登入與資料增刪改查功能的系統。",
        techStack: "JavaScript, Node.js, SQL",
        demoLink: "#",
        githubLink: "#"
    },
    {
        title: "大四：畢業專題整合平台",
        yearCategory: "senior",
        yearLabel: "畢業專題",
        description: "畢業核心專案，團隊合作開發一套整合線上服務與跨平台介面的完整系統。",
        techStack: "HTML/CSS/JS, API Integration",
        demoLink: "#",
        githubLink: "#"
    }
];

// 2. 動態渲染專案卡片
function renderProjects(filter = "all") {
    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    const filteredProjects = filter === "all" 
        ? projectsData 
        : projectsData.filter(item => item.yearCategory === filter);

    if (filteredProjects.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; color: #888;">目前尚無此階段的作品記錄。</p>`;
        return;
    }

    filteredProjects.forEach(project => {
        const cardHtml = `
            <div class="project-card">
                <div class="project-banner">${project.title}</div>
                <div class="project-info">
                    <span class="project-tag">${project.yearLabel}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <p class="project-tech"><strong>使用技術：</strong>${project.techStack}</p>
                    <div class="project-links">
                        ${project.demoLink !== '#' ? `<a href="${project.demoLink}" target="_blank" rel="noopener">線上展示</a>` : ''}
                        ${project.githubLink !== '#' ? `<a href="${project.githubLink}" target="_blank" rel="noopener">GitHub</a>` : ''}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

// 3. 綁定分類過濾按鈕事件
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");

        const filterValue = e.target.getAttribute("data-filter");
        renderProjects(filterValue);
    });
});

// 初始化頁面
document.addEventListener("DOMContentLoaded", () => {
    renderProjects("all");
});