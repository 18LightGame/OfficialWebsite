# 官方網站專案 (Official Website)

此專案為官方網站的原始碼，使用 GitHub Pages 進行部署。

## 專案介紹

本專案是**光穹遊戲 (18Light Game)** 的官方網站原始碼。光穹遊戲是一家位於台灣的獨立遊戲開發公司，致力於透過遊戲與玩家一同探索情感與冒險的世界。

此網站為純靜態 HTML 網站，主要用於展示公司形象以及旗下代表作品，包括：

*   **《螢幕判官》 (Behind the Screen)**
*   **《奈米使徒計劃》 (NanoApostle)**
*   **《棄海：波弟大冒險》 (Pronty)**

網站提供了中、英文版本，不包含複雜的後端或建置流程。所有內容皆存放於此 Git repository 中。

## 線上網站

*   **正式站 (main 分支):** [https://18light.aoshen.com.tw/](https://18light.aoshen.com.tw/)
*   **開發站 (dev 分支):** [https://18light.aoshen.com.tw/dev/](https://18light.aoshen.com.tw/dev/)

## 開發與部署流程

本專案採用 Git-Flow 的分支管理模式，並透過 GitHub Actions 實現 CI/CD 自動化部署。

1.  **`main` 分支**:
    *   此分支代表**正式上線**的版本。
    *   任何推送到 `main` 分支的 commit 都會自動觸發部署，更新到正式站的根目錄。
    *   請確保只有穩定、測試完成的程式碼才能合併到此分支。

2.  **`dev` 分支**:
    *   此分支為主要的**開發中版本**。
    *   所有新的功能開發或修改都應該先在此分支進行。
    *   任何推送到 `dev` 分支的 commit 都會自動觸發部署，更新到開發站的 `/dev/` 子目錄，方便預覽和測試。

### 操作步驟

*   **新功能開發**: 從 `dev` 分支建立新的 feature 分支，完成後合併回 `dev` 分支。
*   **版本發佈**: 當 `dev` 分支的功能測試穩定後，將 `dev` 分支的內容合併到 `main` 分支以進行正式上線。

## 技術棧

*   純 HTML / CSS / JavaScript
*   GitHub Actions (用於自動化部署)
*   GitHub Pages (用於網站託管)
