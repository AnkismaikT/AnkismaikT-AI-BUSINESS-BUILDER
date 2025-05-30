// Global variables
let currentModule = null;
let chatHistory = [];

// Business Builder Functions
let currentStep = 0;
const steps = ['ideation', 'market', 'features', 'tech', 'launch'];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeThreeJS();
    setupEventListeners();
    initializeCharts();
    setupTemplateInteractions();
});

// Set up event listeners
function setupEventListeners() {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Start the user's journey
function startJourney() {
    const modal = new bootstrap.Modal(document.getElementById('aiAssistantModal'));
    modal.show();
    addBotMessage("Hello! I'm AnkismaikT AI, your personal business and investment co-pilot. What kind of business idea do you have in mind?");
}

// Show demo
function showDemo() {
    // Implement demo visualization using Three.js
    // This is a placeholder for the 3D demo feature
}

// Open specific module
function openModule(moduleName) {
    currentModule = moduleName;
    const modal = new bootstrap.Modal(document.getElementById('aiAssistantModal'));
    modal.show();
    
    const welcomeMessages = {
        'business-builder': "Let's build your business plan together! What industry are you interested in?",
        'investment': "Welcome to smart investing! Would you like to create a long-term investment strategy or learn about specific investment opportunities?",
        'trading': "Ready to start trading? I can help you set up automated trading strategies with risk management."
    };
    
    addBotMessage(welcomeMessages[moduleName]);
}

// Send message to AI
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message) {
        addUserMessage(message);
        userInput.value = '';
        processUserInput(message);
    }
}

// Add user message to chat
function addUserMessage(message) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    chatHistory.push({ role: 'user', content: message });
}

// Add bot message to chat
function addBotMessage(message) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    chatHistory.push({ role: 'assistant', content: message });
}

// Process user input and generate response
async function processUserInput(input) {
    // Simulate AI processing
    const loadingMessage = "Analyzing your input...";
    addBotMessage(loadingMessage);
    
    // Process based on current module
    switch(currentModule) {
        case 'business-builder':
            await handleBusinessBuilder(input);
            break;
        case 'investment':
            await handleInvestment(input);
            break;
        case 'trading':
            await handleTrading(input);
            break;
        default:
            await handleGeneralInquiry(input);
    }
}

// Business Plan Template Structure
const businessPlanTemplate = {
    executive_summary: {
        title: "Executive Summary",
        fields: ["Business Name", "Mission Statement", "Products/Services", "Target Market", "Financial Projections"]
    },
    market_analysis: {
        title: "Market Analysis",
        fields: ["Industry Overview", "Target Market Size", "Competition Analysis", "Market Trends", "SWOT Analysis"]
    },
    financial_projections: {
        title: "Financial Projections",
        fields: ["Startup Costs", "Revenue Projections", "Break-even Analysis", "Cash Flow Forecast", "Funding Requirements"]
    },
    operations_plan: {
        title: "Operations Plan",
        fields: ["Location", "Equipment", "Staff Requirements", "Inventory", "Production Process"]
    }
};

// Investment Analysis Module
const investmentStrategies = {
    conservative: {
        name: "Conservative",
        allocation: {
            stocks: 30,
            bonds: 50,
            cash: 15,
            alternatives: 5
        },
        risk: "Low",
        expectedReturn: "6-8% annually"
    },
    moderate: {
        name: "Moderate",
        allocation: {
            stocks: 60,
            bonds: 30,
            cash: 5,
            alternatives: 5
        },
        risk: "Medium",
        expectedReturn: "8-10% annually"
    },
    aggressive: {
        name: "Aggressive",
        allocation: {
            stocks: 80,
            bonds: 10,
            cash: 5,
            alternatives: 5
        },
        risk: "High",
        expectedReturn: "10-12% annually"
    }
};

// Trading Module Configuration
const tradingStrategies = {
    dayTrading: {
        name: "Day Trading",
        timeframe: "Intraday",
        profitTarget: "0.5-2% per trade",
        stopLoss: "0.25-1% per trade",
        leverageAllowed: true,
        automationLevel: "High"
    },
    swingTrading: {
        name: "Swing Trading",
        timeframe: "Days to Weeks",
        profitTarget: "2-5% per trade",
        stopLoss: "1-2% per trade",
        leverageAllowed: true,
        automationLevel: "Medium"
    },
    positionTrading: {
        name: "Position Trading",
        timeframe: "Weeks to Months",
        profitTarget: "10-20% per position",
        stopLoss: "5-10% per position",
        leverageAllowed: false,
        automationLevel: "Low"
    }
};

