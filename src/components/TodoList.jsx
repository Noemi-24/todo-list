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
      return [action.payload, ...state]; //Shows newtodo first then array of todos
    case "toggled":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "deleted":
      return state.filter((todo) => todo.id !== action.payload);
    case 'saved':
      return state.map(todo => 
          todo.id === action.payload.id ? { ...todo, title: action.payload.newTitle } : todo
        );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function TodoList(){
    const [todos, dispatch] = useReducer(todosReducer, initialState);
    const [title, setTitle] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('')

    const handleAdd = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTodo = {
          id: Date.now(),
          title: title,
          completed: false,
        };

        dispatch({type: "added", payload: newTodo});
        setTitle('');
    };

    return(
        <>
            <h1>Create Todo List</h1>
            <form onSubmit={handleAdd}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a todo..."
                />
                <button type="submit">Add</button>
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
                        {editingTodoId ===  todo.id ? (
                          <input
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                          />
                        ): (
                          <span>{todo.title}</span>
                        )}                  
                        
                        {editingTodoId === todo.id ? (
                          <>
                            <button onClick={() => {dispatch({ 
                              type: 'saved', 
                              payload: { id: todo.id, newTitle: editingTitle } 
                            }); setEditingTodoId(null); setEditingTitle('')}}>
                              Save
                            </button>
                            <button onClick={() => {setEditingTodoId(null); setEditingTitle('')}}>
                              Cancel
                            </button>
                          </>
                        ):(
                          <>
                            <button onClick={() => {setEditingTodoId(todo.id); setEditingTitle(todo.title)}}>Edit</button>
                            <button 
                                onClick={() => dispatch({ type: "deleted", payload: todo.id })}
                                disabled={!todo.completed}
                            >
                                Delete
                            </button>
                          </>
                        )}
                        
                    </li>
                    ))}
                </ul>
                <p>{todos.filter((t) => !t.completed).length} of {todos.length} remaining</p>
            </div>
        </>
    );
}

export default TodoList;




