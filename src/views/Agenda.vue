<template>
<div id="app">
    <div style="margin: 10px; display: flex; justify-content: space-between; padding: 20px;">
        <div style="align-self: center; margin-left: 20px;">
            <v-btn v-if="contador%2===0" @click="Ordenar()"> A->Z</v-btn>
            <v-btn v-if="contador%2!=0" @click="Ordenar()"> Z->A</v-btn>
        </div>
        <v-btn @click="$router.push('/citas')">Citas</v-btn>
        <div>

            <!-- ------------------------------------------------------------------------------------- -->
            <v-row justify="center">
                <v-dialog
                v-model="dialogAdd"
                persistent
                max-width="600px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="mx-2"
                    fab
                    >
                    <v-icon dark>
                        mdi-account-plus
                    </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">Nuevo contacto</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col>
                            <v-text-field
                            label="Nombre*"
                            required
                            v-model="NuevoContacto.name"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                            label="E-mail*"
                            required
                            v-model="NuevoContacto.email"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                            label="Telefono*"
                            v-model="NuevoContacto.telephone"
                            required
                            ></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    <small>* indica campos requeridos</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogAdd = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="AddContacto(NuevoContacto)"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
            <!-- ------------------------------------------------------------------------------------- -->
        </div>
    </div>
  <v-app id="inspire">
    
    <v-card
      width="100%"
      class="mx-auto"
    >
     
  
      <v-list three-line>
        <template v-for="(item, index) in contactosBD">
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
            :key="item.name"
          >
            <v-list-item-avatar>
              <v-img style="border: 1px solid; border-color: white;" :src="item.avatar"></v-img>
            </v-list-item-avatar>
  
            <v-list-item-content style="display: flex; flex-direction: column; align-content: space-between; height: 80px;">
                <div>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.telephone"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
                </div>
                <div class="text-xs-right">
                    <v-row style="margin: 5px;"
                        align="center"
                        justify="space-around"
                    >
                        <v-btn color="warning" style="margin: 5px;" @click="EliminarContacto(item._id)">
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
                                    @click="getContactoid(item._id)"
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
                                <span class="text-h5">Editar Contacto</span>
                                </v-card-title>
                                <v-card-text>
                                <v-container>
                                    <v-row>
                                    <v-col>
                                        <v-text-field
                                        label="Nombre*"
                                        required
                                        v-model="editar.name"
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        label="E-mail*"
                                        v-model="editar.email"
                                        required
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        label="Telefono*"
                                        v-model="editar.telephone"
                                        required
                                        outlined
                                        ></v-text-field>
                                    </v-col>
                                    </v-row>
                                </v-container>
                                <small>* indica campo requerido</small>
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
                                    @click="EditarContacto(editar)"
                                >
                                    Save
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        <!-- -------------------------------------------------------------------- -->
                        <div style="margin:5px; color: white;">|  </div>
                        <!-- ---------------------------------------------------------------------- -->
                        <div style="margin:5px;">
                        <v-row justify="center">
                            <v-dialog
                            v-model="dialogCita"
                            persistent
                            max-width="600px"
                            >
                            <template v-slot:activator="{ on, attrs }" >
                                <v-btn 
                                color="#DBE1F7" 
                                v-bind="attrs"
                                @click="getCitaid(item._id)"
                                v-on="on">
                                
                                    <v-icon left>
                                        mdi-calendar-month
                                    </v-icon>
                                    Cita
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
                                    @click="dialogCita = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="AddCita(Cita)"
                                >
                                    Save
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </v-row>
                        </div>
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
        contactosBD:[],
        editar:{},
        NuevoContacto:{},
        Cita:{
            name_contact:"",
            issue:"",
            date:""
        },
        dialog: false,
        dialogAdd: false,
        dialogCita: false,
        contador: 0,
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: Date.now()
        } 
    },
    mounted(){
        this.getContactos(0)
    },
    methods:{
        async getContactos(i){
            var num = 100
            this.contactosBD.push(
                        {header: "Contactos"},
                        { divider: true, inset: true })
            
            axios.get('/contact/contacto')
                .then( (res)=>{
                    //Ordenar-----------------------
                    if(i === 1)
                    {
                        var aux = res.data
                        function SortArray(x, y){
                            if (x.name > y.name) {return -1;}
                            if (x.name < y.name) {return 1;}
                            return 0;
                        }
                        var s = aux.sort(SortArray);
                    }
                    if(i===0){
                        var aux = res.data
                        function SortArray(x, y){
                            if (x.name < y.name) {return -1;}
                            if (x.name > y.name) {return 1;}
                            return 0;
                        }
                        var s = aux.sort(SortArray);
                    }
                        
                        console.log(s);
                    //-----------------------------
                    s.forEach(item => {
                    this.contactosBD.push({
                    _id: item._id,
                    name: item.name,
                    email: item.email,
                    telephone: item.telephone,
                    __v:item.__v,
                    avatar:`https://picsum.photos/id/${num}/200/300`
                    },{ divider: true, inset: true });
                    num = num + 10
                    })
                })
                .catch( (e)=>{
                    console.log('error'+e)
                })

            console.log(this.contactos)
        },

        async Ordenar(){
            this.contactosBD=[]
            if(this.contador%2===0){
                this.getContactos(0)
            }
            else{
                this.getContactos(1)
            }
            
            this.contador = this.contador + 1
        },

        async getContactoid(id){
            axios.get(`/contact/contacto/${id}`)
                .then( (res)=>{
                    console.log(res.data)
                    this.editar = res.data
                })
                .catch( (e)=>{
                    console.log('error'+e)
                })
        },

        async getCitaid(id){
            axios.get(`/contact/contacto/${id}`)
                .then( (res)=>{
                    console.log(res.data)
                    this.Cita.name_contact = res.data.name
                })
                .catch( (e)=>{
                    console.log('error'+e)
                })
        },

        async EliminarContacto(id){
            var eliminar = confirm("¿Desea eliminar este contacto?...");
            if(eliminar)
            {
                axios.delete(`/contact/contacto/${id}`)
                .then( res => {
                    let index = this.contactosBD.findIndex(item => item._id === res.data._id)
                    this.contactosBD.splice(index, 1)
                })
                .catch( e => {
                    console.log('error' + e)
                })
            }
        },

        async EditarContacto(item){
            axios.put(`/contact/contacto/${item._id}`, item)
                .then(res => {
                    this.contactosBD = []
                    this.dialog = false
                    console.log(res)
                    this.getContactos(0)
                })
                .catch( e =>{
                    console.log('error' + e)
                })
        },

        async AddContacto(item){
            console.log(item)
            axios.post('/contact/nuevo-contacto', item)
                .then(res => {
                    this.dialogAdd = false
                    this.NuevoContacto = {}
                    this.contactosBD = []
                    this.getContactos(0)
                })
                .catch( e => {
                    console.log('error'+ e)
                })
                
            },

            async AddCita(item){
                item.date = this.picker
                axios.post('/cita/nueva-cita', item)
                .then(res => {
                    this.dialogCita = false
                })
                .catch( e => {
                    console.log('error'+ e)
                })
                
                },
            }
    }



</script>


<style>

</style>