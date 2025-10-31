const textField = document.querySelector('[data-todo-header-text-field]')
const addTodoButton = document.querySelector('[data-todo-header-add-todo-button]')
const todoList = document.querySelector('[data-todo-body-list]')

const allTodo = JSON.parse(localStorage.getItem('allTodo')) || []

const saveToLocalStorage = (key = 'allTodo') => {
  localStorage.setItem(key, JSON.stringify(allTodo))
}

addTodoButton.addEventListener('click', () => {
  if (textField.value.trim()) {
    allTodo.push(textField.value)
    textField.value = ''

    saveToLocalStorage()
    render()
  }
})

textField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTodoButton.click()
  }
})

const createElement = (tagName, textContent) => {
  const element = document.createElement(tagName)
  element.textContent = textContent

  return element
}

const removeTodo = (index) => {
  allTodo.splice(index, 1)
  saveToLocalStorage()
  render()
}

const render = () => {
  todoList.innerHTML = ''

  allTodo.forEach((todo, index) => {
    const todoItem = createElement('li', todo)
    const removeButton = createElement('button', '❌')

    removeButton.addEventListener('click', () => removeTodo(index))

    todoItem.append(removeButton)
    todoList.append(todoItem)
  })
}

render()
