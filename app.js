const diccionario = {
    "computadora": ["ordenador", "procesador", "computador", "calculadora"], "tecnología": ["ciencia", "conocimiento", "técnica"],
    "persona": ["humano", "gente", "individuo", "sujeto", "ser"], "aprendizaje": ["formación", "educación", "estudio", "enseñanza", "instrucción"]
  };
  
  const busquedaSinonimo = () => {
    const text = document.getElementById('textArea').value;
    const busquedaSinonimo = document.getElementById('busquedaSinonimo').value.trim().toLowerCase();
  
    if (!diccionario.hasOwnProperty(busquedaSinonimo)) {
      Swal.fire({
        icon: 'error',
        title: 'Sin coincidencias',
        text: `La palabra "${busquedaSinonimo}" no se encuentra en la lista del diccionario.`
      });
      return;
    }
  
    const regex = new RegExp(`\\b${busquedaSinonimo}\\b`, 'gi');
    const matches = text.match(regex);
    const coincidencias = matches ? matches.length : 0;
  
    if (coincidencias === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No se encontraron coincidencias',
        text: `No se encontraron coincidencias de la palabra "${busquedaSinonimo}".`
      });
    } else {
      document.getElementById('coincidencias').value = coincidencias;
      fillReplaceOptions(busquedaSinonimo);
    }
  }
  
  const fillReplaceOptions = (palabra) => {
    const select = document.getElementById('opcionesReemplazo');
    select.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';
    
    diccionario[palabra].forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });
  
    select.disabled = false;
    
    select.addEventListener('change', function() {
      const selecOpcion = this.value;
      reemplazarP(palabra, selecOpcion);
    });
  }
  
  const reemplazarP = (palabraInicial, nuevaPalabra) => {
    Swal.fire({
      title: '¿Deseas realizar el reemplazo?',
      text: `Reemplazar "${palabraInicial}" con "${nuevaPalabra}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reemplazar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const textArea = document.getElementById('textArea');
        const regex = new RegExp(`\\b${palabraInicial}\\b`, 'gi');
        const updatedText = textArea.value.replace(regex, nuevaPalabra);
        textArea.value = updatedText;
        
        Swal.fire({
          title: 'Reemplazo realizado',
          text: `La palabra "${palabraInicial}" fue reemplazada por "${nuevaPalabra}".`,
          icon: 'success'
        });
      }
    });
  }
  
  document.getElementById('btn-busqueda').addEventListener('click', busquedaSinonimo);
  

  
