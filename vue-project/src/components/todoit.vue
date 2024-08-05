<script>
let id = 0

export default {
  data() {
    return {
      //할일 text
      newTodo: '',
      //checkbox 체크 여부
      hideCompleted: false,
      //할일 목록
      todos: []
    }
  },
  computed: {
    //계산된 실행
    //true면 done이 false인것만 남긴다 , 아니면, 모든 걸 넘김
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    }
  },
  methods: {
    //마운트 될 때, 실행할 초기화 함수
    init(){
      console.log("init 실행됨")
        let todoList = localStorage.getItem("todoList")
        console.log("repo에서 가져온 값:"+todoList)
        todoList = JSON.parse(todoList);
        for(let i=0; i<todoList.length; i++){

          this.todos.push({id:todoList[i].id, text:todoList[i].text, done: todoList[i].done})
        }
    }
    ,
    //할일 추가하기
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false })
      localStorage.setItem("todoList", JSON.stringify(this.todos))
      this.newTodo = ''
      console.log(localStorage.getItem("todoList"))
    },
    //특정 todo 지우기
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
      localStorage.setItem("todoList", JSON.stringify(this.todos))
    },
    //전체 삭제 및 local저장소 지우기
    allremoveTodo(){
      this.todos =[]
      localStorage.setItem("todoList", JSON.stringify(this.todos))
    }
  },
  //새로고침 등 마운트 될 때 실행
  mounted(){
    console.log("마운트 됨")
    this.init()
  }

}
</script>

<template>
  <div>
    <h1>
      Todo List
    </h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" required placeholder="new todo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
  <button @click="allremoveTodo">clear</button>

  </div>
  

</template>

<style>
.done {
  text-decoration: line-through;
}
</style>