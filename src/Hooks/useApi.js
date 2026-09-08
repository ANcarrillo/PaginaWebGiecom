// src/hooks/useApi.js
// Centraliza todas las llamadas al backend

// ── URL DEL BACKEND ──────────────────────────────────────────────────────
// DEV local:   'http://localhost:4000/api'
// PRODUCCIÓN:  cambia por la IP o dominio donde corre el servidor
//              ej: 'http://158.220.123.106:4000/api'
//              ej: 'https://api.giecom.uniamazonia.edu.co/api'
const BASE = 'https://giecom.com.co/PaginaPrincipalBack/api'

const getToken = () => sessionStorage.getItem('giecom_token')

const headers = (auth = false) => ({
    'Content-Type': 'application/json',
    ...(auth && { Authorization: `Bearer ${getToken()}` }),
})

export const api = {
    // Auth
    login: (usuario, password) =>
        fetch(`${BASE}/login`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ usuario, password }),
        }).then(r => r.json()),


    // Proyectos
    getProyectos: () =>
        fetch(`${BASE}/proyectos`, { headers: headers() }).then(r => r.json()),

    crearProyecto: (data) =>
        fetch(`${BASE}/proyectos`, {
            method: 'POST',
            headers: headers(true),
            body: JSON.stringify(data),
        }).then(r => r.json()),

    editarProyecto: (id, data) =>
        fetch(`${BASE}/proyectos/${id}`, {
            method: 'PUT',
            headers: headers(true),
            body: JSON.stringify(data),
        }).then(r => r.json()),

    eliminarProyecto: (id) =>
        fetch(`${BASE}/proyectos/${id}`, {
            method: 'DELETE',
            headers: headers(true),
        }).then(r => r.json()),
    // Subir imagen — devuelve { url }
    uploadImagen: (file) => {
        const formData = new FormData()
        formData.append('imagen', file)
        return fetch(`${BASE}/upload`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${getToken()}` },
            body: formData,
        }).then(r => r.json())
    },

    // Miembros
    getMiembros: () =>
        fetch(`${BASE}/miembros`, { headers: headers() }).then(r => r.json()),

    crearMiembro: (data) =>
        fetch(`${BASE}/miembros`, {
            method: 'POST',
            headers: headers(true),
            body: JSON.stringify(data),
        }).then(r => r.json()),

    editarMiembro: (id, data) =>
        fetch(`${BASE}/miembros/${id}`, {
            method: 'PUT',
            headers: headers(true),
            body: JSON.stringify(data),
        }).then(r => r.json()),

    eliminarMiembro: (id) =>
        fetch(`${BASE}/miembros/${id}`, {
            method: 'DELETE',
            headers: headers(true),
        }).then(r => r.json()),
}