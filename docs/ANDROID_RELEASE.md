# Compilar Android para Google Play

La configuración Android usa compileSdk y targetSdk 36, Android Gradle
Plugin 8.10.1 y Gradle 8.11.1. Usa JDK 17 (o JDK 20, disponible en este equipo)
como Gradle JDK; Java 11 y el runtime Java 25 de Android Studio no son
compatibles con esta combinación de herramientas.

Instala Android SDK Platform 36 desde el SDK Manager de Android Studio.

Desde la raíz del proyecto:

```powershell
npm run android:sync
npm run android:open
```

En Android Studio, sincroniza Gradle y prueba la app en un dispositivo o
emulador, incluyendo Android 16/API 36. Después usa Build > Generate Signed
App Bundle / APK > Android App Bundle, selecciona el keystore de subida
existente y la variante release. Guarda las contraseñas fuera del repositorio.

El código de versión está en android/app/build.gradle. Para cada nueva
subida debe ser mayor que los códigos usados en Google Play, incluidos otros
canales de prueba. La versión actual es 24 (24.0.0).

capacitor-legacy-compat.gradle adapta los manifests de los plugins Capacitor 4
a los namespaces requeridos por AGP 8. Genera copias en sus carpetas build,
sin editar node_modules ni los archivos que regenera cap sync.
