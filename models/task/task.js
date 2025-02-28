class Task {
    constructor(id, titulo, descripcion, estado = false) {
        this.id = id; 
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}

module.exports = Task;
