<template>
  <v-app style="margin: 80px;">
    <v-app-bar
      app
      color="#0E4159"
      dark
      style="justify-content: center; display:flex; margin: 10px; height: 120px;"
    >
    
    <img style="height: 250%; margin: 40px; padding-top: 55px; font-family:;" src="./assets/logo_agenda.png" alt="">
    <h1 style="padding-top: 55px; font-family: Verdana, Geneva, Tahoma, sans-serif;">Tu Agenda Personal</h1>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    
    <v-footer style="background-color: #0E4159; color: white;">
      <v-card-text>
         <v-simple-table style="background-color: #0E4159; color: white;" >
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
        nombre:"Jesus Antonio Rodriguez Lopez",
        NUA:"146596",
        correo:"ja.rodriguezl@ugto.mx"
      }
    ]
  }),
};
</script>
