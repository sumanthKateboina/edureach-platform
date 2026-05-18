Write-Host "Downloading EduReach College Chatbot repository zip..." -ForegroundColor Cyan
$url = "https://github.com/neerajgouda06/RAG-Based-Admission-Bot/archive/refs/heads/main.zip"
$zipFile = "main.zip"
$tempDir = "RAG-Based-Admission-Bot-main"
$destDir = "edureach-platform"

# Download the file
Invoke-WebRequest -Uri $url -OutFile $zipFile

Write-Host "Extracting archive..." -ForegroundColor Cyan
# Extract zip
Expand-Archive -Path $zipFile -DestinationPath "."

Write-Host "Cleaning up and renaming folders..." -ForegroundColor Cyan
# Rename folder to edureach-platform
if (Test-Path $tempDir) {
    if (Test-Path $destDir) {
        Remove-Item -Recurse -Force $destDir
    }
    Rename-Item -Path $tempDir -NewName $destDir
}

# Remove zip file
if (Test-Path $zipFile) {
    Remove-Item -Force $zipFile
}

Write-Host "EduReach Platform downloaded and extracted successfully!" -ForegroundColor Green
