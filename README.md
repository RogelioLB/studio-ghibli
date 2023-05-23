**En Diciembre 1 del año 2022** el creador original de la API de libre uso de Studio Ghibli janaipakos([Ver perfil de github](https://github.com/janaipakos/)) anuncio que desafortunadamente su API ya no tendría soporte y ademas archivaría la app por problemas economicos. Sin embargo anuncio que podian sentirse libres de usar los datos que el recopilo y hostearlos en un servidor si se queria.

[Aqui pueden observar el repositorio de la API.](https://github.com/janaipakos/ghibliapi)

Yo tenía un proyecto que utilizaba esa misma API y por falta de una utilice los datos para crear la mia propia que tambien puedes utilizar.

Pueden acceder a ella a traves de esta url: [https://studio-ghibli-rho.vercel.app](https://studio-ghibli-rho.vercel.app/).

```bash
curl https://studio-ghibli-rho.vercel.app/api/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49
```

Al realizar esta peticion **GET** nos devolvería la siguiente respuesta.

```json
{
  "id": "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
  "title": "My Neighbor Totoro",
  "description": "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
  "director": "Hayao Miyazaki",
  "producer": "Hayao Miyazaki",
  "release_date": "1988",
  "rt_score": "93",
  ...
}
```

Actualmente solo tiene los Endpoints: (La idea es acabarla y tener todos los endpoints originales)

* /api/films
  * Devuelve toda la info de todas las peliculas de Studio Ghibli
* /api/films/[id]
  * Devuelve toda la info de una sola pelicula dependiendo el id


---

¿Quieres apoyarme con este proyecto? Puedes hacer una PR en el repositorio en [Github](https://github.com/RogelioLB/studio-ghibli).


