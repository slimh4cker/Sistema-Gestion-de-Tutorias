import {DataTypes, INTEGER, Sequelize} from 'sequelize'
import {sequelize} from '../../utils/database_connection.js'
import { modelo_cuenta_asesor, modelo_cuenta_estudiante, modelo_cuenta_administrador } from './Modelo_cuentas.js'

// Definición de la tabla solicitudes
const modelo_solicitud = sequelize.define('modelo_solicitud',{
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        defaultValue: false,
        autoIncrement: true
    },
    estudiante_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        references: {
            model:modelo_cuenta_estudiante,
            key: 'id'
        }
    },
    asesor_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
            model: modelo_cuenta_asesor,
            key: 'id'
        }
    },
    tema: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null
    },
    observaciones: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    fecha_limite: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    modalidad: {
        type: DataTypes.ENUM('en_linea', 'presencial'),
        allowNull: true,
        defaultValue: null
    },
    nivel_urgencia: {
        type: DataTypes.ENUM('baja', 'media', 'alta'),
        allowNull: true,
        defaultValue: ('media')
    }, 
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: true,
        defaultValue: ('activo')
    },
},
{
    tableName: 'solicitudes',
    createdAt: false,
    updatedAt: false
})


// Asociación uno a muchos entre Solicitudes y Asesores
modelo_cuenta_asesor.hasMany(modelo_solicitud, {foreignKey: 'asesor_id'})
modelo_solicitud.belongsTo(modelo_cuenta_asesor, {foreignKey: 'asesor_id'})

// Asociación uno a muchos entre Solicitudes y Estudiantes
modelo_cuenta_estudiante.hasMany(modelo_solicitud, {foreignKey: 'estudiante_id'})
modelo_solicitud.belongsTo(modelo_cuenta_estudiante, {foreignKey: 'estudiante_id'})

const modelo_asesorias = sequelize.define('modelo_asesorias',{
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        defaultValue: false,
        autoIncrement: true
    },
    solicitud_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        references: {
            model:modelo_solicitud,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'asignada', 'en _proceso', 'terminada', 'aplazada'),
        allowNull: true,
        defaultValue: 'pendiente'
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    fecha_atencion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    hora_inicial: {
        type: DataTypes.TIME,
        allowNull: true,
        defaultValue: null
    },
    hora_final: {
        type: DataTypes.TIME,
        allowNull: true,
        defaultValue: null
    },
    total_horas: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: null
    },
    porcentaje_cumplimiento: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: null
    },
    requiere_sesiones: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: null
    }

},
{
    tableName: 'asesorias',
    createdAt: false,
    updatedAt: false
}
)
modelo_solicitud.hasMany(modelo_asesorias, {foreignKey: 'solicitud_id'})
modelo_asesorias.belongsTo(modelo_solicitud, {foreignKey: 'solicitud_id'})

const modelo_mensajes = sequelize.define('modelo_mensajes',{
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        defaultValue: null,
        autoIncrement: true
    },
    id_asesoria: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
            model: modelo_asesorias,
            key: 'id'
        },
    },
    id_emisor: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
    },
    emisor_tipo: {
        type: DataTypes.ENUM('alumno', 'asesor'),
        allowNull: true,
        defaultValue: null
    },
    id_receptor: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null
    },
    receptor_tipo: {
        type: DataTypes.ENUM('alumno', 'asesor'),
        allowNull: true,
        defaultValue: null
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null
    },
    estado: {
        type: DataTypes.ENUM('enviado', 'leido'),
        defaultValue: ('enviado'),
        allowNull: false
    },
    fecha_envio: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
},
{
    tableName: 'mensajes',
    createdAt: false,
    updatedAt: false,
})

// Asosiación de la tabla mensajes con solicitudes
modelo_asesorias.hasMany(modelo_mensajes, {foreignKey: 'id_asesoria'})
modelo_asesorias.belongsTo(modelo_asesorias, {foreignKey: 'id_asesoria'})

// tabla de relaciones solicitudes - administradores

const modelo_solicitudes_administradores = sequelize.define('modelo_solicitudes_administradores', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        defaultValue: null,
        autoIncrement: true
    },
    solicitud_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        references: {
            model: modelo_solicitud,
            key: 'id'
        }
    },
    administrador_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        references: {
            model: modelo_cuenta_administrador,
            key: 'id'
        }
    },
    tipo_accion: {
        type: DataTypes.ENUM('creacion', 'resignacion'),
        allowNull: true,
        defaultValue: null
    },
    fecha_accion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: false
    }, 
},
{
    tableName: 'solicitudes_administradores',
    createdAt: false,
    updatedAt: false
}
)

// Definición muchos a muchos entre las tablas solicitudes y administradores
modelo_solicitud.belongsToMany(modelo_cuenta_administrador, {through: modelo_solicitudes_administradores, foreignKey: 'solicitud_id'})
modelo_cuenta_administrador.belongsToMany(modelo_solicitud, {through: modelo_solicitudes_administradores, foreignKey: 'administrador_id'})


// Definición del modelo de la tabla reportes

