# Walrus

**Walrus** es una solución de almacenamiento descentralizado pensada para archivos binarios grandes (conocidos como blobs), como imágenes, modelos 3D, música, o incluso sitios web completos. Es especialmente útil en casos donde una app o juego necesita guardar muchos assets directamente en la blockchain. Si estás desarrollando un proyecto sobre Sui que necesita almacenar contenido pesado, Walrus es la herramienta ideal.

## Características principales

* **Almacenamiento y recuperación**: puedes guardar y leer archivos grandes (blobs), y comprobar que siguen disponibles con el tiempo.
* **Eficiencia de costos**: gracias a técnicas como erasure coding, almacenar datos es más económico y resistente a fallos que replicarlos completamente.
* **Integración con la blockchain de Sui**: cada archivo guardado se representa como un objeto dentro de Sui, lo que permite interactuar con ellos desde smart contracts.
* **Token WAL y delegación de stake:** Walrus funciona con su propio token, WAL (y su subunidad FROST), que se usa para pagar por almacenamiento y participar en el consenso del protocolo.
* **Interacción flexible**: puedes usar Walrus desde la terminal (CLI), mediante SDKs o incluso con tecnologías tradicionales como HTTP, ideal si vienes del mundo Web2.

## Documentación oficial

* Puedes visitar el sitio oficial de Walrus aquí: https://www.walrus.xyz/
* Puedes encontrar la documentación oficial en inglés aquí: https://docs.wal.app/

## Instalación

> :information_source: Antes de instalar y configurar Walrus necesitas tener tu Sui Client configurado correctamente con el ambiente que requieras. Por ejemplo, para este tutorial estaremos utilizando la `testnet`.

