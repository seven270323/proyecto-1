![banner](./recursos/imagenes/banner.jpg)
# Primeros pasos en Sui

## Introducción

**Sui** es una plataforma de blockchain y contratos inteligentes de **capa 1** diseñada para que la propiedad de activos digitales sea rápida, privada, segura y accesible.

**Move** es un lenguaje de código abierto para escribir paquetes seguros para manipular objetos en blockchain. Permite bibliotecas, herramientas y comunidades de desarrolladores comunes en blockchains con modelos de datos y ejecución muy diferentes.

## Instalando un editor de código

Para este tutorial intalaremos **Visual Studio Code**.

Puedes simplemente descargar el instalador para tu sistema operativo en la [página oficial de Visual Studio](https://code.visualstudio.com/)

## Clonando este repositorio

> :information_source: Asegurate de tener acceso a una consola en tu equipo con permisos para instalación de software.

## 1. Instalación de Git

1. [Instalación en Mac](#macgit)
2. [Instalación en Windows](#windowsgit)
3. [Instalación en Linux](#linuxgit)

## Instalación en Mac <a id="macgit"></a>

1. Asegurate de tener **Homebrew** instalado: [https://brew.sh/](https://brew.sh/).
2. Abre una terminal e introduce los siguientes comandos:
```sh
brew update
brew install git
```
3. Si requieres más información sobre la instalación, puedes encontrarla en la documentación [oficial de Git](https://www.git-scm.com/download/mac).

## Instalación en Windows <a id="windowsgit"></a>

1. Descarga el instalador de la página oficial de Git: [https://www.git-scm.com/download/win](https://www.git-scm.com/download/win).
2. Sigue las instrucciones indicadas. Las opciones que el instalador por defecto suelen ser suficientes, pero si quieres customizar tu instalación de alguna manera y sabes lo que estás haciendo, sientete libre de cambiar lo que necesites.

## Instalación en Linux <a id="linuxgit"></a>

1. Para distribuciones basadas en Debian, cómo Ubuntu, puedes correr los siguientes comandos:
```bash
sudo apt update
sudo apt install git-all
```
2. Si requieres información sobre la instalación en alguna otra distribución específica, puedes encontrarla en la documentación [oficial de Git](https://git-scm.com/download/linux).

## 2. Configurando Git

Es buena idea configurar los valores globales de tu usuario antes de comenzar a utilizar Git. Puedes hacerlo con los siguientes comandos.

```sh
git config --global user.name "Nombre Ejemplo"
git config --global user.email nombre@ejemplo.com
```

> :information_source: Recuerda sustituir los ejemplos con tus datos personales.

## 3. Clonando el repositorio de manera local

En tu terminal, corre el siguiente comando:

```sh
git clone https://github.com/Zona-Tres/sui-first-steps.git
```

> :information_source: Recuerda que puedes cambiar el directorio donde se clonará el repositorio. Utiliza `cd` para moverte entre los directorios de tu equipo, y `mkdir` para crear uno nuevo. </br></br>
> Más información: [Tutorial comandos básicos](https://aprendolinux.com/aprende-los-comandos-basicos-de-linux/).

Una vez clonado el repositorio, puedes navegar a él:
```sh
cd sui-first-steps
```

Para visualizar los contenidos puedes correr el comando:

```sh
ls -a
```

Y para abrirlo en el editor de código (en nuestro caso, VS Code), puedes correr:
```sh
code .
```

## Instalación de la Sui CLI

Para poder interactuar con los contenidos de los tutoriales, es necesario instalar la **Sui CLI**.

1. [Instalación en Mac](#maccli)
2. [Instalación en Windows](#windowscli)
3. [Instalación en Linux](#linuxcli)

## Instalación en Mac <a id="maccli"></a>

Podemos instalar Sui de dos maneras. Una usando la herramienta desarrollada por MystenLabs `suiup` y otra utilizando Hombrew. La recomendada para dar tus primeros pasos si necesidad de hacer muchas configuraciones es `suiup`, sin embargo, esta herramienta no se debe utilizar para entornos productivos. Vamos a explorar ambas opciones.

### `suiup`

* Ejecuta el siguiente comando en tu terminal:
```sh
curl -sSfL https://raw.githubusercontent.com/Mystenlabs/suiup/main/install.sh | sh
```

* Ó puedes descargar los binarios e instalarlo manualmente directamente desde el [repositorio oficial de `suiup`](https://github.com/Mystenlabs/suiup/releases). Esta opción es algo más avanzada por lo que si nunca haz instalado algo de forma similar, recomendamos usar el comando de arriba.

> :information_source: Si no sabes que arquitectura tienes puedes correr el siguiente comando:
> ```sh
> uname -m
> ```
> * Si dice **arm64** → Descarga suiup-macOS-arm64.tar.gz.
> * Si dice **x86_64** → Descarga suiup-macOS-x86_64.tar.gz.

1. Puedes probar que la instalación de `suiup` se realizó de manera correcta corriendo el siguiente comando:
```sh
suiup --version
```

2. Una vez que instales `suiup`, sin importar cual opción escogiste, ejecuta el siguiente comando para instalar la Sui CLI:
```sh
suiup install sui
```

3. Y de nuevo, puedes probar que todo salió bien usando:
```sh
sui --version
```

### Hombrew

1. Asegurate de tener **Homebrew** instalado: [https://brew.sh/](https://brew.sh/).
2. Abre una terminal e introduce los siguientes comandos:
```sh
brew update
brew install sui
```
3. Puedes probar que todo se haya instalado correctamente corriendo:
```sh
sui --version
```

## Instalación en Windows <a id="windowscli"></a>

Podemos instalar Sui de dos maneras. Una usando la herramienta desarrollada por MystenLabs `suiup` y otra utilizando un administrador de paquetes como **Chocolatey**. La recomendada para dar tus primeros pasos si necesidad de hacer muchas configuraciones es `suiup`, sin embargo, esta herramienta no se debe utilizar para entornos productivos. Vamos a explorar ambas opciones.

### `suiup`

1. Descarga el instalador directamente desde el [repositorio oficial de `suiup`](https://github.com/Mystenlabs/suiup/releases).

> :information_source: Si no sabes que arquitectura tienes simplemente descarga el archivo `suiup-Windows-msvc-x86_64.zip`.

2. Una vez instalado, abre una terminal y corre el siguiente comando para verificar que todo salió bien:
```sh
suiup --version
```
> :information_source: Recomendamos usar Powershell como terminal para ejecutar todos los comandos de este repositorio en Windows.

3. Una vez que instales `suiup` ejecuta el siguiente comando para instalar la Sui CLI:
```sh
suiup install sui
```

4. Y de nuevo, puedes probar que todo salió bien usando:
```sh
sui --version
```

### `choco`

1. Asegurate de tener **Chocolatey** instalado: [https://chocolatey.org/install](https://chocolatey.org/install).
2. Abre una terminal e introduce el siguiente comando:
```sh
choco install sui
```
3. Puedes probar que todo se haya instalado correctamente corriendo:
```sh
sui --version
```

## Instalación en Linux <a id="linuxcli"></a>

Podemos instalar Sui de dos maneras. Una usando la herramienta desarrollada por MystenLabs `suiup` y otra utilizando el administrador de paquetes para **Rust** llamado `cargo`. La recomendada para dar tus primeros pasos si necesidad de hacer muchas configuraciones es `suiup`, sin embargo, esta herramienta no se debe utilizar para entornos productivos. Vamos a explorar ambas opciones.

### `suiup`

* Ejecuta el siguiente comando en tu terminal:
```sh
curl -sSfL https://raw.githubusercontent.com/Mystenlabs/suiup/main/install.sh | sh
```

* Ó puedes descargar los binarios e instalarlo manualmente directamente desde el [repositorio oficial de `suiup`](https://github.com/Mystenlabs/suiup/releases). Esta opción es algo más avanzada por lo que si nunca haz instalado algo de forma similar, recomendamos usar el comando de arriba.

> :information_source: Si no sabes que arquitectura tienes puedes correr el siguiente comando:
> ```sh
> uname -m
> ```
> * Si dice **arm64** → Descarga `suiup-Linux-musl-arm64.tar.gz`.
> * Si dice **x86_64** → Descarga `suiup-Linux-musl-x86_64.tar.gz`.

1. Puedes probar que la instalación de `suiup` se realizó de manera correcta corriendo el siguiente comando:
```sh
suiup --version
```

2. Una vez que instales `suiup`, sin importar cual opción escogiste, ejecuta el siguiente comando para instalar la Sui CLI:
```sh
suiup install sui
```

3. Y de nuevo, puedes probar que todo salió bien usando:
```sh
sui --version
```

### `cargo`

1. Asegurate de tener `rustup` instalado: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install).
2. Abre una terminal e introduce los siguientes comandos:
```sh
rustup update stable
cargo install --git https://github.com/MystenLabs/sui.git sui --branch devnet
```
3. Puedes probar que todo se haya instalado correctamente corriendo:
```sh
sui --version
```

## Interactuando con el repositorio.

El repositorio está compuesto de varias carpetas con archivos para cada tutorial, simplemente navega a ellas usando `cd` y sigue las instrucciones dentro.</br></br>
Cada tutorial cuenta con un archivo `README.md` con instrucciones claras de cómo interactuar con ellos.