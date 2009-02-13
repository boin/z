@echo off
color 03

pushd "%~dp0"
rundll32 setupapi.dll,InstallHinfSection DefaultUnInstall 128 .\install.inf
popd

echo.
echo ~_~  Taobao Compressor –∂‘ÿ≥…π¶  ~_~
echo.
pause