// Enhanced Business Builder Logic
async function handleBusinessBuilder(input) {
    const businessPlan = {
        currentStep: 'executive_summary',
        progress: 0,
        data: {}
    };

    // Process user input based on context
    if (!businessPlan.data[businessPlan.currentStep]) {
        businessPlan.data[businessPlan.currentStep] = {};
    }

    // AI-powered business plan generation
    const response = await generateDetailedBusinessPlan(input, businessPlan);
    addBotMessage(response);

    // Update progress
    businessPlan.progress += 25;
    updateProgressBar(businessPlan.progress);
}

async function generateDetailedBusinessPlan(input, businessPlan) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Analyze input and generate specific guidance
    const analysis = analyzeBusinessIdea(input);
    
    // Generate step-specific response
    const response = generateStepResponse(analysis, businessPlan.currentStep);
    
    return response;
}

function analyzeBusinessIdea(input) {
    // Basic NLP-like analysis
    const keywords = input.toLowerCase().split(' ');
    const industry = detectIndustry(keywords);
    const scale = detectBusinessScale(keywords);
    const marketType = detectMarketType(keywords);
    
    return {
        industry,
        scale,
        marketType,
        originalInput: input
    };
}

function detectIndustry(keywords) {
    const industries = {
        tech: ['software', 'app', 'technology', 'digital', 'online'],
        retail: ['shop', 'store', 'retail', 'ecommerce', 'product'],
        service: ['service', 'consulting', 'agency', 'professional'],
        food: ['restaurant', 'food', 'catering', 'cafe']
    };
    
    for (const [industry, terms] of Object.entries(industries)) {
        if (terms.some(term => keywords.includes(term))) {
            return industry;
        }
    }
    return 'other';
}

function detectBusinessScale(keywords) {
    const scales = {
        small: ['small', 'local', 'startup', 'individual'],
        medium: ['medium', 'regional', 'growing'],
        large: ['large', 'national', 'international', 'global']
    };
    
    for (const [scale, terms] of Object.entries(scales)) {
        if (terms.some(term => keywords.includes(term))) {
            return scale;
        }
    }
    return 'startup';
}

function detectMarketType(keywords) {
    const markets = {
        b2c: ['consumer', 'retail', 'individual', 'personal'],
        b2b: ['business', 'corporate', 'enterprise', 'company'],
        mixed: ['both', 'hybrid', 'mixed']
    };
    
    for (const [market, terms] of Object.entries(markets)) {
        if (terms.some(term => keywords.includes(term))) {
            return market;
        }
    }
    return 'b2c';
}

function generateStepResponse(analysis, step) {
    const templates = {
        executive_summary: `Based on your ${analysis.industry} business idea, here's what we should focus on:
        
1. Target Market: ${getTargetMarketAdvice(analysis)}
2. Revenue Model: ${getRevenueModelAdvice(analysis)}
3. Initial Investment: ${getInvestmentAdvice(analysis)}
4. Key Success Factors: ${getSuccessFactorsAdvice(analysis)}

Would you like to explore any of these areas in detail?`,
        
        market_analysis: `Let's analyze the market for your ${analysis.industry} business:

1. Market Size: ${getMarketSizeEstimate(analysis)}
2. Competition: ${getCompetitionAnalysis(analysis)}
3. Entry Barriers: ${getEntryBarriers(analysis)}
4. Growth Potential: ${getGrowthPotential(analysis)}

Which aspect would you like to dive deeper into?`,
        
        financial_projections: `Here's a financial overview for your ${analysis.scale} scale business:

1. Startup Costs: ${getStartupCosts(analysis)}
2. Monthly Expenses: ${getMonthlyExpenses(analysis)}
3. Revenue Projections: ${getRevenueProjections(analysis)}
4. Break-even Timeline: ${getBreakEvenTimeline(analysis)}

Would you like a detailed breakdown of any of these numbers?`
    };
    
    return templates[step] || "Let's start by defining your business idea in more detail. What industry are you planning to enter?";
}

