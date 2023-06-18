import create from "zustand";
import { persist, devtools } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export const useTodos = create(devtools(persist((set, get) => ({
    todos: [
        { id: 1, title: 'Learn JS', completed: true },
        { id: 2, title: 'Learn React', completed: false },
    ],
    loading: false,
    error: null,
    // 1
    // addTodo: (title) => set(state => {
    //     const newTodo = {id: nanoid(), title, completed: false}

    //     return {todos: [...state.todos, newTodo]}
    // })
    // 2
    // addTodo: (title) => set(state => ({todos: [...state.todos, {id: nanoid(), title, completed: false}]}))
    // 3
    addTodo: (title) => {
        const newTodo = { id: nanoid(), title, completed: false }
        set({ todos: [...get().todos, newTodo] })
    },
    toggleTodo: (todoId) => set({
        todos: get().todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo))
    }),
    fetchTodos: async () => {
        set({ loading: true })

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

            if (!res.ok) throw new Error('Failed to fetch')

            set({ todos: await res.json(), error: null })
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    }
}))))

export const useFilter = create(set => ({
    filter: 'all',
    setFilter: (value) => set({ filter: value })
}))