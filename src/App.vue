<template>
  <v-app>
    <v-app-bar
      app
      color="#3a2880"
      dark
      style="justify-content: space-between; display: flex;"
    >
    
    <img style="height: 100%; margin: 20px;" src="./assets/logo_agenda.png" alt="">
    Agenda personal
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    
    <v-footer style="background-color: #3a2880; color: white;">
      <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center"
        style="width: 100%;"
      >
      <v-card-text>
         <v-simple-table style="background-color: #3a2880; color: white;" >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="color:white;">
                  Nombre
                </th>
                <th class="text-left" style="color: white;">
                  Correo
                </th>
                <th class="text-left" style="color: white;">
                  NUA
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in integrantes"
                :key="item.nombre"
              >
                <td class="text-left">{{ item.nombre }}</td>
                <td class="text-left">{{ item.correo }}</td>
                <td class="text-left">{{ item.NUA }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    integrantes:[
      {
        nombre:"Ángel Ramón Sierra Sánchez",
        NUA:"146763",
        correo:"ar.sierrasanchez@ugto.mx"
      },
      {
        nombre:"Joel Salvador Martínez Jiménez",
        NUA:"392556",
        correo:"js.martinezjimenez@ugto.mx"
      },
      {
        nombre:"Sergio Alberto Zavala Camacho",
        NUA:"146737",
        correo:"sa.zavalacamacho@ugto.mx"
      },
      {
        nombre:"Bernardo Andrés Bivian Hernández",
        NUA:"146479",
        correo:"ba.bivianhernandez@ugto.mx"
      }
    ]
  }),
};
</script>
