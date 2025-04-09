import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/database_connection.js"; 

//Definicion del modelo de la tabla 'adminstradores'
const modelo_cuenta_administrador = sequelize.define('modelo_cuenta_administrador',{
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: null,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
    },
    estado: {
        type: DataTypes.ENUM("activo", "inactivo"),
        allowNull: true,
        defaultValue: 'activo'
    }
},
    {tableName: 'administradores',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

// Definición del modelo de la tabla 'asesores'
const modelo_cuenta_asesor = sequelize.define('modelo_cuenta_asesor',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
    },
    area_especializacion: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null
    },
    disponibilidad: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: true,
        defaultValue: 'activo'
    }
},
{ tableName: 'asesores',
    timestamps: false,
    createdAt: false,
    updatedAt: false
}
)

// Definición del modelo de la tabla 'estudiantes'
const modelo_cuenta_estudiante = sequelize.define('modelo_cuenta_estudiante', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: null,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: true,
        defaultValue: 'activo'
    }
},
    { tableName: 'estudiantes',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
)

export {modelo_cuenta_estudiante};
export {modelo_cuenta_administrador};
export {modelo_cuenta_asesor};