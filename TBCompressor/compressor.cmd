@echo off
REM color 03
REM =====================================
REM    Taobao Compressor CMD Script
REM
REM     - by yubo@taobao.com
REM     - 2009-02-12
REM =====================================
SETLOCAL ENABLEEXTENSIONS

echo.
echo Taobao Compressor v2.4.2

REM �����ļ���׺��ֻѹ��js��css
if "%~x1" NEQ ".js" (
    if "%~x1" NEQ ".css" (
        echo.
        echo **** ��ѡ��CSS��JS�ļ�
        echo.
        goto End
    )
)

REM ���Java����
if "%JAVA_HOME%" == "" goto NoJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto NoJavaHome
if not exist "%JAVA_HOME%\bin\native2ascii.exe" goto NoJavaHome

REM ��ȡѹ������ļ���������Ϊ��
REM 1. �ļ�����.sourceʱ: filename.source.js -> filename.js
REM 2. ���������filename.js -> filename-min.js
set RESULT_FILE=%~n1-min%~x1
dir /b "%~f1" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%a in ("%~n1") do (
        set RESULT_FILE=%%~na%~x1
    )
)

REM ����yuicompressorѹ���ļ�
"%JAVA_HOME%\bin\java.exe" -jar "%~dp0yuicompressor.jar" --charset GB18030 "%~nx1" -o "%RESULT_FILE%"

REM �������������⣺��js�ļ��ı�����ҳ����벻һ��ʱ����ascii�ַ��ᵼ�����룬����취�ǣ�
REM 1. ����js�ļ�������Ҫ����native2ascii.exe����ascii�ַ���\uxxxx��ʾ
REM 2. ����css�ļ�����Ҫ����ascii�ַ�ת��Ϊ\uxxxx, ͬʱ��uȥ����cssֻ��ʶ\xxxx��
REM 3. Ŀǰֻ������js�ļ�
REM 4. ����css�ļ���ֻ��font-family��:after���п����з�ascii�ַ���������٣��ֹ�����
if "%~x1" == ".js" (
    copy /y "%RESULT_FILE%" "%RESULT_FILE%.swp" > nul
    "%JAVA_HOME%\bin\native2ascii.exe" -encoding GB18030 "%RESULT_FILE%.swp" "%RESULT_FILE%"
    del /q "%RESULT_FILE%.swp"
)

REM ��ʾѹ�����
if %ERRORLEVEL% == 0 (
    echo.
    echo ѹ���ļ� %~nx1 �� %RESULT_FILE%
    for %%a in ("%RESULT_FILE%") do (
        echo �ļ���С�� %~z1 bytes ѹ���� %%~za bytes
    )
    echo.
) else (
    echo.
    echo **** �ļ� %~nx1 ����д����������ϸ���
    echo.
	goto End
)

REM ����Ƿ���������ַ(taobao.net)
find /i "taobao.net" "%RESULT_FILE%" > nul
if %ERRORLEVEL% == 0 (
	echo.
	echo **** ע�⣺%~nx1 �к��� taobao.net, �����޸�Ϊ���ϵ�ַ
	echo.
)
goto End


:NoJavaHome
echo.
echo **** ���Ȱ�װJDK������JAVA_HOME��������
echo.

:End
ENDLOCAL
pause
