// Global state and configuration
const state = {
  activeSection: "home",
  mouseX: 0,
  mouseY: 0,
  scrollY: 0,
  formStatus: { type: "idle", message: "" },
  isLoading: false,
}

// Skills data
const skills = [
  { name: "HTML5", level: 95, color: "#e34c26", icon: "code" },
  { name: "CSS3", level: 92, color: "#1572b6", icon: "layers" },
  { name: "JavaScript", level: 90, color: "#f7df1e", icon: "terminal" },
  { name: "React", level: 88, color: "#61dafb", icon: "globe" },
  { name: "Node.js", level: 85, color: "#68a063", icon: "server" },
  { name: "Tailwind CSS", level: 90, color: "#06b6d4", icon: "zap" },
  { name: "MongoDB", level: 82, color: "#4db33d", icon: "database" },
  { name: "Django", level: 80, color: "#00ff41", icon: "cpu" },
]

// Projects data
const projects = [
  {
    title: "Personal Finance Tracker",
    description:
      "A personal finance tracker that lets you scan bills via OCR, track expenses, and view your complete financial history in one place.",
    tech: ["React", "Node.js", "Next.js", "Chart.js"],
    image: "public/tracker.svg?height=100&width=100&text=Personal+Finance+Tracker",
    glowColor: "#00ff41",
    github: "https://github.com/Namanjaina/personal-finance-tracker",
    
  },
  {
    title: "Aura Voice Assistant",
    description: "Aura Voice Assistant is an AI tool that responds to voice commands, answers queries, and automates tasks.",
    tech: ["React", "Flask", "Python", "FastAPI", "Tailwindcss"],
    image: "public/assistant.svg?&text=Aura+Voice+Assistant",
    glowColor: "#0099ff",
    github: "https://github.com/Namanjaina/Aura-voice-assistant",
    
  },
  {
    title: "Smart Blood & Organ Donation Network ",
    description:
      "A real-time platform that instantly connects patients with nearby verified blood and organ donors using location-based matching and emergency alerts.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Weather API", "Python","Django"],
    image: "public/donation.svg?height=300&width=500&text=Smart+Blood&Organ+Donation+Network",
    glowColor: "#00ffff",
    github: "#",
    
  },
]

// Typing Animation Class
class TypingAnimation {
  constructor(element, texts, options = {}) {
    this.element = element
    this.texts = texts
    this.speed = options.speed || 100
    this.deleteSpeed = options.deleteSpeed || 50
    this.pauseTime = options.pauseTime || 2000

    this.currentTextIndex = 0
    this.currentText = ""
    this.isDeleting = false
    this.showCursor = true
    this.isRunning = false
    this.timeoutId = null // Track timeout for cleanup

    this.init()
  }

  init() {
    this.startTyping()
    this.startCursorBlink()
  }

  startTyping() {
    if (this.isRunning) return
    this.isRunning = true

    const typeStep = () => {
      try {
        const targetText = this.texts[this.currentTextIndex]

        if (!this.isDeleting) {
          if (this.currentText.length < targetText.length) {
            this.currentText = targetText.slice(0, this.currentText.length + 1)
            this.updateDisplay()
            this.timeoutId = setTimeout(typeStep, this.speed)
          } else {
            this.timeoutId = setTimeout(() => {
              this.isDeleting = true
              typeStep()
            }, this.pauseTime)
          }
        } else {
          if (this.currentText.length > 0) {
            this.currentText = this.currentText.slice(0, -1)
            this.updateDisplay()
            this.timeoutId = setTimeout(typeStep, this.deleteSpeed)
          } else {
            this.isDeleting = false
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length
            this.timeoutId = setTimeout(typeStep, this.speed)
          }
        }
      } catch (error) {
        console.error("Typing animation error:", error)
        this.restart()
      }
    }

    typeStep()
  }

  restart() {
    this.isRunning = false
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    setTimeout(() => this.startTyping(), 1000)
  }

  startCursorBlink() {
    const blinkCursor = () => {
      if (this.element) {
        this.showCursor = !this.showCursor
        this.updateDisplay()
        setTimeout(blinkCursor, 500)
      }
    }
    blinkCursor()
  }

