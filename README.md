# Vue 3 + TypeScript + Vite

# Herobrary

Herobrary es una aplicación web interactiva que permite a los usuarios explorar, seleccionar y enfrentar personajes de superhéroes en batallas dinámicas. La aplicación está construida con Vue 3, Pinia, Vuetify y utiliza una API pública para obtener datos de superhéroes.

## Características

- **Explorar personajes**: Lista de superhéroes con filtros avanzados (búsqueda, raza, alineación, editor).
- **Detalles de personajes**: Información detallada sobre cada superhéroe, incluyendo estadísticas, biografía y conexiones.
- **Selección de personajes**: Selecciona dos personajes para enfrentarlos en una batalla.
- **Batallas interactivas**: Participa en combates dinámicos con mecánicas de zonas de poder y combate.
- **Historial de batallas**: Visualiza el historial de batallas ganadas y perdidas.
- **Estadísticas del jugador**: Seguimiento de victorias y derrotas.

## Tecnologías utilizadas

- **Frontend**: Vue 3, Vuetify 3
- **Estado global**: Pinia
- **Ruteo**: Vue Router
- **API**: [Superhero API](https://akabab.github.io/superhero-api/)
- **Estilos**: Vuetify y CSS personalizado

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/herobrary.git
   cd herobrary
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre la aplicación en tu navegador en [http://localhost:5173](http://localhost:5173).

## Estructura del proyecto

```
├── src\
│   ├── assets\                           # Recursos estáticos como imágenes, íconos, etc.
│   │   ├── images\                       # Imágenes utilizadas en la aplicación
│   │   │   ├── logo.webp                 # Logo de la aplicación
│   │   │   ├── splat.svg                 # Imagen decorativa
│   │   │   └── ...                       # Otros recursos de imágenes
│   ├── components\                       # Componentes reutilizables de Vue
│   │   ├── character\                    # Componentes relacionados con los personajes
│   │   │   ├── Character.vue             # Componente principal para mostrar un personaje
│   │   │   ├── CharacterBarFight.vue     # Barra de combate interactiva
│   │   │   ├── CharacterBarStat.vue      # Barra de estadísticas de un personaje
│   │   │   ├── CharacterCard.vue         # Tarjeta de presentación de un personaje
│   │   │   ├── CharacterPowerBar.vue     # Barra de poder de un personaje
│   │   │   ├── CharacterStats.vue        # Estadísticas detalladas de un personaje
│   │   │   └── ...                       # Otros componentes relacionados con personajes
│   │   ├── Countdown.vue                 # Temporizador para las batallas
│   │   ├── PlayerStats.vue               # Componente para mostrar estadísticas del jugador
│   │   ├── SelectedCharacters.vue        # Componente para seleccionar personajes
│   │   └── ...                           # Otros componentes reutilizables
│   ├── models\                           # Modelos de datos en TypeScript
│   │   ├── battle.model.ts               # Modelo para las batallas
│   │   ├── character.model.ts            # Modelo para los personajes
│   │   └── ...                           # Otros modelos
│   ├── router\                           # Configuración de rutas de Vue Router
│   │   └── index.ts                      # Archivo principal de configuración de rutas
│   ├── services\                         # Servicios para consumir APIs
│   │   └── api.ts                        # Lógica para interactuar con la API de superhéroes
│   ├── stores\                           # Tiendas de estado global usando Pinia
│   │   ├── countdownStore.ts             # Tienda para manejar el estado del temporizador
│   │   ├── selectedCharactersStore.ts    # Tienda para manejar los personajes seleccionados
│   │   ├── statsPlayerStore.ts           # Tienda para manejar las estadísticas del jugador
│   │   └── ...                           # Otras tiendas
│   ├── views\                            # Vistas principales de la aplicación
│   │   ├── List.vue                      # Vista para listar personajes
│   │   ├── Detail.vue                    # Vista para mostrar detalles de un personaje
│   │   ├── Fight.vue                     # Vista para las batallas entre personajes
│   │   └── ...                           # Otras vistas
│   ├── App.vue                           # Componente raíz de la aplicación
│   ├── main.ts
```

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run lint`: Ejecuta el linter para verificar errores de estilo y sintaxis.

## API utilizada

La aplicación consume datos de la [Superhero API](https://akabab.github.io/superhero-api/), que proporciona información detallada sobre superhéroes, incluyendo estadísticas, biografía y más.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz un push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

## Autor

Desarrollado por [Tu Nombre o Usuario de GitHub].
