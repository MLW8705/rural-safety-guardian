param(
  [int]$Port = 4173
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$pythonPath = "C:\Users\bestc\anaconda3\python.exe"

if (-not (Test-Path -LiteralPath $pythonPath -PathType Leaf)) {
  throw "Could not find Anaconda Python at $pythonPath"
}

if (-not (Test-Path -LiteralPath (Join-Path $root "index.html") -PathType Leaf)) {
  throw "Could not find index.html in $root"
}

Write-Host "Starting Rural Safety Guardian preview at http://localhost:$Port/"
Write-Host "Serving files from: $root"
Write-Host "Press Ctrl+C to stop."

Push-Location $root

try {
  & $pythonPath -m http.server $Port
} finally {
  Pop-Location
}