  updateDisplay() {
    if (this.element) {
      const cursor = this.showCursor ? "|" : " "
      this.element.textContent = this.currentText + cursor
    }
  }
}

// Code Mist Background Class - Optimized for continuous animation
class CodeMistBackground {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.particles = []
    this.animationId = null
    this.lastFrameTime = 0
    this.isVisible = true
    this.isRunning = false

    this.codeChars = [
      "0",
      "1",
      "{",
      "}",
      "[",
      "]",
      "(",
      ")",
      "<",
      ">",
      "/",
      "\\",
      "=",
      "+",
      "-",
      "*",
      "&",
      "|",
      "^",
      "~",
      "function",
      "const",
      "let",
      "var",
      "if",
      "else",
      "for",
      "while",
      "return",
      "class",
      "import",
      "export",
      "React",
      "Node",
      "HTML",
      "CSS",
      "JS",
      "MongoDB",
      "API",
      "JSON",
      "HTTP",
      "GET",
      "POST",
      "async",
      "await",
      "Naman==Danger",
      "Naman==Coder",
    ]

    this.colors = ["#00ff41", "#0099ff", "#00ffff", "#39ff14", "#00ff88"]

    this.init()
  }

  init() {
    this.initializeParticles()
    this.animate()

    window.addEventListener("resize", () => this.initializeParticles())

    document.addEventListener("visibilitychange", () => {
      this.isVisible = !document.hidden
      if (this.isVisible && !this.isRunning) {
        this.animate()
      }
    })
  }

  initializeParticles() {
    if (!this.canvas) return

    // Set canvas to full window size
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    // Increase particle count for full screen coverage
    this.particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height - this.canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 1.0 + 0.5,
      char: this.codeChars[Math.floor(Math.random() * this.codeChars.length)],
      opacity: Math.random() * 0.4 + 0.1,
      size: Math.random() * 10 + 8,
      life: Math.random() * 200 + 100,
      maxLife: Math.random() * 200 + 100,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
    }))
  }

  animate() {
    if (this.isRunning) return
    this.isRunning = true

    const animateFrame = (currentTime) => {
      if (!this.isVisible) {
        this.isRunning = false
        return
      }

      // Throttle animation to 60fps max
      if (currentTime - this.lastFrameTime < 8.33) {
        this.animationId = requestAnimationFrame(animateFrame)
        return
      }
      this.lastFrameTime = currentTime

      if (!this.canvas) return

      const ctx = this.ctx
      if (!ctx) return

      // Always maintain full screen size
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      const mouseXVal = state.mouseX
      const mouseYVal = state.mouseY
      const scrollVal = state.scrollY * 0.001

      // Batch particle updates for better performance
      this.particles.forEach((particle) => {
        // Update position with downward flow
        particle.x += particle.vx + scrollVal * 10
        particle.y += particle.vy + 1.5

        // Add gentle horizontal drift
        particle.vx += (Math.random() - 0.5) * 0.05

        // Optimized mouse influence with distance check
        const dx = mouseXVal - particle.x
        const dy = mouseYVal - particle.y
        const distanceSquared = dx * dx + dy * dy

        if (distanceSquared < 40000) {
          // 200px squared
          const distance = Math.sqrt(distanceSquared)
          const force = (200 - distance) / 200
          particle.vx += (dx / distance) * force * 0.005
          particle.vy += (dy / distance) * force * 0.005
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.03)
        }

        // Boundary wrapping
        if (particle.y > this.canvas.height + 50) {
          particle.y = -50
          particle.x = Math.random() * this.canvas.width
          particle.vx = (Math.random() - 0.5) * 0.3
          particle.vy = Math.random() * 0.5 + 0.2
        }

        if (particle.x < -50) particle.x = this.canvas.width + 50
        if (particle.x > this.canvas.width + 50) particle.x = -50

        // Life cycle
        particle.life--
        if (particle.life <= 0) {
          particle.life = particle.maxLife
          particle.char = this.codeChars[Math.floor(Math.random() * this.codeChars.length)]
          particle.color = this.colors[Math.floor(Math.random() * this.colors.length)]
          particle.opacity = Math.random() * 0.4 + 0.1
        }

        // Render particle
        if (particle.opacity > 0) {
          ctx.save()
          ctx.globalAlpha = particle.opacity
          ctx.fillStyle = particle.color
          ctx.font = `${particle.size}px 'JetBrains Mono', monospace`
          ctx.textAlign = "center"
          ctx.fillText(particle.char, particle.x, particle.y)
          ctx.restore()
        }
      })

      this.animationId = requestAnimationFrame(animateFrame)
    }

    this.animationId = requestAnimationFrame(animateFrame)
  }
}

