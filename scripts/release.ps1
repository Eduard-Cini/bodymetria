# Compila el APK, lo copia al sitio y reemplaza el asset del release de GitHub
# (el boton de descarga apunta a releases/latest/download/bodymetria.apk).
# Uso: .\scripts\release.ps1            -> actualiza el release v0.1
#      .\scripts\release.ps1 -Tag v0.2  -> otro tag (debe existir ya en GitHub)
# Requiere GitHub CLI autenticado (gh auth login).
param([string]$Tag = "v0.1")
$ErrorActionPreference = "Stop"

$raiz = Split-Path $PSScriptRoot -Parent
Set-Location $raiz

$env:JAVA_HOME = "C:\Users\robot\.jdks\jdk-17.0.19+10"
# TLS interceptado en esta red: la JVM debe usar el almacen de Windows.
$env:JAVA_TOOL_OPTIONS = "-Djavax.net.ssl.trustStoreType=Windows-ROOT"

.\gradlew.bat assembleDebug
if ($LASTEXITCODE -ne 0) { throw "Fallo el build del APK" }

Copy-Item "$raiz\app\build\outputs\apk\debug\app-debug.apk" "$raiz\web\public\bodymetria.apk" -Force

# gh del PATH, o la instalacion portable en LOCALAPPDATA.
$gh = (Get-Command gh -ErrorAction SilentlyContinue).Source
if (-not $gh) { $gh = "$env:LOCALAPPDATA\gh-cli\bin\gh.exe" }

& $gh release upload $Tag "$raiz\web\public\bodymetria.apk" --clobber
if ($LASTEXITCODE -ne 0) { throw "Fallo la subida del asset (revisa 'gh auth status')" }

Write-Host "Listo: APK compilado, copiado a web/public y subido al release $Tag."
