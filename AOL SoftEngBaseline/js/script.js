// Smooth scroll behavior for navigation links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId === "#") return
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Search functionality
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const searchTerm = searchInput.value
        if (window.location.pathname.includes("fundraisers")) {
          // Already on fundraisers page, filter
          console.log("Searching for:", searchTerm)
        } else {
          // Redirect to search
          window.location.href = `fundraisers.html?search=${encodeURIComponent(searchTerm)}`
        }
      }
    })
  }

  // Campaign card click handlers
  document.querySelectorAll(".campaign-card").forEach((card) => {
    const viewBtn = card.querySelector(".view-campaign-btn")
    const donateBtn = card.querySelector(".btn-donate")

    if (viewBtn) {
      viewBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        window.location.href = "campaign-detail.html"
      })
    }

    if (donateBtn) {
      donateBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        window.location.href = "donation-process.html"
      })
    }
  })

  // CTA buttons
  document.querySelectorAll(".btn-cta, .btn-cta-large").forEach((btn) => {
    if (btn.textContent.includes("Donasi")) {
      btn.addEventListener("click", () => {
        window.location.href = "fundraisers.html"
      })
    }
  })

  // Login button
  const loginBtn = document.querySelector(".btn-primary")
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html"
    })
  }

  // Smooth header shadow on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (header) {
      if (window.scrollY > 0) {
        header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
      } else {
        header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)"
      }
    }
  })

  const isLoggedIn = localStorage.getItem("scholify_loggedin") === "true"
  
  if (isLoggedIn) {
    const headerActions = document.querySelector(".header-actions")
    const loginButton = document.querySelector(".header-actions .btn-primary")
    
    // Check if we are on a page that has the login button
    if (headerActions && loginButton) {
        // Remove the Login button
        loginButton.remove();
        
        // Add the Profile button/avatar
        const profileHTML = `
            <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="window.location.href='user-profile.html'">
                <span style="font-weight: 600; font-size: 14px;">Hi, Budi</span>
                <img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=EB9329&color=fff" style="width: 40px; height: 40px; border-radius: 50%;">
            </div>
        `;
        headerActions.insertAdjacentHTML('beforeend', profileHTML);
    }
  }
})