<template>
  <v-container>
    <v-card>
      <v-card-title>{{ character.name }}</v-card-title>
      <v-card-subtitle>{{ character.biography['full-name'] }}</v-card-subtitle>
      <v-card-text>
        <v-img :src="character.image.url" alt="Character Image"></v-img>
        <p>{{ character.description }}</p>
        <!-- Aquí puedes agregar más detalles del personaje -->
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      character: {},
    };
  },
  mounted() {
    const characterId = this.$route.params.id;
    // Aquí debes obtener los datos del personaje según el ID
    // Esto puede ser una llamada a tu API o usar datos locales
    this.fetchCharacterDetails(characterId);
  },
  methods: {
    fetchCharacterDetails(id) {
      // Lógica para obtener los detalles del personaje usando el ID
      // Por ejemplo, si tienes una API pública, aquí podrías hacer la solicitud
      // Con los datos de Marvel o alguna otra fuente.
      
      // Aquí solo un ejemplo con datos mock:
      const characters = [
        { id: 1, name: 'Iron Man', biography: { 'full-name': 'Tony Stark' }, image: { url: 'https://example.com/ironman.jpg' }, description: 'Genius, billionaire, playboy, philanthropist.' },
        { id: 2, name: 'Captain America', biography: { 'full-name': 'Steve Rogers' }, image: { url: 'https://example.com/captainamerica.jpg' }, description: 'Super soldier who fights for justice.' },
        // Agrega más personajes
      ];
      
      this.character = characters.find(c => c.id == id);
    }
  }
}
</script>