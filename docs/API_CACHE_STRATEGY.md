# Estrategia de caché de PRODV

## Cliente Ionic

- Una sola consulta alimenta todas las pantallas mediante `shareReplay`.
- El catálogo se conserva seis horas y los paquetes de campeonato cinco minutos.
- Partidos y detalles tienen ventanas más cortas de 60 y 30 segundos.
- Si no existe conexión, se utiliza la última copia disponible, aunque esté vencida.
- `apiCacheVersion` invalida respuestas antiguas cuando cambia el contrato JSON.
- `SportsDataService.refresh()` fuerza una actualización manual.

Los tiempos se configuran en los archivos `environment`. Para partidos en vivo conviene aplicar un
TTL de 15–30 segundos. Campeonatos, equipos y fases pueden usar 6–24 horas.

## API y CDN

La caché del dispositivo evita solicitudes repetidas del mismo usuario, pero no se comparte entre
usuarios. Para reducir el consumo total, la respuesta pública debe servirse detrás de una CDN o
reverse proxy con encabezados similares a estos:

```http
Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600, stale-if-error=86400
ETag: "hash-de-la-respuesta"
```

- `max-age`: caché del teléfono o navegador.
- `s-maxage`: caché compartida de CDN durante cinco minutos.
- `stale-while-revalidate`: entrega rápida mientras se actualiza la copia.
- `ETag`: permite responder `304 Not Modified` sin transferir todo el JSON.

Los endpoints autenticados o personalizados no deben marcarse como `public`.
