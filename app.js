const header = document.getElementById("header"),
  todo_list = document.getElementById("todo_list"),
  name_container = document.getElementById("name_container"),
  enter_btn = document.getElementById("enter_btn"),
  add_todo_btn = document.getElementById("add_todo_btn"),
  enter_name = document.getElementById("enter_name_inp"),
  enter_todo = document.getElementById("enter_todo_inp"),
  user_name = document.getElementById("user_name"),
  exit_btn = document.getElementById("exit_btn"),
  todo_list_container = document.getElementById("crud_container")

let list = []
let invalid_class = ["border-2", "border-red-200"]

const methods = {
  add_todo: () => {
    if (!enter_todo.value.trim()) {
      enter_todo.classList.add(...invalid_class)
      return
    }

    let random_id = Math.floor(Math.random() * Date.now())

    // add todo
    list.push({ id: random_id, todo: enter_todo.value })

    // get list
    methods.get_list()

    // clear input
    enter_todo.value = ""
    enter_todo.focus()
  },
  get_list: () => {
    const list_el = list
      .map((v) => {
        return `<li class=" bg-gray-100 m-1 rounded-md" data-todo-id="${v.id}" >
                <div class="flex justify-end px-2 pt-1">
                  <button data-todo-id="${v.id}" class="list_id inline-block text-red-300 hover:text-red-500 text-xs" type="button">Remove</button>
                </div>
                <div class="flex flex-col p-2 text-center">${v.todo}</div>
              </li>`
      })
      .reverse()

    todo_list.innerHTML = list_el.join("")

    // get all remove buttons
    const remove_buttons = document.querySelectorAll(".list_id")

    // add event listener to each remove button
    remove_buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // get attribute id
        const todo_id = button.getAttribute("data-todo-id")

        // element to remove using data attribute
        const todo_to_remove = document.querySelector(`[data-todo-id="${todo_id}"]`)

        // filter array: remove equivalent id
        let new_list = list.filter((v) => v.id != todo_id)
        // pass the new list in the global array
        list = new_list

        // remove list
        todo_to_remove.remove()
      })
    })
  },
}

add_todo_btn.addEventListener("click", methods.add_todo)

enter_btn.addEventListener("click", function () {
  if (!enter_name.value.trim()) {
    enter_name.classList.add(...invalid_class)
  } else {
    enter_name.classList.remove(...invalid_class)
    header.classList.remove("hidden")
    todo_list_container.classList.remove("hidden")
    name_container.classList.add("hidden")
    user_name.innerHTML = enter_name.value
    enter_todo.focus()
  }
})

exit_btn.addEventListener("click", function () {
  location.reload()
})

enter_todo.addEventListener("focus", function (event) {
  enter_todo.classList.remove(...invalid_class)
})

enter_todo.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault()
    add_todo_btn.click()
  }
})

enter_name.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault()
    enter_btn.click()
  }
})
