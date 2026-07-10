@echo off
title Bodymetria - Emulador
echo Arrancando el emulador de Android...
echo (la primera pantalla tarda alrededor de 1 minuto)
powershell -NoProfile -Command "Start-Process -FilePath '%LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe' -ArgumentList '-avd','bodymetria','-no-boot-anim','-gpu','swiftshader_indirect'"
echo.
echo Cuando veas la pantalla de inicio de Android, abre la app "Bodymetria".
echo Puedes cerrar esta ventana.
pause
