# Použijeme oficiální image pro .NET SDK 6.0
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Nastavení pracovního adresáře
WORKDIR /app

# Kopírování souborů projektu
COPY ReactAspCrud/ReactAspCrud.csproj ./
COPY ReactAspCrud/appsettings.json ./
RUN dotnet restore

# Kopírování zbytku aplikace
COPY ReactAspCrud/. ./

# Build aplikace
RUN dotnet publish -c Release -o out

# Použijeme oficiální image pro .NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Nastavení pracovního adresáře
WORKDIR /app

# Kopírování výsledků buildu z prvního image
COPY --from=build /app/out .

# Exponování portu, na kterém bude běžet backend
EXPOSE 80

# Příkaz pro spuštění backendu
CMD ["dotnet", "ReactAspCrud.dll"]