// Helper functions for business analysis
function getTargetMarketAdvice(analysis) {
    const marketAdvice = {
        tech: "Focus on early adopters and tech-savvy users",
        retail: "Target local customers with specific demographics",
        service: "Identify businesses that need your expertise",
        food: "Research local food preferences and competition"
    };
    return marketAdvice[analysis.industry] || "Define your ideal customer profile";
}

function getRevenueModelAdvice(analysis) {
    const revenueModels = {
        tech: "Subscription-based model with tiered pricing",
        retail: "Product markup with seasonal promotions",
        service: "Hourly rates or retainer-based pricing",
        food: "Menu pricing with delivery options"
    };
    return revenueModels[analysis.industry] || "Multiple revenue streams recommended";
}

function getInvestmentAdvice(analysis) {
    const investments = {
        small: "$5,000 - $25,000",
        medium: "$25,000 - $100,000",
        large: "$100,000+"
    };
    return investments[analysis.scale] || "Varies based on scope";
}

function getSuccessFactorsAdvice(analysis) {
    const factors = {
        tech: "Strong technical team and user experience",
        retail: "Location and inventory management",
        service: "Expertise and client relationships",
        food: "Quality, consistency, and location"
    };
    return factors[analysis.industry] || "Quality and customer service";
}

// Enhanced Investment Module
async function handleInvestment(input) {
    const investmentPlan = await analyzeInvestmentPreferences(input);
    const strategy = recommendInvestmentStrategy(investmentPlan);
    const response = generateInvestmentResponse(strategy, investmentPlan);
    addBotMessage(response);
}

async function analyzeInvestmentPreferences(input) {
    const keywords = input.toLowerCase().split(' ');
    
    return {
        riskTolerance: detectRiskTolerance(keywords),
        investmentHorizon: detectInvestmentHorizon(keywords),
        investmentAmount: detectInvestmentAmount(keywords),
        goals: detectInvestmentGoals(keywords)
    };
}

function detectRiskTolerance(keywords) {
    const riskKeywords = {
        low: ['conservative', 'safe', 'low-risk', 'stable'],
        medium: ['moderate', 'balanced', 'middle'],
        high: ['aggressive', 'high-risk', 'growth']
    };
    
    for (const [risk, terms] of Object.entries(riskKeywords)) {
        if (terms.some(term => keywords.includes(term))) {
            return risk;
        }
    }
    return 'medium';
}

function detectInvestmentHorizon(keywords) {
    const horizonKeywords = {
        short: ['short', 'quick', '1-year', '1year', 'immediate'],
        medium: ['medium', '5-year', '5year', 'mid-term'],
        long: ['long', 'retirement', '10-year', '10year', 'future']
    };
    
    for (const [horizon, terms] of Object.entries(horizonKeywords)) {
        if (terms.some(term => keywords.includes(term))) {
            return horizon;
        }
    }
    return 'medium';
}

function detectInvestmentAmount(keywords) {
    let amount = 10000; // Default amount
    
    // Look for numbers in the input
    for (let i = 0; i < keywords.length; i++) {
        const num = parseFloat(keywords[i].replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) {
            if (keywords[i].includes('k')) {
                amount = num * 1000;
            } else if (keywords[i].includes('m')) {
                amount = num * 1000000;
            } else {
                amount = num;
            }
        }
    }
    
    return amount;
}

function detectInvestmentGoals(keywords) {
    const goalKeywords = {
        retirement: ['retirement', 'pension', 'retire'],
        growth: ['growth', 'appreciation', 'capital-gains'],
        income: ['income', 'dividend', 'yield'],
        preservation: ['preservation', 'protect', 'conserve']
    };
    
    const detectedGoals = [];
    
    for (const [goal, terms] of Object.entries(goalKeywords)) {
        if (terms.some(term => keywords.includes(term))) {
            detectedGoals.push(goal);
        }
    }
    
    return detectedGoals.length > 0 ? detectedGoals : ['growth'];
}

