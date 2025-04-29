function inicializarSolicitarAsesoria() {
    const btnSolicitar = document.getElementById('btn-solicitar-asesoria');
    const asesoriaContainer = document.getElementById('asesoria-container') || document.querySelector('.main-content-container');

    if (btnSolicitar && asesoriaContainer) {
        btnSolicitar.addEventListener('click', function (e) {
            e.preventDefault();
            asesoriaContainer.innerHTML = `
            <div class="white-card">
                <div class="form-asesoria">
                    <h4 class="fw-bold">Solicitar asesoría</h4>
                    <p class="form-description mb-4">
                        Por favor, completa el siguiente formulario para solicitar una asesoría.
                    </p>
                    <form>
                        <div class="form-group">
                            <label class="form-label">Curso:</label>
                            <select class="form-select mb-3">
                                <option selected disabled>Selecciona un curso</option>
                                <option>Matemáticas Avanzadas</option>
                                <option>Física Cuántica</option>
                                <option>Programación Web</option>
                                <option>Literatura Contemporánea</option>
                                <option>Historia del Arte</option>
                                <option>Biología Molecular</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Requisitos particulares:</label>
                            <textarea class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Fecha límite:</label>
                            <input type="date" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Modalidad:</label>
                            <select class="form-select">
                                <option selected>Presencial</option>
                                <option>Virtual</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nivel de urgencia:</label>
                            <select class="form-select">
                                <option selected>Urgente</option>
                                <option>Normal</option>
                            </select>
                        </div>
                        <div class="d-flex justify-content-end mt-4">
                            <button type="submit" class="btn btn-primary btn-submit">Enviar solicitud</button>
                        </div>
                    </form>
                </div>
            </div>
            `;
        });
    }
}
