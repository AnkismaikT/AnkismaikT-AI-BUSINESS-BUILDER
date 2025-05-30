// Chart Color Palette
const chartColors = {
    primary: ['#039BE5', '#721CE0', '#FFA000', '#FF5252', '#0F9D58'],
    gradients: [
        ['rgba(3, 155, 229, 0.8)', 'rgba(3, 155, 229, 0.2)'],
        ['rgba(114, 28, 224, 0.8)', 'rgba(114, 28, 224, 0.2)'],
        ['rgba(255, 160, 0, 0.8)', 'rgba(255, 160, 0, 0.2)'],
        ['rgba(255, 82, 82, 0.8)', 'rgba(255, 82, 82, 0.2)'],
        ['rgba(15, 157, 88, 0.8)', 'rgba(15, 157, 88, 0.2)']
    ]
};

// Chart Templates
const chartTemplates = {
    // Business Performance Chart
    businessPerformance: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Business Performance Metrics'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        }
    },

    // Investment Portfolio Distribution
    portfolioDistribution: {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Portfolio Distribution'
                }
            },
            cutout: '60%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    },

    // Trading Performance
    tradingPerformance: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Trading Performance'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    },

    // Market Analysis
    marketAnalysis: {
        type: 'radar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Market Analysis'
                }
            }
        }
    }
};

// Chart Creation Functions
function createBusinessChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, chartColors.gradients[0][0]);
    gradient.addColorStop(1, chartColors.gradients[0][1]);

    return new Chart(ctx, {
        ...chartTemplates.businessPerformance,
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Revenue',
                data: data.revenue,
                borderColor: chartColors.primary[0],
                backgroundColor: gradient,
                fill: true
            }, {
                label: 'Growth',
                data: data.growth,
                borderColor: chartColors.primary[2],
                backgroundColor: 'transparent'
            }]
        }
    });
}

function createPortfolioChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    return new Chart(ctx, {
        ...chartTemplates.portfolioDistribution,
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: chartColors.primary,
                borderWidth: 2
            }]
        }
    });
}

function createTradingChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, chartColors.gradients[1][0]);
    gradient.addColorStop(1, chartColors.gradients[1][1]);

    return new Chart(ctx, {
        ...chartTemplates.tradingPerformance,
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Profit/Loss',
                data: data.values,
                backgroundColor: data.values.map(value => 
                    value >= 0 ? chartColors.gradients[4][0] : chartColors.gradients[3][0]
                ),
                borderWidth: 0,
                borderRadius: 4
            }]
        }
    });
}

function createMarketAnalysisChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    return new Chart(ctx, {
        ...chartTemplates.marketAnalysis,
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Current',
                data: data.current,
                borderColor: chartColors.primary[0],
                backgroundColor: chartColors.gradients[0][0]
            }, {
                label: 'Target',
                data: data.target,
                borderColor: chartColors.primary[2],
                backgroundColor: chartColors.gradients[2][0]
            }]
        }
    });
}

// Sample Data Generator
function generateSampleData() {
    return {
        business: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            revenue: [30, 45, 42, 50, 75, 85],
            growth: [0, 50, -7, 19, 50, 13]
        },
        portfolio: {
            labels: ['Stocks', 'Bonds', 'Real Estate', 'Crypto', 'Cash'],
            values: [40, 25, 15, 10, 10]
        },
        trading: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            values: [500, -200, 800, -300, 1200]
        },
        market: {
            labels: ['Growth', 'Risk', 'Innovation', 'Market Size', 'Competition', 'Entry Barriers'],
            current: [65, 45, 75, 80, 60, 70],
            target: [80, 50, 85, 85, 75, 80]
        }
    };
}

// Initialize All Charts
function initializeCharts() {
    const data = generateSampleData();
    
    if (document.getElementById('businessChart')) {
        createBusinessChart('businessChart', data.business);
    }
    if (document.getElementById('portfolioChart')) {
        createPortfolioChart('portfolioChart', data.portfolio);
    }
    if (document.getElementById('tradingChart')) {
        createTradingChart('tradingChart', data.trading);
    }
    if (document.getElementById('marketChart')) {
        createMarketAnalysisChart('marketChart', data.market);
    }
}

// Export functions
window.AnkismaikTCharts = {
    createBusinessChart,
    createPortfolioChart,
    createTradingChart,
    createMarketAnalysisChart,
    initializeCharts,
    generateSampleData,
    colors: chartColors
}; 