function recommendInvestmentStrategy(preferences) {
    let strategy;
    
    // Determine strategy based on risk tolerance and investment horizon
    if (preferences.riskTolerance === 'low' || preferences.investmentHorizon === 'short') {
        strategy = investmentStrategies.conservative;
    } else if (preferences.riskTolerance === 'high' && preferences.investmentHorizon === 'long') {
        strategy = investmentStrategies.aggressive;
    } else {
        strategy = investmentStrategies.moderate;
    }
    
    return strategy;
}

function generateInvestmentResponse(strategy, preferences) {
    const response = `Based on your investment preferences:
    
🎯 Investment Amount: $${preferences.investmentAmount.toLocaleString()}
⏳ Time Horizon: ${preferences.investmentHorizon}
🎲 Risk Tolerance: ${preferences.riskTolerance}
🎯 Goals: ${preferences.goals.join(', ')}

Recommended Strategy: ${strategy.name}

Portfolio Allocation:
📈 Stocks: ${strategy.allocation.stocks}%
📊 Bonds: ${strategy.allocation.bonds}%
💰 Cash: ${strategy.allocation.cash}%
🔄 Alternatives: ${strategy.allocation.alternatives}%

Expected Return: ${strategy.expectedReturn}
Risk Level: ${strategy.risk}

Would you like to:
1. See detailed investment recommendations
2. Adjust your risk tolerance
3. Explore specific investment options
4. Calculate potential returns

Please choose an option or ask any questions about the strategy.`;

    return response;
}

// Enhanced Trading Module
async function handleTrading(input) {
    const tradingPlan = await analyzeTradingPreferences(input);
    const strategy = recommendTradingStrategy(tradingPlan);
    const response = generateTradingResponse(strategy, tradingPlan);
    addBotMessage(response);
}

async function analyzeTradingPreferences(input) {
    const keywords = input.toLowerCase().split(' ');
    
    return {
        style: detectTradingStyle(keywords),
        riskLevel: detectRiskLevel(keywords),
        capitalAmount: detectCapitalAmount(keywords),
        automation: detectAutomationPreference(keywords)
    };
}

function detectTradingStyle(keywords) {
    const styleKeywords = {
        dayTrading: ['day', 'intraday', 'scalping', 'quick'],
        swingTrading: ['swing', 'short-term', 'weekly'],
        positionTrading: ['position', 'long-term', 'monthly']
    };
    
    for (const [style, terms] of Object.entries(styleKeywords)) {
        if (terms.some(term => keywords.includes(term))) {
            return style;
        }
    }
    return 'swingTrading'; // Default to swing trading
}

function detectRiskLevel(keywords) {
    const riskKeywords = {
        conservative: ['safe', 'conservative', 'low-risk'],
        moderate: ['moderate', 'balanced', 'medium-risk'],
        aggressive: ['aggressive', 'high-risk', 'risky']
    };
    
    for (const [risk, terms] of Object.entries(riskKeywords)) {
        if (terms.some(term => keywords.includes(term))) {
            return risk;
        }
    }
    return 'moderate';
}

function detectCapitalAmount(keywords) {
    let amount = 10000; // Default amount
    
    for (let i = 0; i < keywords.length; i++) {
        const num = parseFloat(keywords[i].replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) {
            if (keywords[i].includes('k')) {
                amount = num * 1000;
            } else if (keywords[i].includes('m')) {
                amount = num * 1000000;
            } else {
                amount = num;
            }
        }
    }
    
    return amount;
}

function detectAutomationPreference(keywords) {
    const automationKeywords = {
        full: ['automatic', 'automated', 'full-auto', 'hands-off'],
        semi: ['semi-automatic', 'semi-auto', 'assisted'],
        manual: ['manual', 'hands-on', 'controlled']
    };
    
    for (const [level, terms] of Object.entries(automationKeywords)) {
        if (terms.some(term => keywords.includes(term))) {
            return level;
        }
    }
    return 'semi';
}

function recommendTradingStrategy(preferences) {
    let strategy;
    
    // Match trading style with risk level
    if (preferences.style === 'dayTrading' && preferences.riskLevel === 'aggressive') {
        strategy = tradingStrategies.dayTrading;
    } else if (preferences.style === 'positionTrading' || preferences.riskLevel === 'conservative') {
        strategy = tradingStrategies.positionTrading;
    } else {
        strategy = tradingStrategies.swingTrading;
    }
    
    return strategy;
}