// Scroll Progress Bar
class ScrollProgressBar {
  constructor() {
    this.progressBar = document.getElementById("scroll-progress")
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => this.updateProgress(), { passive: true })
  }

  updateProgress() {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = scrollTop / docHeight

    this.progressBar.style.transform = `scaleX(${Math.min(scrollPercent, 1)})`
  }
}

// Navigation Handler
class NavigationHandler {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link")
    this.sections = ["home", "about", "skills", "projects", "contact"]
    this.init()
  }

  init() {
    // Smooth scroll for navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
        this.scrollToSection(targetId)
      })
    })

    // Update active section on scroll
    window.addEventListener("scroll", () => this.updateActiveSection(), { passive: true })
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 100

    this.sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.setActiveSection(section)
        }
      }
    })
  }

  setActiveSection(section) {
    if (state.activeSection !== section) {
      state.activeSection = section

      this.navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-section") === section) {
          link.classList.add("active")
        }
      })
    }
  }
}

// Skills Renderer
class SkillsRenderer {
  constructor() {
    this.container = document.getElementById("skills-grid")
    this.observer = null
    this.init()
  }

  init() {
    this.renderSkills()
    this.setupIntersectionObserver()
  }

  renderSkills() {
    this.container.innerHTML = skills
      .map(
        (skill, index) => `
      <div class="skill-card" style="animation-delay: ${index * 0.05}s">
        <div class="glow-card">
          <div class="card-content">
            <div class="skill-icon" style="border-color: ${skill.color}; background: ${skill.color}20; color: ${skill.color}; box-shadow: 0 0 15px ${skill.color}40;">
              <i data-lucide="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="skill-progress">
              <div class="skill-progress-bar" style="background: linear-gradient(90deg, ${skill.color}, ${skill.color}80); box-shadow: 0 0 10px ${skill.color}60;" data-level="${skill.level}"></div>
            </div>
            <span class="skill-level">${skill.level}%</span>
          </div>
        </div>
      </div>
    `,
      )
      .join("")

    // Initialize Lucide icons
    const lucide = window.lucide // Declare lucide variable here
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll(".skill-progress-bar")
            progressBars.forEach((bar) => {
              const level = bar.getAttribute("data-level")
              setTimeout(() => {
                bar.style.width = `${level}%`
              }, 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    this.observer.observe(this.container)
  }
}

// Projects Renderer
class ProjectsRenderer {
  constructor() {
    this.container = document.getElementById("projects-grid")
    this.init()
  }

  init() {
    this.renderProjects()
  }

  renderProjects() {
    this.container.innerHTML = projects
      .map(
        (project, index) => `
      <div class="project-card" style="animation-delay: ${index * 0.1}s">
        <div class="glow-card" style="box-shadow: 0 0 20px ${project.glowColor}20;">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
            <div class="project-overlay"></div>
            <div class="project-actions">
              <button class="project-action green" onclick="window.open('${project.github}', '_blank')">
                <i data-lucide="github"></i>
              </button>
              <button class="project-action blue" onclick="window.open('${project.live}', '_blank')">
                <i data-lucide="external-link"></i>
              </button>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
              ${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
            </div>
            <div class="project-progress">
              <div class="project-progress-bar"></div>
            </div>
            <div class="project-buttons">
              <a href="${project.github}" class="project-button outline" target="_blank">
                <i data-lucide="github"></i>
                Git Code
              </a>
             
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("")

    // Initialize Lucide icons
    const lucide = window.lucide // Declare lucide variable here
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }
}

// Contact Form Handler
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.statusElement = document.getElementById("form-status")
    this.terminalStatus = document.getElementById("form-terminal-status")
    this.submitButton = document.getElementById("submit-btn")
    this.init()
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    this.form.addEventListener("reset", () => this.handleReset())
  }

  async handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    // Validate form
    if (!this.validateForm(data)) {
      return
    }

    this.setFormStatus("loading", "Sending your message...")

    try {
      // Simulate API call (replace with actual endpoint)
      await this.sendEmail(data)
      this.setFormStatus("success", "Message sent successfully! I'll get back to you soon.")
      this.form.reset()

      // Clear status after 5 seconds
      setTimeout(() => {
        this.setFormStatus("idle", "")
      }, 5000)
    } catch (error) {
      this.setFormStatus("error", "Sorry, there was an error sending your message. Please try again later.")

      // Clear status after 5 seconds
      setTimeout(() => {
        this.setFormStatus("idle", "")
      }, 5000)
    }
  }

  handleReset() {
    this.setFormStatus("idle", "")
  }

  validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!data.name.trim()) {
      this.setFormStatus("error", "Please enter your name.")
      return false
    }

    if (!emailRegex.test(data.email)) {
      this.setFormStatus("error", "Please enter a valid email address.")
      return false
    }

    if (!data.subject.trim()) {
      this.setFormStatus("error", "Please enter a subject.")
      return false
    }

    if (!data.message.trim()) {
      this.setFormStatus("error", "Please enter a message.")
      return false
    }

    return true
  }

async sendEmail(data) {
  try {
    const result = await emailjs.send(
      "service_3w6y76q",    // apna EmailJS service ID daalo
      "template_tnugyg2",   // apna EmailJS template ID daalo
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }
    );
    console.log("Email sent:", result);
    return result;
  } catch (error) {
    console.error("EmailJS error:", error);
    throw error;
  }
}


  setFormStatus(type, message) {
    state.formStatus = { type, message }

    // Update visual status
    this.statusElement.className = `form-status ${type}`
    this.statusElement.innerHTML = this.getStatusIcon(type) + message

    if (type === "idle") {
      this.statusElement.classList.add("hidden")
    } else {
      this.statusElement.classList.remove("hidden")
    }

    // Update terminal status
    const terminalMessages = {
      idle: "ready_to_send",
      loading: "sending_message...",
      success: "message_sent_successfully",
      error: "error_occurred",
    }

    this.terminalStatus.textContent = terminalMessages[type]
    this.terminalStatus.className = `text-${this.getStatusColor(type)}`

    // Update submit button
    if (type === "loading") {
      this.submitButton.disabled = true
      this.submitButton.innerHTML = `
        <div class="loading-spinner"></div>
        sending...
      `
    } else {
      this.submitButton.disabled = false
      this.submitButton.innerHTML = `
        <i data-lucide="arrow-right"></i>
        send_message()
      `
      const lucide = window.lucide // Declare lucide variable here
      if (typeof lucide !== "undefined") {
        lucide.createIcons()
      }
    }
  }

  getStatusIcon(type) {
    const icons = {
      success: '<i data-lucide="check-circle"></i>',
      error: '<i data-lucide="alert-circle"></i>',
      loading: '<div class="loading-spinner"></div>',
    }
    return icons[type] || ""
  }

  getStatusColor(type) {
    const colors = {
      idle: "cyan",
      loading: "yellow",
      success: "green",
      error: "red",
    }
    return colors[type] || "cyan"
  }
}

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'public/Resume.pdf'; // Path to your image
    link.download = 'Naman_Bagrecha_Resume.pdf'; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Mouse tracking for background effects
function initMouseTracking() {
  let ticking = false

  window.addEventListener(
    "mousemove",
    (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          state.mouseX = e.clientX
          state.mouseY = e.clientY
          ticking = false
        })
        ticking = true
      }
    },
    { passive: true },
  )
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "-50px",
    },
  )

  // Observe elements with scroll animations
  document.querySelectorAll(".section-header, .glow-card, .skill-card, .project-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
    observer.observe(el)
  })
}

// Performance optimizations
function initPerformanceOptimizations() {
  // Lazy load images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src || img.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Throttle scroll events
  let scrollTicking = false
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          state.scrollY = window.scrollY
          scrollTicking = false
        })
        scrollTicking = true
      }
    },
    { passive: true },
  )
}

function initAnimationHealthCheck() {
  let logoLastUpdate = Date.now()
  let canvasLastUpdate = Date.now()

  setInterval(() => {
    const now = Date.now()

    // Check logo animation
    const logoElement = document.getElementById("typing-logo")
    if (logoElement) {
      const currentText = logoElement.textContent
      if (currentText && currentText.length > 1) {
        logoLastUpdate = now
      } else if (now - logoLastUpdate > 10000) {
        console.log("Restarting logo animation...")
        new TypingAnimation(logoElement, ["<NB.dev/>", "<Naman.js/>", "<Bagrecha.tsx/>", "<FullStack.dev/>"], {
          speed: 150,
          deleteSpeed: 100,
          pauseTime: 3000,
        })
        logoLastUpdate = now
      }
    }

    // Check skills animation
    const skillsElement = document.getElementById("typing-skills")
    if (skillsElement) {
      const currentText = skillsElement.textContent
      if (currentText && currentText.length > 10) {
        // Skills text is longer, so check for substantial content
      } else if (now - logoLastUpdate > 10000) {
        console.log("Restarting skills animation...")
        new TypingAnimation(
          skillsElement,
          [
            "Specializing in: HTML | CSS | JavaScript | React | Django",
            "Building with: Node.js | MongoDB | Express.js",
            "Crafting: Responsive Design | Modern UI/UX",
            "Creating: Full-Stack Applications | APIs",
            "Mastering: Tailwind CSS | React | Django | Python",
          ],
          {
            speed: 80,
            deleteSpeed: 40,
            pauseTime: 1500,
          },
        )
      }
    }

    const canvas = document.getElementById("code-mist-canvas")
    if (canvas && now - canvasLastUpdate > 15000) {
      console.log("Restarting canvas animation...")
      new CodeMistBackground(canvas)
      canvasLastUpdate = now
    }
  }, 5000)
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing animations...")

  setTimeout(() => {
    // Initialize typing animations
    const logoElement = document.getElementById("typing-logo")
    if (logoElement) {
      console.log("Initializing logo typing animation")
      new TypingAnimation(logoElement, ["<NB.dev/>", "<Naman.js/>", "<Bagrecha.tsx/>", "<FullStack.dev/>"], {
        speed: 150,
        deleteSpeed: 100,
        pauseTime: 3000,
      })
    } else {
      console.error("Logo element not found")
    }

    const skillsElement = document.getElementById("typing-skills")
    if (skillsElement) {
      console.log("Initializing skills typing animation")
      new TypingAnimation(
        skillsElement,
        [
         "Specializing in: HTML | CSS | JavaScript | React | Django",
            "Building with: Node.js | MongoDB | Express.js",
            "Crafting: Responsive Design | Modern UI/UX",
            "Creating: Full-Stack Applications | APIs",
            "Mastering: Tailwind CSS | React | Django | Python",
        ],
        {
          speed: 80,
          deleteSpeed: 40,
          pauseTime: 1500,
        },
      )
    } else {
      console.error("Skills element not found")
    }

    // Initialize background animation
    const canvas = document.getElementById("code-mist-canvas")
    if (canvas) {
      console.log("Initializing code mist background")
      new CodeMistBackground(canvas)
    } else {
      console.error("Canvas element not found")
    }
  }, 100) // Small delay to ensure DOM is fully ready

  // Initialize components
  new ScrollProgressBar()
  new NavigationHandler()
  new SkillsRenderer()
  new ProjectsRenderer()
  new ContactFormHandler()

  // Initialize Lucide icons
  const lucide = window.lucide // Declare lucide variable here
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  initAnimationHealthCheck()
})

// Handle page visibility changes for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause expensive animations when tab is not visible
    document.body.classList.add("page-hidden")
  } else {
    document.body.classList.remove("page-hidden")
  }
})

// Export functions for global access
window.scrollToSection = scrollToSection
window.scrollToTop = scrollToTop
window.downloadResume = downloadResume
