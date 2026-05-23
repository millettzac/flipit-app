# FlipIt App Setup Script
# Run this to set up the Capacitor project for iOS & Android development

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FlipIt - Capacitor Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
$nodeCheck = node --version
if ($nodeCheck) {
    Write-Host "✓ Node.js found: $nodeCheck" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Install npm dependencies
Write-Host ""
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ npm install failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. For iOS development:"
Write-Host "   npm run cap:add:ios" -ForegroundColor Cyan
Write-Host "   npm run cap:open:ios" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. For Android development:"
Write-Host "   npm run cap:add:android" -ForegroundColor Cyan
Write-Host "   npm run cap:open:android" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Configure backend API before app store submission" -ForegroundColor Yellow
Write-Host ""
