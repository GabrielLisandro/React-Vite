import ListGroup from 'react-bootstrap/ListGroup';
import '../../src/App.css';
import { TaskItem } from './TaskItem';

/* 
Componente de Lista de Tareas (TaskList):
Este componente deberá mostrar la lista de tareas.
Recibirá como propiedades la lista de tareas y funciones para gestionar eventos
relacionados con las tareas (por ejemplo, marcar como completada, eliminar, etc.).
Cada tarea debe representarse mediante un componente TaskItem. 

- Eventos en Componente de Lista (TaskList):
Implementar eventos que permitan al usuario interactuar con cada tarea (marcar
como completada, eliminar, etc.).
Estos eventos deberán modificar el estado principal (tasks)
*/

//El componente recibe el arreglo y las funciones para actualizar y eliminar
function TaskList({ arreglo, onActualizarTarea, onEliminarTarea, onEditarTarea}) {

    //utilizamos "Tareas" para enviar las propiedades a TaskItem y listar las tareas individuales posteriormente con un ListGroup
    const Tareas = ({ id, nombre, completado, editarTarea }) => {

        return (
            <ListGroup.Item >
                <TaskItem id={id} 
                nombre={nombre} 
                completado={completado} 
                actualizarTarea={onActualizarTarea} 
                eliminarTarea={onEliminarTarea} 
                editarTarea={onEditarTarea} />
            </ListGroup.Item >
        )
    }

    return (
        <>
            <ListGroup variant="flush" className='mt-5'>
                {/* Recorrido del arreglo para mostrar las tareas en una lista */}
                {arreglo.map((item) => (<Tareas key={item.id} id={item.id} nombre={item.nombre} completado={item.completado} actualizarTarea={onActualizarTarea} />))}
            </ListGroup>
        </>
    );
}
export default TaskList;
