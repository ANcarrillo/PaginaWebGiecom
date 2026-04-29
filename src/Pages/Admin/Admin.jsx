import React, { useState, useEffect, useRef } from 'react'
import { api } from '../../hooks/useApi'

const INACTIVIDAD_MS = 5 * 60 * 1000 // 5 minutos
import { useSite } from '../../context/SiteContext'
import "./Admin.css"

const ICONOS  = ["💡","🤖","🌿","📡","🔐","📊","🔬","🧬","💻","🛰️","🧪","📱"]
const ESTADOS = ["En curso", "Finalizado"]

// ══════════════════════════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════════════════════════
function Login({ onLogin }) {
    const [form, setForm]     = useState({ usuario: '', password: '' })
    const [error, setError]   = useState('')
    const [loading, setLoading] = useState(false)
    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async () => {
        setError(''); setLoading(true)
        const res = await api.login(form.usuario, form.password)
        setLoading(false)
        if (res.token) { sessionStorage.setItem('giecom_token', res.token); onLogin() }
        else setError(res.error || 'Credenciales incorrectas')
    }

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-header">
                    <h1>Panel GIECOM</h1>
                    <p>Ingresa tus credenciales para continuar</p>
                </div>
                <div className="form-group">
                    <label>Usuario</label>
                    <input name="usuario" value={form.usuario} onChange={handle} placeholder="AdminGiecom" onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
                </div>
                {error && <p className="login-error">{error}</p>}
                <button className="btn-save btn-full" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════════════════════════════
// MODAL CONFIRMAR
// ══════════════════════════════════════════════════════════════════════════
function ConfirmModal({ mensaje, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <p>{mensaje}</p>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
                    <button className="btn-delete" onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════════════════════════════
// SECCIÓN INFORMACIÓN
// ══════════════════════════════════════════════════════════════════════════
function SeccionInfo() {
    const { info, updateInfo } = useSite()
    const [form, setForm] = useState(info)
    const [saved, setSaved] = useState(false)

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSave = () => {
        updateInfo(form)
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    return (
        <div className="admin-section">
            <div className="section-head">
                <h2>Información general</h2>
                <p>Edita la introducción, misión y visión del grupo.</p>
            </div>

            <div className="form-group">
                <label>Introducción</label>
                <textarea name="introduccion" rows={4} value={form.introduccion} onChange={handle} />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Misión</label>
                    <textarea name="mision" rows={7} value={form.mision} onChange={handle} />
                </div>
                <div className="form-group">
                    <label>Visión</label>
                    <textarea name="vision" rows={7} value={form.vision} onChange={handle} />
                </div>
            </div>

            <div className="form-footer">
                <button className="btn-save" onClick={handleSave}>
                    {saved ? '✓ Guardado' : 'Guardar cambios'}
                </button>
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════════════════════════════
// SECCIÓN PROYECTOS
// ══════════════════════════════════════════════════════════════════════════
const emptyProyecto = { nombre: '', año: new Date().getFullYear().toString(), estado: 'En curso', informacion: '', link: '', icono: '💡' }

function ProyectoForm({ proyecto, onSave, onCancel, loading }) {
    const [form, setForm] = useState(proyecto)
    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    return (
        <div className="item-form">
            <div className="form-row">
                <div className="form-group small">
                    <label>Ícono</label>
                    <select name="icono" value={form.icono} onChange={handle}>
                        {["💡","🤖","🌿","📡","🔐","📊","🔬","🧬","💻","🛰️","🧪","📱"].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Nombre del proyecto *</label>
                    <input name="nombre" value={form.nombre} onChange={handle} placeholder="Nombre del proyecto" />
                </div>
                <div className="form-group small">
                    <label>Año *</label>
                    <input name="año" value={form.año} onChange={handle} placeholder="2025" />
                </div>
                <div className="form-group small">
                    <label>Estado</label>
                    <select name="estado" value={form.estado} onChange={handle}>
                        <option value="En curso">En curso</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label>Información</label>
                <textarea name="informacion" rows={3} value={form.informacion} onChange={handle} placeholder="Descripción del proyecto..." />
            </div>
            <div className="form-group">
                <label>Link (descarga o página)</label>
                <input name="link" value={form.link} onChange={handle} placeholder="https://..." />
            </div>
            <div className="item-form-actions">
                <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
                <button className="btn-save" disabled={loading || !form.nombre.trim() || !form.año} onClick={() => onSave(form)}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </div>
    )
}

function SeccionProyectos() {
    const [proyectos, setProyectos]     = useState([])
    const [cargando, setCargando]       = useState(true)
    const [editando, setEditando]       = useState(null)
    const [agregando, setAgregando]     = useState(false)
    const [confirmId, setConfirmId]     = useState(null)
    const [loadingForm, setLoadingForm] = useState(false)
    const [toast, setToast]             = useState('')

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

    useEffect(() => {
        api.getProyectos()
            .then(d => setProyectos(Array.isArray(d) ? d : []))
            .finally(() => setCargando(false))
    }, [])

    const handleCrear  = async (form) => {
        setLoadingForm(true)
        const res = await api.crearProyecto(form)
        setLoadingForm(false)
        if (res.id) { setProyectos([...proyectos, res]); setAgregando(false); showToast('✓ Proyecto agregado') }
        else showToast('Error: ' + (res.error || 'desconocido'))
    }

    const handleEditar = async (form) => {
        setLoadingForm(true)
        const res = await api.editarProyecto(editando.id, form)
        setLoadingForm(false)
        if (res.id) { setProyectos(proyectos.map(p => p.id === res.id ? res : p)); setEditando(null); showToast('✓ Proyecto actualizado') }
        else showToast('Error: ' + (res.error || 'desconocido'))
    }

    const handleEliminar = async (id) => {
        await api.eliminarProyecto(id)
        setProyectos(proyectos.filter(p => p.id !== id))
        setConfirmId(null)
        showToast('✓ Proyecto eliminado')
    }

    if (cargando) return <p style={{ padding: '2rem', color: '#6b7c6e' }}>Cargando proyectos...</p>

    return (
        <div className="admin-section">
            <div className="section-head">
                <h2>Proyectos</h2>
                <p>Agrega, edita o elimina los proyectos del grupo.</p>
            </div>

            <div className="items-list">
                {proyectos.map(p => (
                    <div key={p.id}>
                        {editando?.id === p.id ? (
                            <ProyectoForm
                                proyecto={{ ...p, link: p.link || '', informacion: p.informacion || '' }}
                                onSave={handleEditar}
                                onCancel={() => setEditando(null)}
                                loading={loadingForm}
                            />
                        ) : (
                            <div className="item-row">
                                <span className="item-icon">{p.icono}</span>
                                <div className="item-info">
                                    <strong>{p.nombre}</strong>
                                    <span>{p.informacion}</span>
                                </div>
                                <div className="item-meta">
                                    <span className={`estado-badge ${p.estado === 'En curso' ? 'en-curso' : 'finalizado'}`}>{p.estado}</span>
                                    <span className="año-tag">📅 {p.año}</span>
                                </div>
                                <div className="item-actions">
                                    <button className="btn-edit" onClick={() => { setAgregando(false); setEditando(p) }}>Editar</button>
                                    <button className="btn-delete" onClick={() => setConfirmId(p.id)}>Eliminar</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {agregando ? (
                <ProyectoForm proyecto={emptyProyecto} onSave={handleCrear} onCancel={() => setAgregando(false)} loading={loadingForm} />
            ) : (
                <button className="btn-add" onClick={() => { setEditando(null); setAgregando(true) }}>+ Agregar proyecto</button>
            )}

            {toast && <p className="save-toast">{toast}</p>}
            {confirmId && <ConfirmModal mensaje="¿Eliminar este proyecto?" onConfirm={() => handleEliminar(confirmId)} onCancel={() => setConfirmId(null)} />}
        </div>
    )
}

// ══════════════════════════════════════════════════════════════════════════
// SECCIÓN MIEMBROS
// ══════════════════════════════════════════════════════════════════════════
const emptyMiembro = { nombre: '', rol: '', correo: '', telefono: '', cvlac: '', imagen: '' }

function MiembroForm({ miembro, onSave, onCancel, loading }) {
    const [form, setForm]           = useState(miembro)
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview]     = useState(miembro.imagen || null)
    const fileRef                   = useRef(null)

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleFile = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setPreview(URL.createObjectURL(file))
        setUploading(true)
        const res = await api.uploadImagen(file)
        setUploading(false)
        if (res.url) setForm(f => ({ ...f, imagen: res.url }))
        else alert('Error al subir la imagen')
    }

    return (
        <div className="item-form">
            <div className="form-row">
                <div className="form-group">
                    <label>Nombre completo *</label>
                    <input name="nombre" value={form.nombre} onChange={handle} placeholder="Nombre Apellido" />
                </div>
                <div className="form-group">
                    <label>Rol *</label>
                    <input name="rol" value={form.rol} onChange={handle} placeholder="Director del Grupo" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Correo electrónico</label>
                    <input name="correo" value={form.correo} onChange={handle} placeholder="correo@uniamazonia.edu.co" />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input name="telefono" value={form.telefono} onChange={handle} placeholder="3001234567" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>CvLAC (URL)</label>
                    <input name="cvlac" value={form.cvlac} onChange={handle} placeholder="https://scienti.minciencias.gov.co/..." />
                </div>
            </div>

            <div className="foto-upload-row">
                <div className="foto-drop-zone" onClick={() => fileRef.current.click()}>
                    {preview
                        ? <img src={preview} alt="preview" className="foto-preview" />
                        : <div className="foto-placeholder"><span>📷</span><p>Haz clic para subir foto</p><small>JPG, PNG o WEBP · máx. 3 MB</small></div>
                    }
                    {uploading && <div className="foto-uploading">Subiendo...</div>}
                </div>
                <div className="foto-actions">
                    <button type="button" className="btn-edit" onClick={() => fileRef.current.click()}>
                        {preview ? 'Cambiar foto' : 'Subir foto'}
                    </button>
                    {preview && (
                        <button type="button" className="btn-delete" onClick={() => {
                            setPreview(null); setForm(f => ({ ...f, imagen: '' })); fileRef.current.value = ''
                        }}>
                            Quitar foto
                        </button>
                    )}
                </div>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            <div className="item-form-actions">
                <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
                <button className="btn-save" disabled={loading || uploading || !form.nombre.trim() || !form.rol.trim()} onClick={() => onSave(form)}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </div>
    )
}

function SeccionMiembros() {
    const [miembros, setMiembros]   = useState([])
    const [cargando, setCargando]   = useState(true)
    const [editando, setEditando]   = useState(null)
    const [agregando, setAgregando] = useState(false)
    const [confirmId, setConfirmId] = useState(null)
    const [loadingForm, setLoadingForm] = useState(false)
    const [toast, setToast]         = useState('')

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

    useEffect(() => {
        api.getMiembros()
            .then(d => setMiembros(Array.isArray(d) ? d : []))
            .finally(() => setCargando(false))
    }, [])

    const getInitials = (n) => n.split(" ").slice(0,2).map(x => x[0] || '').join("").toUpperCase()

    const handleCrear  = async (form) => {
        setLoadingForm(true)
        const res = await api.crearMiembro(form)
        setLoadingForm(false)
        if (res.id) { setMiembros([...miembros, res]); setAgregando(false); showToast('✓ Miembro agregado') }
        else showToast('Error al agregar')
    }

    const handleEditar = async (form) => {
        setLoadingForm(true)
        const res = await api.editarMiembro(editando.id, form)
        setLoadingForm(false)
        if (res.id) { setMiembros(miembros.map(m => m.id === res.id ? res : m)); setEditando(null); showToast('✓ Cambios guardados') }
        else showToast('Error al guardar')
    }

    const handleEliminar = async (id) => {
        await api.eliminarMiembro(id)
        setMiembros(miembros.filter(m => m.id !== id))
        setConfirmId(null)
        showToast('✓ Miembro eliminado')
    }

    if (cargando) return <p style={{ padding: '2rem', color: '#7f8c8d' }}>Cargando...</p>

    return (
        <div className="admin-section">
            <div className="section-head">
                <h2>Miembros</h2>
                <p>Agrega, edita o elimina los integrantes del grupo.</p>
            </div>

            <div className="items-list">
                {miembros.map(m => (
                    <div key={m.id}>
                        {editando?.id === m.id ? (
                            <MiembroForm miembro={{ ...m, imagen: m.imagen || '', cvlac: m.cvlac || '' }} onSave={handleEditar} onCancel={() => setEditando(null)} loading={loadingForm} />
                        ) : (
                            <div className="item-row">
                                <div className="miembro-mini-avatar">
                                    {m.imagen ? <img src={m.imagen} alt={m.nombre} /> : <span>{getInitials(m.nombre)}</span>}
                                </div>
                                <div className="item-info">
                                    <strong>{m.nombre}</strong>
                                    <span>{m.rol}</span>
                                </div>
                                <div className="item-meta">
                                    {m.correo   && <span className="meta-text">✉ {m.correo}</span>}
                                    {m.telefono && <span className="meta-text">📞 {m.telefono}</span>}
                                </div>
                                <div className="item-actions">
                                    <button className="btn-edit"   onClick={() => { setAgregando(false); setEditando(m) }}>Editar</button>
                                    <button className="btn-delete" onClick={() => setConfirmId(m.id)}>Eliminar</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {agregando ? (
                <MiembroForm miembro={emptyMiembro} onSave={handleCrear} onCancel={() => setAgregando(false)} loading={loadingForm} />
            ) : (
                <button className="btn-add" onClick={() => { setEditando(null); setAgregando(true) }}>+ Agregar miembro</button>
            )}

            {toast && <p className="save-toast">{toast}</p>}
            {confirmId && <ConfirmModal mensaje="¿Eliminar este miembro?" onConfirm={() => handleEliminar(confirmId)} onCancel={() => setConfirmId(null)} />}
        </div>
    )
}

// ══════════════════════════════════════════════════════════════════════════
// PÁGINA ADMIN
// ══════════════════════════════════════════════════════════════════════════
const tabs = [
    { id: 'info',      label: '📝 Información' },
    { id: 'proyectos', label: '🔬 Proyectos'   },
    { id: 'miembros',  label: '👥 Miembros'    },
]

const Admin = () => {
    const [autenticado, setAutenticado] = useState(!!sessionStorage.getItem('giecom_token'))
    const [tab, setTab] = useState('info')
    const timerRef = useRef(null)

    const cerrarSesion = () => {
        sessionStorage.removeItem('giecom_token')
        setAutenticado(false)
    }

    // Reinicia el temporizador en cada acción del usuario
    const resetTimer = () => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            cerrarSesion()
            alert('Sesión cerrada por inactividad')
        }, INACTIVIDAD_MS)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [])

    // Activar/desactivar el temporizador según autenticación
    useEffect(() => {
        if (!autenticado) return
        const eventos = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
        eventos.forEach(e => window.addEventListener(e, resetTimer))
        resetTimer()
        return () => {
            clearTimeout(timerRef.current)
            eventos.forEach(e => window.removeEventListener(e, resetTimer))
        }
    }, [autenticado])

    const handleLogout = () => cerrarSesion()

    if (!autenticado) return <Login onLogin={() => setAutenticado(true)} />

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="admin-header-inner">
                    <div>
                        <h1>Panel de administración</h1>
                        <p>Gestiona el contenido del sitio web de GIECOM</p>
                    </div>
                    <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </div>

            <div className="admin-tabs">
                {tabs.map(t => (
                    <button key={t.id} className={`admin-tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="admin-body">
                {tab === 'info'      && <SeccionInfo />}
                {tab === 'proyectos' && <SeccionProyectos />}
                {tab === 'miembros'  && <SeccionMiembros />}
            </div>
        </div>
    )
}

export default Admin