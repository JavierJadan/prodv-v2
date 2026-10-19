# Integración de la API v2

Base configurada:

```text
https://laravel-dashboard-prodv-production.up.railway.app/api/v2
```

La app consume:

- `GET /leagues?per_page=100`
- `GET /leagues/{leagueId}/overview`
- `GET /leagues/{leagueId}/matches`
- `GET /leagues/{leagueId}/matches/{matchId}`
- `GET /leagues/{leagueId}/standings`
- `GET /leagues/{leagueId}/top-scorers`

Todas las solicitudes agregan automáticamente `Accept: application/json`. El esquema de
autorización se selecciona con `apiAuthMode` en los archivos `environment`:

```http
Accept: application/json
```

## Modos disponibles

- `public`: no envía credenciales. Es la opción recomendada para resultados, tablas y calendarios
  públicos, combinada con caché CDN.
- `firebase`: obtiene el ID token de la sesión Firebase y lo envía como `Authorization: Bearer`.
  Laravel debe verificar la firma, audiencia, emisor y vencimiento con Firebase Admin SDK.
- `sanctum`: compatibilidad transitoria con la API documentada actualmente, que exige un token
  `prodv:read` generado en Filament.

El formulario de token se retiró de la interfaz. Para conservar una sesión de desarrollo que ya
tenía un token, la clave local `prodv-api-token` sigue siendo compatible. No se debe publicar un
token Sanctum compartido dentro del bundle móvil.

## Autenticación de usuarios

Firebase Authentication se ocupa del registro, ingreso, recuperación de contraseña, persistencia
de sesión y verificación del correo. La app deportiva continúa siendo consultable sin iniciar
sesión.

Para activar Firebase también en Laravel:

1. Instalar/configurar Firebase Admin SDK en el servidor con credenciales de servicio, nunca en la
   app Ionic.
2. Crear middleware que valide el ID token enviado en `Authorization` y obtenga su `uid`.
3. Asociar ese `uid` con el perfil local solo si se necesitan favoritos o notificaciones.
4. Cambiar `apiAuthMode` de `sanctum` a `firebase` en ambos ambientes.
5. Mantener públicas y cacheables las respuestas comunes. Reservar autenticación para datos del
   usuario.

Hasta completar esos pasos, cambiar el modo a `firebase` hará que la API actual responda `401`, ya
que Sanctum no puede interpretar directamente un ID token de Firebase.
