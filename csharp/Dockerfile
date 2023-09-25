# Note: we cannot do a staged dotnet docker build here for arm/arm64. 

# Build runtime image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS builder
COPY . /app
WORKDIR /app

RUN dotnet build

FROM mcr.microsoft.com/dotnet/sdk:7.0
ENV ASPNETCORE_URLS="http://0.0.0.0:7000"
COPY --from=builder /app /app
WORKDIR /app/bin/Debug/netcoreapp7.0
ENTRYPOINT ["dotnet", "Subtract.dll", "--verbosity", "detailed"]
