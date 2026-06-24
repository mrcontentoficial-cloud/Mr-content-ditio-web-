# Contenido de clientes

Aquí va el contenido audiovisual (diseños y reels) de cada cliente.

## Estructura

```
public/clientes/
  dml-medica/
    disenos/   <- imágenes (.jpg, .png, .webp)
    reels/     <- videos (.mp4, .webm) — ideal vertical 9:16
  emjo/
    disenos/
    reels/
  dr-jorge/
    disenos/
    reels/
```

## Cómo agregar contenido nuevo

1. Copia el archivo dentro de la carpeta del cliente y categoría correcta
   (por ejemplo `public/clientes/dml-medica/reels/reel-01.mp4`).
2. Abre `src/lib/clients.ts` y agrega una entrada en el arreglo `items`
   de la categoría correspondiente. La ruta empieza con `/clientes/...`
   (sin `public`):

   ```ts
   // Diseño (imagen)
   { type: "image", src: "/clientes/dml-medica/disenos/post-01.jpg", title: "Campaña de invierno" }

   // Reel (video) — el "poster" es la portada y es opcional pero recomendado
   { type: "video", src: "/clientes/dml-medica/reels/reel-01.mp4", poster: "/clientes/dml-medica/reels/reel-01.jpg", title: "Nuevo tratamiento" }
   ```

3. Guarda. El sitio mostrará el contenido automáticamente en
   `/clientes/<slug>` y aparecerá en la sección "Nuestros clientes".

> Mientras una categoría no tenga archivos, esa pestaña se oculta. Si el
> cliente no tiene nada todavía, la página muestra un mensaje de "Muy pronto".