function generateTradingResponse(strategy, preferences) {
    // Calculate position sizing
    const maxPositionSize = calculateMaxPositionSize(preferences.capitalAmount, preferences.riskLevel);
    const maxLoss = calculateMaxLoss(preferences.capitalAmount, preferences.riskLevel);
    
    const response = `Based on your trading preferences:
    
💰 Trading Capital: $${preferences.capitalAmount.toLocaleString()}
📊 Trading Style: ${strategy.name}
🎲 Risk Level: ${preferences.riskLevel}
🤖 Automation: ${preferences.automation}

Recommended Trading Parameters:
⏱️ Timeframe: ${strategy.timeframe}
🎯 Profit Target: ${strategy.profitTarget}
🛑 Stop Loss: ${strategy.stopLoss}
💼 Max Position Size: $${maxPositionSize.toLocaleString()}
⚠️ Max Loss Per Trade: $${maxLoss.toLocaleString()}

Automation Settings:
${generateAutomationSettings(preferences.automation, strategy)}

Would you like to:
1. Set up automated trading rules
2. Customize risk parameters
3. View detailed strategy backtesting
4. Start paper trading

Please choose an option or ask any questions about the strategy.`;

    return response;
}

function calculateMaxPositionSize(capital, riskLevel) {
    const riskMultipliers = {
        conservative: 0.1, // 10% of capital
        moderate: 0.2,    // 20% of capital
        aggressive: 0.3   // 30% of capital
    };
    
    return capital * (riskMultipliers[riskLevel] || 0.2);
}

function calculateMaxLoss(capital, riskLevel) {
    const riskPercentages = {
        conservative: 0.01, // 1% of capital
        moderate: 0.02,    // 2% of capital
        aggressive: 0.03   // 3% of capital
    };
    
    return capital * (riskPercentages[riskLevel] || 0.02);
}

function generateAutomationSettings(automationLevel, strategy) {
    const settings = {
        full: `✅ Fully Automated:
- Entry/Exit orders
- Stop-loss management
- Position sizing
- Profit taking`,
        semi: `🔄 Semi-Automated:
- Stop-loss management
- Profit taking
- Manual entry confirmation`,
        manual: `👤 Manual Trading:
- Entry/Exit alerts
- Risk management guidelines
- Trading checklist`
    };
    
    return settings[automationLevel] || settings.semi;
}

// Handle general inquiries
async function handleGeneralInquiry(input) {
    // Implement general AI response logic
    const response = await generateGeneralResponse(input);
    addBotMessage(response);
}

// Mock AI response generation (replace with actual AI API calls)
async function generateBusinessPlan(input) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "Based on your idea, here's a suggested business plan: [Business Plan Details]";
}

async function generateInvestmentAdvice(input) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "Here's my investment recommendation: [Investment Strategy]";
}

async function generateTradingStrategy(input) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "I've analyzed the market and here's your trading strategy: [Trading Strategy]";
}

async function generateGeneralResponse(input) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "I understand your query. Here's what I suggest: [General Advice]";
}

