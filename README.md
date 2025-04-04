# Vue 3 + TypeScript + Vite

# Herobrary

Herobrary is an interactive web application that allows users to explore, select, and pit superhero characters against each other in dynamic battles. The application is built with Vue 3, Pinia, Vuetify, and uses a public API to fetch superhero data.

## Features

- **Explore Characters**: Browse a list of superheroes with advanced filters (search, race, alignment, publisher).
- **Character Details**: View detailed information about each superhero, including stats, biography, and connections.
- **Character Selection**: Select two characters to face off in a battle.
- **Interactive Battles**: Engage in dynamic battles with power zones and combat mechanics.
- **Battle History**: View the history of won and lost battles.
- **Player Statistics**: Track wins and losses.

## Technologies Used

- **Frontend**: Vue 3, Vuetify 3
- **Global State Management**: Pinia
- **Routing**: Vue Router
- **API**: [Superhero API](https://akabab.github.io/superhero-api/)
- **Styling**: Vuetify and custom CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cfabregatrodriguez/herobrary.git
   cd herobrary
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── public\                              # Public assets served directly
│   ├── favicon.ico                      # Favicon for the application
│   └── ...                              # Other public assets
├── src\
│   ├── assets\                          # Static resources like images, styles, etc.
│   │   ├── images\                      # Images used in the application
│   │   │   ├── logo.webp                # Application logo
│   │   │   ├── splat.svg                # Decorative image
│   │   │   └── ...                      # Other image resources
│   │   ├── styles\                      # Global and reusable styles
│   │   │   ├── abstracts\               # SCSS variables and mixins
│   │   │   │   ├── _variables.scss      # SCSS variables
│   │   │   ├── components\              # Component-specific styles
│   │   │   │   ├── _Character.scss      # Styles for Character component
│   │   │   │   ├── _CharacterBarFight.scss
│   │   │   │   ├── _CharacterPowerBar.scss
│   │   │   │   ├── _CountDown.scss
│   │   │   │   ├── _PlayerStats.scss
│   │   │   │   ├── _SelectedCharacters.scss
│   │   │   ├── layout\                  # Layout styles
│   │   │   │   ├── _grid.scss           # Grid layout styles
│   │   │   ├── utilities\               # Utility styles
│   │   │   │   ├── _animation.scss      # Animations
│   │   │   │   ├── _decoration.scss     # Decorations
│   │   │   ├── vuetify\                 # Vuetify-specific overrides
│   │   │   │   ├── _overrides.scss      # Vuetify style overrides
│   │   │   ├── main.scss                # Main SCSS file
│   ├── components\                      # Reusable Vue components
│   │   ├── character\                   # Components related to characters
│   │   │   ├── Character.vue            # Main component to display a character
│   │   │   ├── CharacterBarFight.vue    # Interactive combat bar
│   │   │   ├── CharacterBarStat.vue     # Character stats bar
│   │   │   ├── CharacterCard.vue        # Character presentation card
│   │   │   ├── CharacterPowerBar.vue    # Character power bar
│   │   │   ├── CharacterStats.vue       # Detailed character stats
│   │   │   └── ...                      # Other character-related components
│   │   ├── Countdown.vue                # Timer for battles
│   │   ├── Dialogs.vue                  # Dialogs for help, settings, and history
│   │   ├── PlayerStats.vue              # Component to display player stats
│   │   ├── SelectedCharacters.vue       # Component to select characters
│   │   └── ...                          # Other reusable components
│   ├── composables\                     # Reusable Vue 3 composition functions
│   │   ├── useBarFightBar.ts            # Logic for managing the fight bar
│   │   ├── useBarFightControls.ts       # Logic for fight controls
│   │   ├── useBarFightZones.ts          # Logic for fight zones
│   │   └── ...                          # Other composables
│   ├── models\                          # TypeScript data models
│   │   ├── battle.model.ts              # Model for battles
│   │   ├── character.model.ts           # Model for characters
│   │   └── ...                          # Other models
│   ├── plugins\                         # Vue plugins
│   │   ├── vuetify.ts                   # Vuetify plugin configuration
│   │   └── ...                          # Other plugins
│   ├── router\                          # Vue Router configuration
│   │   └── index.ts                     # Main routing configuration file
│   ├── services\                        # Services to consume APIs
│   │   ├── api.ts                       # Logic to interact with the superhero API
│   │   ├── api.test.ts                  # Tests for API services
│   │   └── ...                          # Other services
│   ├── stores\                          # Global state stores using Pinia
│   │   ├── countdownStore.ts            # Store to manage the timer state
│   │   ├── selectedCharactersStore.ts   # Store to manage selected characters
│   │   ├── statsPlayerStore.ts          # Store to manage player stats
│   │   └── ...                          # Other stores
│   ├── views\                           # Main application views
│   │   ├── List.vue                     # View to list characters
│   │   ├── Detail.vue                   # View to display character details
│   │   ├── Fight.vue                    # View for character battles
│   │   └── ...                          # Other views
│   ├── App.vue                          # Root component of the application
│   ├── main.ts                          # Entry point of the application
│   └── shims-vue.d.ts                   # TypeScript shims for Vue files
├── tests\                               # Unit and integration tests
│   ├── components\                      # Tests for components
│   │   ├── PlayerStats.test.ts          # Test for PlayerStats component
│   │   └── ...                          # Other component tests
│   ├── services\                        # Tests for services
│   │   ├── api.test.ts                  # Test for API services
│   │   └── ...                          # Other service tests
│   └── ...                              # Other test files
├── vite.config.ts                       # Vite configuration file
├── package.json                         # Project dependencies and scripts
├── tsconfig.json                        # TypeScript configuration file
└── README.md                            # Project documentation
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds an optimized production version.
- `npm run lint`: Runs the linter to check for style and syntax errors.

## API Used

The application consumes data from the [Superhero API](https://akabab.github.io/superhero-api/), which provides detailed information about superheroes, including stats, biography, and more.

## Contributions

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Developed by [cfabregatrodriguez].
