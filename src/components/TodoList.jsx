import { Checkbox, HStack, Stack, Text } from '@chakra-ui/react';
import { useFilter, useTodos } from '../store';

const Todo = ({ id, title, completed }) => {
  const filter = useFilter(state => state.filter)
  const toggleTodo = useTodos(state => {
    switch (filter) {
      case 'completed': return state.todos.filter((todo) => todo.completed)
      case 'uncompleted': return state.todos.filter((todo) => !todo.completed)
      default: return state.todos
    }
  })

  return (
    <HStack spacing={4}>
      <Checkbox isChecked={completed} onChange={() => toggleTodo(id)}/>
      <Text>{title}</Text>
    </HStack>
  );
};

const TodoList = () => {
  const todos = useTodos(state => state.todos)

  return (
    <Stack minH="300px">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Stack>
  );
};

export { TodoList };