// Three.js initialization for 3D visualizations
function initializeThreeJS() {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // Add Three.js initialization code here
    // This is a placeholder for the 3D visualization feature
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startJourney,
        openModule,
        sendMessage,
        processUserInput
    };
}

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.studio-sidebar');
    const mainContent = document.querySelector('.studio-main');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    mainContent.addEventListener('click', function() {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Handle mobile navigation
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Project Management
function startNewProject() {
    const modal = new bootstrap.Modal(document.getElementById('newProjectModal'));
    modal.show();
}

function selectTemplate(type) {
    showToast('success', 'Template selected', `Starting new ${type} project...`);
    setTimeout(() => {
        window.location.href = `#${type}`;
    }, 1500);
}

function openProject(id) {
    showToast('info', 'Opening project', 'Loading project details...');
    // Add your project opening logic here
}

// Toast Notifications
function showToast(type, title, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts using the AnkismaikTCharts module
    AnkismaikTCharts.initializeCharts();

    // Set up refresh functionality
    setupChartRefresh();
});

// Chart refresh functionality
function setupChartRefresh() {
    document.querySelectorAll('.chart-actions .btn-action').forEach(button => {
        button.addEventListener('click', function() {
            const chartCard = this.closest('.chart-card');
            const chartBody = chartCard.querySelector('.chart-body');
            const chartId = chartBody.querySelector('canvas').id;

            if (this.title.includes('Refresh')) {
                // Add loading state
                const loading = document.createElement('div');
                loading.className = 'chart-loading';
                chartBody.appendChild(loading);

                // Simulate data refresh
                setTimeout(() => {
                    const data = AnkismaikTCharts.generateSampleData();
                    updateChart(chartId, data);
                    chartBody.removeChild(loading);
                    showToast('success', 'Chart Updated', 'Chart data has been refreshed');
                }, 1000);
            }
        });
    });
}

// Function to refresh all charts
function refreshAllCharts() {
    const data = AnkismaikTCharts.generateSampleData();
    document.querySelectorAll('.chart-card canvas').forEach(canvas => {
        updateChart(canvas.id, data);
    });
    showToast('success', 'Charts Updated', 'All charts have been refreshed');
}

// Function to download chart data
function downloadChart(chartId) {
    const canvas = document.getElementById(chartId);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${chartId}-${new Date().toISOString()}.png`;
    link.href = image;
    link.click();
    showToast('success', 'Download Started', 'Your chart is being downloaded');
}

// Function to download all charts as a report
function downloadChartReports() {
    document.querySelectorAll('.chart-card canvas').forEach(canvas => {
        downloadChart(canvas.id);
    });
    showToast('success', 'Download Started', 'Your report is being generated');
}

function updateChart(chartId, data) {
    const chart = Chart.getChart(chartId);
    if (chart) {
        switch(chartId) {
            case 'businessChart':
                chart.data.datasets[0].data = data.business.revenue;
                chart.data.datasets[1].data = data.business.growth;
                break;
            case 'portfolioChart':
                chart.data.datasets[0].data = data.portfolio.values;
                break;
            case 'tradingChart':
                chart.data.datasets[0].data = data.trading.values;
                break;
            case 'marketChart':
                chart.data.datasets[0].data = data.market.current;
                chart.data.datasets[1].data = data.market.target;
                break;
        }
        chart.update();
    }
}

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('btn-action')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        }
    });
});

// Handle scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .activity-item, .project-card').forEach(el => {
    observer.observe(el);
});

// Theme switcher (if needed)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Handle PWA installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show install button or prompt
});

async function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
}

// Template interaction setup
function setupTemplateInteractions() {
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            const templateType = this.querySelector('h3').textContent;
            startNewProjectFromTemplate(templateType);
        });
    });
}

function startNewProjectFromTemplate(templateType) {
    showToast('success', 'Template Selected', `Starting new project with ${templateType} template`);
    
    // Show loading state
    const loadingToast = document.createElement('div');
    loadingToast.className = 'toast info show';
    loadingToast.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <div class="toast-content">
            <h4>Setting up your project</h4>
            <p>This may take a few moments...</p>
        </div>
    `;
    document.body.appendChild(loadingToast);

    // Simulate project setup
    setTimeout(() => {
        document.body.removeChild(loadingToast);
        openProjectSetup(templateType);
    }, 2000);
}

function openProjectSetup(templateType) {
    const modal = new bootstrap.Modal(document.getElementById('newProjectModal'));
    modal.show();

    // Update modal content based on template type
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = generateTemplateSetupForm(templateType);

    // Initialize form handlers
    setupFormValidation();
}

function generateTemplateSetupForm(templateType) {
    const templates = {
        'E-commerce Store': {
            fields: ['Store Name', 'Product Category', 'Payment Gateway', 'Shipping Region'],
            features: ['Product Management', 'Payment Processing', 'Inventory System', 'Analytics Dashboard']
        },
        'Mobile App MVP': {
            fields: ['App Name', 'Platform (iOS/Android)', 'Core Features', 'Target Users'],
            features: ['User Authentication', 'Basic UI Components', 'Data Storage', 'Analytics']
        },
        'AI Service': {
            fields: ['Service Name', 'AI Model Type', 'API Requirements', 'Data Sources'],
            features: ['Model Integration', 'API Endpoints', 'Data Processing', 'Monitoring']
        },
        'Trading Bot': {
            fields: ['Bot Name', 'Trading Pairs', 'Strategy Type', 'Risk Level'],
            features: ['Automated Trading', 'Risk Management', 'Performance Analytics', 'Alert System']
        }
    };

    const template = templates[templateType] || templates['Mobile App MVP'];

    return `
        <div class="template-setup">
            <div class="setup-header">
                <h4>${templateType} Setup</h4>
                <p>Configure your project settings</p>
            </div>
            <form id="templateSetupForm">
                ${template.fields.map(field => `
                    <div class="form-group">
                        <label>${field}</label>
                        <input type="text" class="form-control" required>
                    </div>
                `).join('')}
                <div class="features-list">
                    <h5>Included Features</h5>
                    ${template.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Create Project</button>
                    <button type="button" class="btn btn-outline-primary">Save as Draft</button>
                </div>
            </form>
        </div>
    `;
}

function setupFormValidation() {
    const form = document.getElementById('templateSetupForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            createProject(Object.fromEntries(formData));
        });
    }
}

