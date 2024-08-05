import todoList from "./js/index"

import "./css/style.css";
import "./css/reset.css";

//처음에 화면 뿌리기
todoList.initList();

// 추가 버튼 이벤트
document.getElementById("todoAddBtn").addEventListener("click", todoList.addList);

//전체 삭제 버튼
document.getElementById("todoClearBtn").addEventListener("click", todoList.allDelList);