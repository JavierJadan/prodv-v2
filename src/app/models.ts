

export interface User{
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
}

export interface DataUser{
    uid: string;
    email: string;
    celular: string;
    password: string;
    referencia: string;
}

export interface Referencia{
    nombre: string;
    correo: string;
    total: number;
    uid: string;
}


export interface Equipos{
    uid: string;
    nombre: string;
    escudo: string;
    grupo: string;
    puntos: number;
    p_j: number;
    p_g: number;
    p_e: number;
    p_p: number;
    g_f: number;
    g_c: number;
    d_g: number;
}

export interface Encuentro{

    uid: string;
    fechae: string;
    tipo: string;
    fecha: string;
    grupo: string;
    uid_e1: string;
    uid_e2: string;
    estado: string;
    res_e1: number;
    res_e2: number;
    escudo_e1: string;
    escudo_e2: string;
    nombre_e1: string;
    nombre_e2: string;

}


export interface EncuentroPrueba{
    uid: string;
    fechae: string;
    numero: number;
    tipo: string;
    fecha: Date;
    grupo: string;
    uid_e1: string;
    uid_e2: string;
    estado: string;
    res_e1: number;
    res_e2: number;
    escudo_e1: string;
    escudo_e2: string;
    nombre_e1: string;
    nombre_e2: string;

}


export interface Referencias{

    uid: string;
    nombre: string;
    correo: string;

}

export interface Campeonatos{

    uid: string;
    nombre: string;
    fecha: Date;
    tipo: string;
    estado: string;
    lugar: string;
    grupos: number;
    fases: number;

}
export interface fase{
    num: number;
    text: string;
}