function createProject(data) {
    showToast('success', 'Project Created', 'Your new project is ready!');
    setTimeout(() => {
        window.location.href = '#dashboard';
    }, 1500);
}

// Business Builder Functions
function startNewBusiness() {
    document.getElementById('businessBuilderSection').style.display = 'block';
    document.getElementById('wealthBuilderSection').style.display = 'none';
    document.getElementById('tradingBotSection').style.display = 'none';
    showStep(0);
}

function generateBusinessIdeas() {
    const input = document.getElementById('businessIdeaInput').value;
    const suggestionsGrid = document.getElementById('aiSuggestions');
    suggestionsGrid.innerHTML = '<div class="loading">Generating ideas...</div>';

    // Simulate AI generating ideas
    setTimeout(() => {
        const ideas = generateAISuggestions(input);
        suggestionsGrid.innerHTML = ideas.map(idea => `
            <div class="suggestion-card" onclick="selectBusinessIdea('${idea.title}')">
                <h4>${idea.title}</h4>
                <p>${idea.description}</p>
                <div class="idea-metrics">
                    <span>Market Size: ${idea.marketSize}</span>
                    <span>Competition: ${idea.competition}</span>
                    <span>Initial Investment: ${idea.investment}</span>
                </div>
            </div>
        `).join('');
    }, 1500);
}

function generateAISuggestions(input) {
    // This would be replaced with actual AI API calls
    return [
        {
            title: 'AI-Powered Personal Finance Assistant',
            description: 'Build an app that helps users manage their finances using AI',
            marketSize: '$5B+',
            competition: 'Medium',
            investment: '$50K-100K'
        },
        {
            title: 'Sustainable E-commerce Platform',
            description: 'Create a marketplace for eco-friendly products',
            marketSize: '$2B+',
            competition: 'Low',
            investment: '$20K-50K'
        },
        {
            title: 'Remote Team Collaboration Tool',
            description: 'Develop a platform for better remote team management',
            marketSize: '$10B+',
            competition: 'High',
            investment: '$30K-80K'
        }
    ];
}

function selectBusinessIdea(title) {
    document.getElementById('businessName').value = title;
    document.getElementById('mvpBuilder').style.display = 'block';
    showStep(0);
}

