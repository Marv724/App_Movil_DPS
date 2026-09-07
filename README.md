# App_movil_Adm.Cine
# App_Movil_DPS

Desafío Práctico 2 de la materia **Diseño y Programación de Software Multiplataforma**.

---

##  Gestión de Ramas

* **`main`**: Rama Principal del proyecto. Esta rama solo contendrá el Desafío completado con todas sus condiciones y requerimientos.
* **`develop`**: Rama de testeo y desarrollo del proyecto. En esta rama se realizarán los cambios e integración de funcionalidades antes de pasar a la versión final.
* **`feature`**: Rama de características individuales. Para nombrarla, se deberá seguir el siguiente formato:
  * **Formato:** `feature_[Nombre_Del_Alumno]` (aquí cada uno de los miembros del equipo desarrollará individualmente una característica del proyecto).

>  **IMPORTANTE:**  
> En **`main`** y en **`develop`** **NO se hará `push` directamente**. Solo se podrá hacer `push` en las ramas `feature` propias.  
> Si hay que guardar o integrar cambios en `develop`, se debe hacer **Merge** de la rama `feature_[nombre]` a `develop`. En el caso de `main`, también se hará **Merge** pero de `develop` a `main`, únicamente si el proyecto ya está completamente desarrollado, testeado y verificado.

---

##  Guía de Instalación y Clonación del Proyecto

Sigue estos pasos detallados al clonar el repositorio por primera vez para evitar errores con dependencias o archivos faltantes:

### 1. Clonar el repositorio y acceder a la rama de trabajo
```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITO>

# Entrar a la carpeta del proyecto
cd App_movil_Adm.Cine

# Cambiar a tu rama feature individual
git checkout feature_[TuNombre]
```

### 2. Instalación de dependencias del proyecto

```bash
# Instalar todas las dependencias del archivo package.json
npm install
```


### 3. Comandos de ADB (Comprobación de Estado y Errores)

#Ruta de Variables de Entorno (PATH)
#Asegúrate de tener agregada la ruta de platform-tools de Android SDK en las Variables de Entorno de tu #sistema operativo:

#Windows (Ruta por defecto): C:\Users\<TuUsuario>\AppData\Local\Android\Sdk\platform-tools

```bash
# Listar los dispositivos/emuladores detectados
adb devices

# Reiniciar el servidor de ADB si la conexión no responde o se congela
adb kill-server
adb start-server

# Redireccionar el puerto de Metro/Expo al emulador
adb reverse tcp:8081 tcp:8081
```

### 4. Ejecución deL Servidor

```bash
# Iniciar el servidor de desarrollo Expo / Metro Bundler
npx expo start

# Iniciar directamente en un emulador o dispositivo Android conectado
npx expo start --android

# Iniciar limpiando la caché (útil si hay errores raros de compilación)
npx expo start -c

# Iniciar limpiando la caché y con la URL del servidor  (útil si hay errores de ejecución)
npx expo start --tunnel -c
```