const modelo_reportes = sequelize.define('modelo_reportes',{
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        defaultValue: false,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    fecha_generacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    total_asesorias: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null
    },
    total_atendidas: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null
    },
    total_pendientes: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null
    },
    promedio_tiempo_respuesta: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: null
    },
    promedio_tiempo_resolucion: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: null
    },
    promedio_cumplimiento: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: null
    },
    total_horas_asesoria: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true,
        defaultValue: null
    },
    filtro_fecha_inicio: {
        type: DataTypes.NOW,
        allowNull: true, 
        defaultValue: null,
    },
    filtro_fecha_fin: {
        type: DataTypes.NOW,
        allowNull: true, 
        defaultValue: null,
    },
    filtro_area_especializacion: {
        type: DataTypes.STRING(255),
        allowNull: true, 
        defaultValue: null,
    },
    filtro_asesor_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null
    },
    filtro_asesor_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: true,
        defaultValue: ('activo')
    }
},
{
    tableName: 'reportes',
    createdAt: false,
    updatedAt: false
})



// Relación muchos a muchos en la tabla asesorias y reportes
const modelo_asesorias_reportes = sequelize.define('modelo_asesorias_reportes',{
    asesorias_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: modelo_asesorias,
            key: 'id'
        }
    },
    reportes_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: modelo_reportes,
            key: 'id'
        }
    }
},
{
    tableName: 'asesorias_reportes',
    createdAt: false,
    updatedAt: false
}
)

modelo_asesorias.belongsToMany(modelo_reportes, {through: modelo_asesorias_reportes, foreignKey: 'asesorias_id'})
modelo_reportes.belongsToMany(modelo_asesorias, {through: modelo_asesorias_reportes, foreignKey: 'reportes_id'})


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
            model: modelo_cuenta_asesor,
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
        defaultValue: null
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: true,
        defaultValue: ('activo')
    }
},{
    tableName: 'contenido_apoyo',
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

modelo_cuenta_asesor.hasMany(modelo_contenido_apoyo, {foreignKey: 'asesor_id'})
modelo_contenido_apoyo.belongsTo(modelo_cuenta_asesor,{foreignKey: 'asesor_id'})


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
        defaultValue: null
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: true, 
        defaultValue: ('activo')
    }
},
{
    tableName: 'encuestas',
    timestamps: false,
    createdAt: false,
    updatedAt: false
}
)

const modelo_preguntas_encuestas = sequelize.define('modelo_preguntas_encuestas', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    encuesta_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
    },
    pregunta: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    }, 
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: true,
        defaultValue: ('activo')
    }
},
{
    tableName: 'preguntas_encuestas',
    timestamps: false,
    createdAt: false,
    updatedAt: false
})
modelo_encuesta.hasMany(modelo_preguntas_encuestas, {foreignKey: 'encuesta_id'})
modelo_preguntas_encuestas.belongsTo(modelo_encuesta, {foreignKey: 'encuesta_id'})


// Definición del modelo Calendario

const modelo_calendario = sequelize.define('modelo_calendario', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true,
        defaultValue: null
    },
    solicitud_id: {
        type:DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: false,
        references: {
            model: modelo_solicitud,
            key: 'id'
        }
    },
    fecha_sesion: {
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: null
    },
    evento_calendario_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null
    },
    recordatorio_enviado: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: null
    },
    fecha_recordatorio: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull:false,
        defaultValue: ('activo')
    }
},
{
    tableName: 'calendario',
    createdAt:false,
    updatedAt:false
}
)
// Definición de uno a muchos de calendario a solicitud
modelo_solicitud.hasMany(modelo_calendario, {foreignKey: 'solicitud_id'})
modelo_calendario.belongsTo(modelo_solicitud, {foreignKey: 'solicitud_id'})

// Definición del modelo Notificaciones
const modelo_notificaciones = sequelize.define('modelo_notificaciones',{
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        defaultValue: null, 
        autoIncrement: true
    },
    solicitud_id: {
        type:DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: false,
        references: {
            model: modelo_solicitud,
            key: 'id'
        }
    },
    destinatario_tipo: {
        type: DataTypes.ENUM('estudiante', 'asesor', 'administrador'),
        allowNull: true,
        defaultValue: false
    },
    destinatario_id: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: null
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull:true,
        defaultValue: null
    },
    fecha_envio: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
},
{
    tableName: 'notificaciones',
    createdAt: false,
    updatedAt: false
})

// Definición de uno a muchos de notificaciones a solicitud
modelo_solicitud.hasMany(modelo_notificaciones, {foreignKey: 'solicitud_id'})
modelo_notificaciones.belongsTo(modelo_solicitud, {foreignKey: 'solicitud_id'})

export { modelo_asesorias }
export { modelo_calendario }
export { modelo_contenido_apoyo }
export { modelo_encuesta }
export { modelo_mensajes }
export { modelo_notificaciones }
export { modelo_preguntas_encuestas}
export { modelo_reportes }
export { modelo_asesorias_reportes }
export { modelo_solicitud}
export { modelo_solicitudes_administradores }