function showStep(stepIndex) {
    currentStep = stepIndex;
    const progress = ((stepIndex + 1) / steps.length) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;

    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`step-${steps[stepIndex]}`).classList.add('active');

    document.querySelectorAll('.step-indicators .step').forEach((step, index) => {
        if (index <= stepIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

// Wealth Builder Functions
function startWealthPlan() {
    document.getElementById('businessBuilderSection').style.display = 'none';
    document.getElementById('wealthBuilderSection').style.display = 'block';
    document.getElementById('tradingBotSection').style.display = 'none';
    initializeWealthBuilder();
}

function initializeWealthBuilder() {
    const riskSlider = document.getElementById('riskSlider');
    const portfolioChart = document.getElementById('portfolioAllocationChart');

    riskSlider.addEventListener('input', updatePortfolioAllocation);
    document.querySelectorAll('.goal-option input').forEach(checkbox => {
        checkbox.addEventListener('change', updatePortfolioAllocation);
    });

    updatePortfolioAllocation();
}

function updatePortfolioAllocation() {
    const riskLevel = parseInt(document.getElementById('riskSlider').value);
    const allocation = calculatePortfolioAllocation(riskLevel);
    updateAllocationChart(allocation);
}

function calculatePortfolioAllocation(riskLevel) {
    // This would be replaced with actual portfolio optimization logic
    const allocations = {
        stocks: 40 + (riskLevel * 5),
        bonds: 60 - (riskLevel * 4),
        cash: 20 - (riskLevel * 1),
        alternatives: riskLevel * 2
    };

    return allocations;
}

function updateAllocationChart(allocation) {
    const ctx = document.getElementById('portfolioAllocationChart').getContext('2d');
    if (window.portfolioChart) {
        window.portfolioChart.destroy();
    }

    window.portfolioChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(allocation),
            datasets: [{
                data: Object.values(allocation),
                backgroundColor: chartColors.primary
            }]
        },
        options: chartTemplates.portfolioDistribution.options
    });
}

// Trading Bot Functions
let selectedStrategy = null;

function createTradingBot() {
    document.getElementById('businessBuilderSection').style.display = 'none';
    document.getElementById('wealthBuilderSection').style.display = 'none';
    document.getElementById('tradingBotSection').style.display = 'block';
    initializeTradingBot();
}

function initializeTradingBot() {
    // Set default values
    document.getElementById('tradingCapital').value = '10000';
    document.getElementById('riskPerTrade').value = '1';
    document.getElementById('stopLoss').value = '2';
}

function selectStrategy(strategy) {
    selectedStrategy = strategy;
    document.querySelectorAll('.strategy-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

function findStocks() {
    if (!selectedStrategy) {
        showToast('error', 'Error', 'Please select a trading strategy first');
        return;
    }

    const marketCap = document.getElementById('marketCap').value;
    const sector = document.getElementById('sector').value;
    
    // Show loading state
    showToast('info', 'Analyzing Market', 'Finding the best stocks for your strategy...');

    // Simulate API call to get stock recommendations
    setTimeout(() => {
        const recommendations = getStockRecommendations(selectedStrategy, marketCap, sector);
        displayStockRecommendations(recommendations);
    }, 2000);
}

function getStockRecommendations(strategy, marketCap, sector) {
    // This would be replaced with actual stock screening API calls
    return [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            score: 0.92,
            signals: ['Strong Momentum', 'High Volume', 'Above MA']
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corp.',
            score: 0.88,
            signals: ['Upward Trend', 'Good Volatility', 'Strong Fundamentals']
        },
        {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            score: 0.85,
            signals: ['Recovery Pattern', 'Increasing Volume', 'Support Level']
        }
    ];
}

function displayStockRecommendations(recommendations) {
    const stockList = document.createElement('div');
    stockList.className = 'stock-recommendations';
    
    recommendations.forEach(stock => {
        const stockCard = document.createElement('div');
        stockCard.className = 'stock-card';
        stockCard.innerHTML = `
            <h4>${stock.symbol} - ${stock.name}</h4>
            <div class="stock-score">Score: ${(stock.score * 100).toFixed(1)}%</div>
            <div class="stock-signals">
                ${stock.signals.map(signal => `<span class="signal">${signal}</span>`).join('')}
            </div>
            <button class="btn btn-primary btn-sm" onclick="addToPortfolio('${stock.symbol}')">
                Add to Portfolio
            </button>
        `;
        stockList.appendChild(stockCard);
    });

    // Add to the DOM
    const stockSelector = document.querySelector('.stock-selector');
    const existingList = stockSelector.querySelector('.stock-recommendations');
    if (existingList) {
        existingList.remove();
    }
    stockSelector.appendChild(stockList);
}

function addToPortfolio(symbol) {
    // This would be replaced with actual portfolio management logic
    showToast('success', 'Stock Added', `${symbol} has been added to your portfolio`);
} 