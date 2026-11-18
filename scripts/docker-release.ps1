# docker-release.ps1
# ---------------------------------------------------------------
# Script parametrizado para build e push da imagem do findtax-mkt-api
# para o GitHub Container Registry (ghcr.io).
#
# Uso:
#   .\scripts\docker-release.ps1 -Version prd-22
#   .\scripts\docker-release.ps1 -Version prd-23 -Username rafaelfindtax -Token ghp_xxx
#   $env:GHCR_TOKEN = "ghp_xxx"; .\scripts\docker-release.ps1 -Version prd-24
# ---------------------------------------------------------------
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$Version,

    [string]$Username = "rafaelfindtax",
    [string]$Token = $env:GHCR_TOKEN,
    [string]$Registry = "ghcr.io",
    [string]$ImagePath = "rafaelfindtax/findtax-mkt-api/find-node-api",
    [string]$Dockerfile = "Dockerfile",
    [switch]$NoLogin,
    [switch]$NoPush
)

$ErrorActionPreference = "Stop"

$FullTag = "$Registry/$ImagePath`:$Version"

Write-Host "==========================================================="
Write-Host " findtax-mkt-api - Docker release"
Write-Host "-----------------------------------------------------------"
Write-Host " Registry:   $Registry"
Write-Host " Imagem:     $ImagePath"
Write-Host " Versao:     $Version"
Write-Host " Tag final:  $FullTag"
Write-Host " Dockerfile: $Dockerfile"
Write-Host "==========================================================="

if (-not $NoLogin) {
    if ([string]::IsNullOrWhiteSpace($Token)) {
        Write-Error "Token nao informado. Use -Token ou defina a env var GHCR_TOKEN."
        exit 1
    }
    Write-Host ">> Fazendo login no $Registry..."
    $Token | docker login --username $Username --password-stdin $Registry
    if ($LASTEXITCODE -ne 0) { throw "docker login falhou" }
} else {
    Write-Host ">> Pulando login (-NoLogin)"
}

Write-Host ">> Buildando imagem $FullTag..."
docker build -f $Dockerfile -t $FullTag .
if ($LASTEXITCODE -ne 0) { throw "docker build falhou" }

if (-not $NoPush) {
    Write-Host ">> Fazendo push de $FullTag..."
    docker push $FullTag
    if ($LASTEXITCODE -ne 0) { throw "docker push falhou" }
    Write-Host ">> Push concluido: $FullTag"
} else {
    Write-Host ">> Pulando push (-NoPush)"
}

Write-Host "==========================================================="
Write-Host " Release finalizado com sucesso"
Write-Host "==========================================================="
