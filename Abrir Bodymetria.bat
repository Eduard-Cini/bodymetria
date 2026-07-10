@echo off
title Bodymetria - Emulador
set SDK=%LOCALAPPDATA%\Android\Sdk
echo Arrancando el emulador de Android...
echo (la primera pantalla tarda alrededor de 1 minuto)
start "" "%SDK%\emulator\emulator.exe" -avd bodymetria -no-boot-anim -gpu swiftshader_indirect
echo.
echo Cuando veas la pantalla de inicio de Android, abre la app "Bodymetria".
echo Ya esta instalada; no necesitas hacer nada mas.
echo.
echo Puedes cerrar esta ventana.
pause
