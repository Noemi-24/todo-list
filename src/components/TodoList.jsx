import React, { useReducer, useState} from "react";

const initialState = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  },
  {
    "userId": 1,
    "id": 11,
    "title": "vero rerum temporibus dolor",
    "completed": true
  },
  {
    "userId": 1,
    "id": 12,
    "title": "ipsa repellendus fugit nisi",
    "completed": true
  },
  {
    "userId": 1,
    "id": 13,
    "title": "et doloremque nulla",
    "completed": false
  },
  {
    "userId": 1,
    "id": 14,
    "title": "repellendus sunt dolores architecto voluptatum",
    "completed": true
  },
  {
    "userId": 1,
    "id": 15,
    "title": "ab voluptatum amet voluptas",
    "completed": true
  },
  {
    "userId": 1,
    "id": 16,
    "title": "accusamus eos facilis sint et aut voluptatem",
    "completed": true
  },
  {
    "userId": 1,
    "id": 17,
    "title": "quo laboriosam deleniti aut qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 18,
    "title": "dolorum est consequatur ea mollitia in culpa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 19,
    "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    "completed": true
  },
  {
    "userId": 1,
    "id": 20,
    "title": "ullam nobis libero sapiente ad optio sint",
    "completed": true
  }
];

function todosReducer(state, action) {
  switch (action.type) {
    case "added":
      return [...state, { id: Date.now(), title: action.title, completed: false }];
    case "toggled":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "deleted":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function TodoList(){
    const [todos, dispatch] = useReducer(todosReducer, initialState);
    const [title, setText] = useState('');

    const handleAdd = () => {
        if (!title.trim()) return;
        dispatch({type: "added", title});
        setText('');
    };

    return(
        <>
            <h1>Create Todo List</h1>
            <form>
                <input
                    value={title}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Add a todo..."
                />
                <button onClick={handleAdd}>Add</button>
            </form>
            <div>
                <ul>
                    {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch({ type: "toggled", payload: todo.id })}
                        />
                        <span>{todo.title}</span>
                        <button onClick={() => dispatch({ type: "edited", id: todo.id })}>Edit</button>
                        <button 
                            onClick={() => dispatch({ type: "deleted", payload: todo.id })}
                            disabled={!todo.completed}
                        >
                            Delete
                        </button>
                    </li>
                    ))}
                </ul>
                <p>{todos.filter((t) => !t.completed).length} of {todos.length} remaining</p>
            </div>
        </>
    );
}

export default TodoList;

{/* <div>
    <ul id="myUL">
        <!-- Example list items (these would typically be added dynamically with JavaScript) -->
        
        <input type="checkbox" defaultChecked={false} />
        <li>Hit the gym</li>
        <li class="checked">Pay bills</li>
        <li>Meet George</li>
        <button type="submit" className="add-btn" aria-label="Add task">
            Edit
        </button>
        <button type="submit" className="add-btn" aria-label="Add task">
            Remove
        </button>
        <button type="submit" className="add-btn" aria-label="Add task">
            Save
        </button>

    </ul>
</div> */}

// import React, { useReducer } from 'react';

// // 1. Reducer to manage tasks and editing state
// const taskReducer = (state, action) => {
//   switch (action.type) {
//     case 'START_EDIT':
//       return { ...state, editingTaskId: action.payload };
//     case 'SAVE_TASK':
//       return {
//         ...state,
//         tasks: state.tasks.map(task => 
//           task.id === action.payload.id ? { ...task, text: action.payload.newText } : task
//         ),
//         editingTaskId: null, // Exit editing mode
//       };
//     default:
//       return state;
//   }
// };

// const TaskList = () => {
//   const [state, dispatch] = useReducer(taskReducer, { 
//     tasks: [{ id: 1, text: 'Sample Task' }], 
//     editingTaskId: null 
//   });

//   return (
//     <div>
//       {state.tasks.map(task => (
//         <div key={task.id}>
//           {/* Toggle between input and text based on editing state */}
//           {state.editingTaskId === task.id ? (
//             <input defaultValue={task.text} id={`input-${task.id}`} />
//           ) : (
//             <span>{task.text}</span>
//           )}

//           {/* 3. Conditional Button Rendering */}
//           {state.editingTaskId === task.id ? (
//             <button onClick={() => dispatch({ 
//               type: 'SAVE_TASK', 
//               payload: { id: task.id, newText: document.getElementById(`input-${task.id}`).value } 
//             })}>
//               Save
//             </button>
//           ) : (
//             <>
//               <button onClick={() => dispatch({ type: 'START_EDIT', payload: task.id })}>
//                 Edit
//               </button>
//               <button>Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskList;
