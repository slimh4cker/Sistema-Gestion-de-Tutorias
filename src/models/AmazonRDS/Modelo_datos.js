import {DataTypes, Sequelize, TEXT} from 'sequelize'
import {sequelize} from '../../utils/database_connection.js'
import { AlumnoModel } from './AlumnoModel.js'
import { AsesorModel } from './AsesorModel.js'
import { modelo_cuenta_asesor } from './Modelo_cuentas.js'

// Definición del modelo de la tabla contenido_apoyo

const modelo_contenido_apoyo = sequelize.define('modelo_contenido_apoyo',{
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        defaultValue: false,
        autoIncrement: true
    },
    asesor_id : {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: AsesorModel,
            key: 'id'
        }
        
    },

    titulo: {
        type: DataTypes.STRING(150),
        allowNull: true,
        defaultValue: null
    },

    descripcion:{
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },

    url_video: {
        type: DataTypes.STRING(2083),
        allowNull: false,
        defaultValue: null
    },

    fecha_subida: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'contenido_apoyo',
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

const modelo_encuesta = sequelize.define('modelo_encuesta', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    solicitud_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
    },
    link_encuesta: {
        type: DataTypes.STRING(2083),
        allowNull: true,
        defaultValue: null,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    },
},
{
    tableName: 'encuestas',
    timestamps: false,
    createdAt: false,
    updatedAt: false
}
)


export{modelo_encuesta}
export{modelo_contenido_apoyo}