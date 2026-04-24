import React, { createContext, useContext, useState, useEffect } from 'react'

const defaultData = {
    info: {
        introduccion: "GIECOM es un grupo de investigación de la Universidad de la Amazonia dedicado al estudio y desarrollo en las áreas de Gestión del Conocimiento, Electrónica, Informática y Comunicaciones. Nuestro equipo multidisciplinario trabaja en proyectos que generan impacto real en la región amazónica y en la comunidad académica nacional e internacional.",
        mision: "GIECOM está comprometido con la generación de conocimiento científico y tecnológico, mediante el trabajo multidisciplinario en las áreas de gestión del conocimiento, comunicación, electrónica e informática, de tal manera que los resultados promuevan el crecimiento y formación de los investigadores, así como el desarrollo tecnológico en la región Amazónica, realizando alianzas estratégicas con diferentes empresas, las cuales se beneficien de nuestros logros alcanzados y de igual forma ayuden a la financiación de los diferentes proyectos a realizar.",
        vision: "Para el año 2030, GIECOM se consolidará como un grupo de investigación reconocido a nivel nacional e internacional en la generación de conocimiento en áreas de gestión del conocimiento, comunicación, electrónica e informática, contando con un personal altamente cualificado y generando proyectos multidisciplinarios que fortalezcan el desarrollo empresarial de la Región, promoviendo los proyectos que se desarrollan a las instituciones o empresas para un mutuo beneficio.",
    },
    proyectos: [
        { id: 1, icon: "💡", titulo: "Proyecto 1", descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.", año: "2024", estado: "En curso" },
        { id: 2, icon: "🤖", titulo: "Proyecto 2", descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.", año: "2024", estado: "En curso" },
        { id: 3, icon: "🌿", titulo: "Proyecto 3", descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.", año: "2023", estado: "Finalizado" },
        { id: 4, icon: "📡", titulo: "Proyecto 4", descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.", año: "2023", estado: "Finalizado" },
        { id: 5, icon: "🔐", titulo: "Proyecto 5", descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.", año: "2025", estado: "En curso" },
        { id: 6, icon: "📊", titulo: "Proyecto 6", descripcion: "Descripción breve del proyecto de investigación. Área temática y objetivos principales.", año: "2025", estado: "En curso" },
    ],
    miembros: [
        { id: 1, nombre: "Nombre Apellido", rol: "Director del Grupo",      categoria: "Investigador Senior",   correo: "correo@uniamazonia.edu.co", cvlac: "#", foto: null },
        { id: 2, nombre: "Nombre Apellido", rol: "Co-investigador",          categoria: "Investigador Asociado", correo: "correo@uniamazonia.edu.co", cvlac: "#", foto: null },
        { id: 3, nombre: "Nombre Apellido", rol: "Co-investigador",          categoria: "Investigador Asociado", correo: "correo@uniamazonia.edu.co", cvlac: "#", foto: null },
        { id: 4, nombre: "Nombre Apellido", rol: "Estudiante de Maestría",   categoria: "Joven Investigador",    correo: "correo@uniamazonia.edu.co", cvlac: "#", foto: null },
        { id: 5, nombre: "Nombre Apellido", rol: "Estudiante de Pregrado",   categoria: "Semillero",             correo: "correo@uniamazonia.edu.co", cvlac: "#", foto: null },
        { id: 6, nombre: "Nombre Apellido", rol: "Estudiante de Pregrado",   categoria: "Semillero",             correo: "correo@uniamazonia.edu.co", cvlac: "#", foto: null },
    ],
}

const SiteContext = createContext(null)

export const SiteProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem('giecom_data')
            return saved ? JSON.parse(saved) : defaultData
        } catch {
            return defaultData
        }
    })

    useEffect(() => {
        localStorage.setItem('giecom_data', JSON.stringify(data))
    }, [data])

    const updateInfo     = (info)      => setData(d => ({ ...d, info }))
    const updateProyectos = (proyectos) => setData(d => ({ ...d, proyectos }))
    const updateMiembros  = (miembros)  => setData(d => ({ ...d, miembros }))

    return (
        <SiteContext.Provider value={{ data, updateInfo, updateProyectos, updateMiembros }}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSite = () => useContext(SiteContext)
