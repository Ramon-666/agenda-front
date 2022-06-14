<template>
<div id="app">
    <div style="margin: 10px; display: flex; justify-content: space-between; padding: 20px;">
        <div style="align-self: center; margin-left: 20px;">
            <v-btn v-if="contador%2===0" @click="Ordenar()"> A->Z</v-btn>
            <v-btn v-if="contador%2!=0" @click="Ordenar()"> Z->A</v-btn>
        </div>
        <v-btn @click="$router.push('/')">Contactos</v-btn>
        <div>

            <!-- ------------------------------------------------------------------------------------- -->
            
            <!-- ------------------------------------------------------------------------------------- -->
        </div>
    </div>
  <v-app id="inspire">
    
    <v-card
      width="100%"
      class="mx-auto"
    >
     
  
      <v-list three-line>
        <template v-for="(item, index) in citasDB">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>
  
          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>
  
          <v-list-item
            v-else
            :key="item.name_contact"
          >
  
            <v-list-item-content style="display: flex; flex-direction: column; align-content: space-between; height: 80px;">
                <div>
                    <v-list-item-title v-html="item.name_contact"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.issue"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="item.date"></v-list-item-subtitle>
                </div>
                <div class="text-xs-right">
                    <v-row style="margin: 5px;"
                        justify="space-around"
                    >
                        <v-btn color="warning" style="margin: 5px;" @click="EliminarCita(item._id)">
                            <v-icon left>
                                mdi-delete
                            </v-icon>
                            Delete
                        </v-btn>
                        
                        <!-- -------------------------------------------------------------------- -->
                        
                            <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="600px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    tile
                                    color="success"
                                    style="margin: 5px;"
                                    @click="getCitaid(item._id)"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    <v-icon left>
                                        mdi-pencil
                                    </v-icon>
                                    Edit
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                <span class="text-h5">Agregar cita</span>
                                </v-card-title>
                                <v-card-text>
                                <v-container>
                                    <v-row>
                                   <v-col>
                                        <input type="text" readonly v-model="Cita.name_contact">
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        label="Asunto*"
                                        v-model="Cita.issue"
                                        required
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-date-picker 
                                        v-model="picker"
                                        ></v-date-picker>
                                    </v-col>
                                    </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="EditarCita(Cita)"
                                >
                                    Save
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        <!-- -------------------------------------------------------------------- -->


                        <!-- ---------------------------------------------------------------------- -->

                        <!-- ---------------------------------------------------------------------- -->
                    </v-row>
                </div>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-app>
    
</div>
</template>

<script>
import axios from 'axios'
export default {

    data () {
        return {        
        citasDB:[],
        editar:{},
        NuevoContacto:{},
        Cita:{
            name_contact:"",
            issue:"",
            date:""
        },
        dialog: false,
        contador: 0,
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: Date.now()
        } 
    },
    mounted(){
        this.getCitas(0)
    },
    methods:{
        async getCitas(i){
            
            this.citasDB.push(
                        {header: "Citas"},
                        { divider: true, inset: true })
            
            axios.get('/cita/cita')
                .then( (res)=>{
                    //Ordenar-----------------------
                    if(i === 1)
                    {
                        var aux = res.data
                        function SortArray(x, y){
                            if (x.name_contact > y.name_contact) {return -1;}
                            if (x.name_contact < y.name_contact) {return 1;}
                            return 0;
                        }
                        var s = aux.sort(SortArray);
                    }
                    if(i===0){
                        var aux = res.data
                        function SortArray(x, y){
                            if (x.name_contact < y.name_contact) {return -1;}
                            if (x.name_contact > y.name_contact) {return 1;}
                            return 0;
                        }
                        var s = aux.sort(SortArray);
                    }
                        
                        console.log(s);
                    //-----------------------------
                    s.forEach(item => {
                    this.citasDB.push({
                    _id: item._id,
                    name_contact: item.name_contact,
                    issue: item.issue,
                    date: item.date,
                    __v:item.__v,
                    },{ divider: true, inset: true });
                    })
                })
                .catch( (e)=>{
                    console.log('error'+e)
                })
        },

        async Ordenar(){
            this.citasDB=[]
            if(this.contador%2===0){
                this.getCitas(0)
            }
            else{
                this.getCitas(1)
            }
            
            this.contador = this.contador + 1
        },

        async getCitaid(id){
            axios.get(`/cita/cita/${id}`)
                .then( (res)=>{
                    console.log(res.data)
                    this.Cita = res.data
                })
                .catch( (e)=>{
                    console.log('error'+e)
                })
        },

        async EliminarCita(id){
            var eliminar = confirm("¿Desea eliminar esta cita?...");
            if(eliminar)
            {
                axios.delete(`/cita/cita/${id}`)
                .then( res => {
                    let index = this.citasDB.findIndex(item => item._id === res.data._id)
                    this.citasDB.splice(index, 1)
                })
                .catch( e => {
                    console.log('error' + e)
                })
            }
        },
        async EditarCita(item){
            item.date = this.picker
            axios.put(`/cita/cita/${item._id}`, item)
                .then(res => {
                    this.citasDB = []
                    this.dialog = false
                    console.log(res)
                    this.getCitas(0)
                })
                .catch( e =>{
                    console.log('error' + e)
                })
        },
    }
}


</script>