import React, { createContext, useContext, useState, useEffect } from 'react'

const defaultData = {
    introduccion: "GIECOM es un grupo de investigación de la Universidad de la Amazonia dedicado al estudio y desarrollo en las áreas de Gestión del Conocimiento, Electrónica, Informática y Comunicaciones. Nuestro equipo multidisciplinario trabaja en proyectos que generan impacto real en la región amazónica y en la comunidad académica nacional e internacional.",
    mision: "GIECOM está comprometido con la generación de conocimiento científico y tecnológico, mediante el trabajo multidisciplinario en las áreas de gestión del conocimiento, comunicación, electrónica e informática, de tal manera que los resultados promuevan el crecimiento y formación de los investigadores, así como el desarrollo tecnológico en la región Amazónica, realizando alianzas estratégicas con diferentes empresas, las cuales se beneficien de nuestros logros alcanzados y de igual forma ayuden a la financiación de los diferentes proyectos a realizar.",
    vision: "Para el año 2018, GIECOM se consolidará como un grupo de investigación reconocido a nivel nacional e internacional en la generación de conocimiento en áreas de gestión del conocimiento, comunicación, electrónica e informática, contando con un personal altamente cualificado y generando proyectos multidisciplinarios que fortalezcan el desarrollo empresarial de la Región, promoviendo los proyectos que se desarrollan a las instituciones o empresas para un mutuo beneficio.",
}

const SiteContext = createContext(null)

export const SiteProvider = ({ children }) => {
    const [info, setInfo] = useState(() => {
        try {
            const saved = localStorage.getItem('giecom_info')
            return saved ? JSON.parse(saved) : defaultData
        } catch {
            return defaultData
        }
    })

    useEffect(() => {
        localStorage.setItem('giecom_info', JSON.stringify(info))
    }, [info])

    const updateInfo = (nuevaInfo) => setInfo(nuevaInfo)

    return (
        <SiteContext.Provider value={{ info, updateInfo }}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSite = () => useContext(SiteContext)
