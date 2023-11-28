import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './Componentes/TaskList'
import TaskForm from './Componentes/TaskForm'

/* Crear una aplicación web utilizando React que permita gestionar una lista de tareas. La
aplicación deberá hacer uso de componentes funcionales, el hook useState para el manejo del
estado, el hook useEffect para realizar efectos secundarios, y eventos para interactuar con el
usuario.

Estado Principal (tasks):
- Utilizar el hook useState en el componente principal para gestionar el estado de la lista
de tareas.
Cada tarea debe ser un objeto con propiedades como id, nombre, y completada.

- Efectos con useEffect:
Efecto de Actualización (useEffect en el componente principal):
Utilizar useEffect para realizar una acción (por ejemplo, mostrar un mensaje) cuando el
estado de la lista de tareas cambie.
*/

function App() {

  //en este arreglo se iran guardando y extrayendo los datos desde y hacia el local storage
  const [arreglo, setArreglo] = useState([])

  //en esta funcion recibimos el nombre de la tarea desde TaskForm, el id lo asignamos en relacion al tamaño del array para q no se repita.
  const onAgregarTarea = (val) => {
    const nuevaTarea = {

      id: arreglo.length,
      nombre: val,
      completado: false
    }
    setArreglo([...arreglo, nuevaTarea])

    //Almacenamiento de la nueva tarea + el array en su estado previo en Local Storage, uso de stringify para convertirlo en cadena 
    localStorage.setItem('tareasGuardadas', JSON.stringify([...arreglo, nuevaTarea]))
  }

  //función para guardar tareas modificadas en el arreglo y en el localStorage
  const actualizarYGuardar = (nuevasTareas) => {
    setArreglo(nuevasTareas);
    localStorage.setItem('tareasGuardadas', JSON.stringify(nuevasTareas));
  }

  // actualiza la tarea con el ID proporcionado mediante un mapeo del arreglo, corresponde al switch en TaskItem 
  const onActualizarTarea = (id, completado) => {
    const nuevasTareas = arreglo.map((tarea) =>
      tarea.id === id ? { ...tarea, completado } : tarea
    )
    actualizarYGuardar(nuevasTareas)
  }

  //elimina la tarea seleccionada
  const OnEliminarTarea = (id) => {
    const nuevasTareas = arreglo.filter((tarea) => tarea.id !== id);
    actualizarYGuardar(nuevasTareas)
  }

  //Uso de useEffect para recuperar las tareas desde el local storage y almacenarlas en el arreglo
  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareasGuardadas')) || [];
    setArreglo(tareasGuardadas);
  }, []);


  const onEditarTarea = (id, nuevoNombre) => {
    console.log(nuevoNombre);
    const nuevasTareas = arreglo.map((tarea) =>
      tarea.id === id ? { ...tarea, nombre: nuevoNombre } : tarea
    );
    console.log(nuevasTareas);
    actualizarYGuardar(nuevasTareas);
  };

  return (
    <>
      <h3>Lista de Tareas</h3>
      <TaskForm agregarTarea={onAgregarTarea} />
      <TaskList arreglo={arreglo} onActualizarTarea={onActualizarTarea} onEliminarTarea={OnEliminarTarea} onEditarTarea={onEditarTarea}/>
    </>
  )
}
export default App
