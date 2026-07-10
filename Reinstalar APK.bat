@echo off
title Bodymetria - Reinstalar APK
set SDK=%LOCALAPPDATA%\Android\Sdk
set ADB=%SDK%\platform-tools\adb.exe
echo Esperando a que el emulador este listo...
"%ADB%" wait-for-device
timeout /t 5 >nul
echo Instalando la ultima version de Bodymetria...
"%ADB%" install -r "%~dp0app\build\outputs\apk\debug\app-debug.apk"
"%ADB%" shell monkey -p com.vidasana -c android.intent.category.LAUNCHER 1 >nul 2>nul
echo.
echo Listo. Bodymetria abierta en el emulador.
pause
