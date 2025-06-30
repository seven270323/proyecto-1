<!-- ![banner](./recursos/imagenes/banner.png) -->
# Primeros pasos en Sui

## Introducción

**Sui** es una red de **Layer-1** segura y con alta escalabilidad. Permite la creación de smart contracts con **Move**, un lenguaje de programación diseñado específicamente para garantizar la seguridad y el control de acceso de los recursos computacionales de esta blockchain.

Gracias a la ejecución paralela de transacciones mediante su entorno de ejecución **MoveVM**, Sui tiene la capacidad de procesar **+100,000 TPS** convirtiéndolo en una plataforma preparada para la aceleración de **DApps** a nivel global.

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
1. Asegurate de tener **Homebrew** instalado: [https://brew.sh/](https://brew.sh/).
2. Abre una terminal e introduce los siguientes comandos:
```sh
brew update
brew install sui
```
3. Abre otra terminal y ejecuta el comando `sui help` para verificar que la instalación fue correcta:
```sh
sui help
```
### Actualizar la CLI
Actualizar la CLI con `brew` requiere de 2 comandos:
```sh
brew update
brew upgrade sui
```

## Instalación en Windows <a id="windowscli"></a>

Pendiente.

## Instalación en Linux <a id="linuxcli"></a>
1. Asegurate de tener instalado **Python** 3.6 o superior. Para esto puedes abrir una terminal y correr el siguiente comando:
```
python3 --version
```

Si el comando anterior arroja un error, es necesario instalar **Python**. Si estás usando Ubuntu, y sólo quieres instalar la versión necesaria para este Bootcamp, puedes correr los siguientes comandos:
```sh
sudo apt update
sudo apt install python3.6
```

Si en vez de lo anterior, deseas personalizar tu instalación o instalar la versión más reciente de Python, puedes hacerlo desde la página oficial: [https://www.python.org/](https://www.python.org/).

2. Una vez instalado Python, correr el siguiente comando:
```sh
curl -fsSL "https://sui.dev/scripts/install_cli.py" | python3
```
> :information_source: Si el comando de arriba da error, es necesario instalar `curl`. Puedes hacerlo con los siguientes comandos:
> ```sh
> sudo apt update
> sudo apt install curl
>```

3. Verifica la instalación utilizando:
```sh
sui help
```

> :information_source: Si el comando de arriba da error, simplemente cierra tu terminal, abrela de nuevo y vuelve a intentar.

## Interactuando con el repositorio.

El repositorio está compuesto de varias carpetas con archivos para cada tutorial, simplemente navega a ellas usando `cd` y sigue las instrucciones dentro.</br></br>
Cada tutorial cuenta con un archivo `README.md` con instrucciones claras de cómo interactuar con ellos.