1. [Instalación con SuiUp](#suiupwalrus)
2. [Instalación en Mac y Linux (sin SuiUp)](#maclinuxsuiup)
3. [Instalación en Windows](#windowswalrus)

### Instalación con SuiUp <a id="suiupwalrus"></a>

Si tienes instalada la herramienta `suiup` puedes instalar walrus con el siguiente comando:
```sh
suiup install walrus
```

Por defecto el ambiente instalado es `testnet`. Puedes comprobar que todo salió bien corriendo el comando:
```sh
walrus --help
```

### Instalación en Mac y Linux (sin SuiUp) <a id="maclinuxsuiup"></a>

Puedes instalar Walrus utilizando el siguiente comando:
```sh
curl -sSf https://install.wal.app | sh -s -- -n testnet
```

En este caso, estaremos instalando el ambiente de `testnet`. Puedes comprobar que todo salió bien corriendo el comando:
```sh
walrus --help
```

### Instalación en Windows <a id="windowswalrus"></a>

La instalación en Windows es la más compleja. Puedes descargar el ejecutable de Walrus usando el siguiente comando:
> :information_source: Recuerda ejecutar estos comandos usando PowerShell
```powershell
(New-Object System.Net.WebClient).DownloadFile(
  "https://storage.googleapis.com/mysten-walrus-binaries/walrus-testnet-latest-windows-x86_64.exe",
  "walrus.exe"
)
```

Esto descargará el archivo ejecutable de Walrus. Una vez hecho esto, es necesario agregarlo al `PATH` para poderlo ejecutar desde la terminal. Te recomendamos mover el archivo a un lugar más permanente, por ejemplo:

1. Obtener el directorio del usuario actual
```powershell
$UserDir = [Environment]::GetFolderPath("UserProfile")
```
2. Crear la carpeta 'tools' si no existe
```powershell
$ToolsDir = Join-Path $UserDir "tools"
if (-Not (Test-Path $ToolsDir)) {
    New-Item -ItemType Directory -Path $ToolsDir
}
```

3. Mover walrus.exe a esa carpeta (asumiendo que está en el mismo directorio actual)
```powershell
Move-Item -Path ".\walrus.exe" -Destination "$ToolsDir\walrus.exe" -Force
```

4. Agregar la carpeta al `PATH` del usuario si no está ya
```powershell
$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if (-Not ($CurrentPath.Split(";") -contains $ToolsDir)) {
    [Environment]::SetEnvironmentVariable("Path", "$CurrentPath;$ToolsDir", "User")
    Write-Output "Se agregó $ToolsDir al PATH del usuario. Reinicia PowerShell para que surta efecto."
} else {
    Write-Output "$ToolsDir ya está en el PATH del usuario."
}
```

5. Forza la recarga de tu `PATH` en la sesión actual:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "User") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "Machine")
```

Una vez terminado este proceso, puedes correr el siguiente comando para verificar que todo se ejecutó de manera correcta:
```powershell
walrus --help
```

## Configuración de Walrus

1. [Configuración en Mac y Linux](#maclinuxconfig)
2. [Configuración en Windows](#windowsconfig)

### Configuración en Mac y Linux <a id="maclinuxconfig"></a>

Crea la siguiente carpeta para almacenar la información de configuración de Walrus:
```sh
mkdir  ~/.config/walrus/
```

Una vez hecho esto, puedes descargar la configuración de `testnet` usando este comando:
```sh
curl https://docs.wal.app/setup/client_config_testnet.yaml -o ~/.config/walrus/client_config.yaml
```

### Configuración en Windows <a id="windowsconfig"></a>

Para descargar la configuración de `testnet` de Walrus ejecuta los siguientes comandos:

```powershell
$UserDir = [Environment]::GetFolderPath("UserProfile")
```

Necesitaremos crear la carpeta donde se almacenará la configuración:
```powershell
$WalrusConfigDir = Join-Path $UserDir ".config\walrus"
if (-Not (Test-Path $WalrusConfigDir)) {
    New-Item -ItemType Directory -Path $WalrusConfigDir -Force
}
```

Descarga el archivo de configuración de `testnet`:
```powershell
Invoke-WebRequest "https://docs.wal.app/setup/client_config_testnet.yaml" -OutFile (Join-Path $WalrusConfigDir "client_config.yaml")
```

## Obteniendo tokens WAL 
> :information_source: Si no lo haz hecho aún, cambia tu ambiente del Sui Client a `testnet`:
> `sui client switch --env testnet`
> Puedes encontrar información sobre como configurar esto en la lección Sui Client en este mismo repositorio.

Ya que haz instalado Walrus, primero necesitaremos obtener tokens WAL. Dado a que estamos en la `testnet` estos tokens son ficticios. Puedes obtenerlos usando el siguiente comando:

```sh
walrus get-wal
```

Deberías obtener algo similar a esto si toda la configuración fue correcta:
```sh
2025-08-08T18:45:10.294962Z  INFO walrus: client version: 1.30.0-2c369d9b99ae
2025-08-08T18:45:10.295818Z  INFO walrus_sdk::config: using Walrus configuration from 'C:\Users\aklas\.config\walrus\client_config.yaml' with default context
2025-08-08T18:45:10.296197Z  INFO walrus_sui::config: using Sui wallet configuration from 'C:\Users\aklas\.sui\sui_config\client.yaml'
2025-08-08T18:45:12.641907Z  INFO walrus_service::client::cli::runner: exchanging 0.500 SUI for WAL using exchange object 0x19825121c52080bb1073662231cfea5c0e4d905fd13e95f21e9a018f2ef41862
Success: Exchanged 0.500 SUI for WAL.
```
> :information_source: Recuerda que necesitas fondear tu cuenta de `testnet` en el Sui Client.

¡Al fin podemos trabajar con Walrus a través de la CLI!

## Subiendo un archivo

Para subir cualquier archivo a Walrus puedes usar este comando:
```sh
walrus store <FILES> --epochs <EPOCHS>
```

Por ejemplo, creemos un archivo de texto que diga `Hola, Mundo!`:

En Linux/Mac:
```sh
echo "Hola, Mundo!" > hola.txt
```

Ó en Windows:
```powershell
"Hola, Mundo!" | Out-File -Encoding utf8 hola.txt
```

Y podemos subirlo a Walrus usando:
```sh
walrus store hola.txt --epochs 1
```

> :information_source: Epochs indica cuanto tiempo estará disponible el archivo. En `testnet` 1 epoch es igual a 1 día. En `mainnet` cada epoch equivale a 2 semanas.

El output de este comando es algo largo, y similar a esto:

```sh
2025-08-08T18:58:25.097679Z  INFO walrus: client version: 1.30.0-2c369d9b99ae
2025-08-08T18:58:25.098471Z  INFO walrus_sdk::config: using Walrus configuration from 'C:\Users\aklas\.config\walrus\client_config.yaml' with default context
2025-08-08T18:58:25.099016Z  INFO walrus_sui::config: using Sui wallet configuration from 'C:\Users\aklas\.sui\sui_config\client.yaml'
2025-08-08T18:58:25.100237Z  WARN walrus_sui::client: blob is marked as neither deletable nor permanent; blobs are currently permanent by default, but this behavior will change in the future; use `--deletable` or `--permanent` to explicitly specify the desired behavior
2025-08-08T18:58:27.931646Z  INFO walrus_service::client::cli::runner: storing 1 files as blobs on Walrus
 ◌ encoding the blob [00:00:01]                                                                                         2025-08-08T18:58:29.045250Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client: encoded sliver pairs and metadata symbol_size=2 primary_sliver_size=1334 secondary_sliver_size=668 duration=1.1119338s
 ◉ blob encoded; blob ID: OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA [00:00:01]                                        2025-08-08T18:58:29.047728Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client: storing 1 sliver pairs with metadata
2025-08-08T18:58:30.196883Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client: retrieved 1 blob statuses duration=1.148592s
2025-08-08T18:58:30.197531Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client::resource: num_blobs=1 num_to_be_processed=1
2025-08-08T18:58:33.541298Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client: 1 blob resources obtained
Some(RegisterNew { blob: Blob { id: 0xbdf0e74c402d8517101a81753439a56fb75364e4ec77a19c4266726534dfb720, registered_epoch: 127, blob_id: BlobId(OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA), size: 17, encoding_type: RS2, certified_epoch: None, storage: StorageResource { id: 0x0f3eb405b09f8dac831b589bd3389374632138550d41cb7b0dbfcdfb2755cdb7, start_epoch: 127, end_epoch: 128, storage_size: 66034000 }, deletable: false }, operation: RegisterFromScratch { encoded_length: 66034000, epochs_ahead: 1 } }) duration=3.3437346s
2025-08-08T18:58:33.757705Z  INFO reserve_and_store_blobs_retry_committees_with_path:send_blob_data_and_get_certificate: walrus_sdk::client: starting to send data to storage nodes blob_id=OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA
 • sending slivers (OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA) [00:00:00] [-------------------------------] 0/667 (0s) ◉ slivers sent (OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA) [00:00:03] [################################] 667/667 (0s) ◉ slivers sent (OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA) [00:00:03] [################################] 667/667 (0s)
 ◉ additional slivers stored (OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA) [00:00:02]                                   2025-08-08T18:58:38.962134Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client: finished sending blob data and collecting certificate blob_id=OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA duration=5.2044706s blob_size=17
2025-08-08T18:58:38.962586Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client: get 1 blobs certificates duration=5.4202987s
2025-08-08T18:58:40.708093Z  INFO reserve_and_store_blobs_retry_committees_with_path: walrus_sdk::client: certified 1 blobs on Sui duration=1.7451294s
2025-08-08T18:58:40.709734Z  INFO walrus_service::client::cli::runner: 1 out of 1 blobs stored duration=12.7778725s
Success: Permanent blob stored successfully.
Path: hola.txt
Blob ID: OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA
Sui object ID: 0xbdf0e74c402d8517101a81753439a56fb75364e4ec77a19c4266726534dfb720
Unencoded size: 17 B
Encoded size (including replicated metadata): 63.0 MiB
Cost (excluding gas): 0.011 WAL (storage was purchased, and a new blob object was registered)
Expiry epoch (exclusive): 128
Encoding type: RedStuff/Reed-Solomon

Summary for Modified or Created Blobs (1 newly certified)
Total encoded size: 63.0 MiB
Total cost: 0.011 WAL
```

La parte que nos interesa es la parte final:
```sh
Success: Permanent blob stored successfully.
Path: hola.txt
Blob ID: OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA
Sui object ID: 0xbdf0e74c402d8517101a81753439a56fb75364e4ec77a19c4266726534dfb720
Unencoded size: 17 B
Encoded size (including replicated metadata): 63.0 MiB
Cost (excluding gas): 0.011 WAL (storage was purchased, and a new blob object was registered)
Expiry epoch (exclusive): 128
Encoding type: RedStuff/Reed-Solomon

Summary for Modified or Created Blobs (1 newly certified)
Total encoded size: 63.0 MiB
Total cost: 0.011 WAL
```
Aquí podemos encontrar el ID de nuestro archivo en la sección **Blob ID:**. En este caso, para mi archivo es `OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA`. Tu deberías de tener un ID diferente.

> :information_source: Recuerda que en Sui todo lo manejamos con objetos, y cada objeto tiene su ID. Los blobs o archivos en Walrus no son la excepción.

Podemos hacer varias cosas con este archivo, podemos verificar su status:
```sh
walrus blob-status --blob-id OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA
```

Obtendríamos algo similar a esto:
```sh
There is a certified permanent Blob object for blob ID OG2-BgMGF-g5dpf08jLCr1I02WH95fjm0b4ztKGJ6DA.
Expiry epoch: 128
Estimated expiry timestamp: 2025-08-08T20:38:08.446+00:00
Related event: (tx: mFDQGtWRy7uy5sDwq3iwut8JyhsvhQcMHUwdLf3BvGe, seq: 0)
Initially certified in epoch: 127
```

Podemos descargarlo usando:
```sh
walrus read 6qCki6mWEE9WeLQxSDCCQwoWJq9hQYQu1Y4IYHXzG5Y --out Decodificado.txt # Puedes poner el nombre de archivo que quieras
```

O podemos compartirlo para que cualquiera pueda descargarlo:
```sh
walrus share --blob-obj-id 0xbdf0e74c402d8517101a81753439a56fb75364e4ec77a19c4266726534dfb720
```

Nota que para este comando estamos usando el **Object ID** y no el **Blob ID**. Este Object ID lo encuentras en el output cuando subiste el archivo ó consultando el status del blob.

```sh
Success: The blob has been shared, object id: 0x43c35e51dd664211d8a9efb71af63c0be5d9f095a29e067ba63509c60f3e6a9c
```

Puedes consultar la documentación oficial para más casos de uso acá: https://docs.wal.app/usage/client-cli.html