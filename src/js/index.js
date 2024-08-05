const todoList ={
    //초기 리스트 불러오기
    initList :() =>{

        let storageList = localStorage.getItem("todoList");

        if(storageList){
            storageList = JSON.parse(storageList);

            for(let i =0; i<storageList.length ; i++){

                //배열에 담긴 요소 추출
                let txt = storageList[i].text;

                //todo -row 생성
                const todoRow  =document.createElement("div");
                todoRow.setAttribute('data-index', i);
                todoRow.classList.add("todo-row");

                //todo Item 생성
                const Item = document.createElement("input");
                Item.classList.add("todo-list-item");
                Item.type = "text";
                Item.disabled = true;
                Item.value = txt;       //여기에 값을 넣어준다

                //removeBTN 생성
                const removeBtn = document.createElement("button");
                removeBtn.classList.add("todo-remove-Btn");
                removeBtn.textContent = "-";
                removeBtn.addEventListener("click", todoList.delList );

                //요소를 합친후 목록 추가
                todoRow.append(Item);
                todoRow.append(removeBtn);
                document.getElementById("todoListContainer").append(todoRow);   // id로 해당 부분을 찾아서 거기에 합친 요소를 추가
            }
        }
        

    },

    //할 일 추가하기
    addList :(event)=>{
        let storageList = localStorage.getItem("todoList");

        if(!storageList){
            storageList = [];
        }
        else{
            storageList = JSON.parse(storageList)
        }

        const inputTxt = document.getElementById("todoInputTxt").value;

        if(inputTxt){
            const index = storageList.length;

            //입력한 글자 배열에 추가
            storageList.push({
                index : index,
                text : inputTxt
            })

            //row 생성
            const todoRow = document.createElement("div");
            todoRow.setAttribute("data-index", index);
            todoRow.classList.add("todo-Row");

            //item 생성
            const Item = document.createElement('input');
            Item.classList.add("todo-list-item");
            Item.type = "text";
            Item.disabled = true;
            Item.value = inputTxt;

            //remove 버튼 생성
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("todo-remove-btn");
            removeBtn.textContent ="-";
            removeBtn.addEventListener("click", todoList.delList);

            //요소를 합친 후 목록에 추가
            todoRow.append(Item);
            todoRow.append(removeBtn);
            document.getElementById("todoListContainer").append(todoRow);
        }

        //입력 받은 요소를 localStorage에 넣음
        localStorage.setItem("todoList", JSON.stringify(storageList));
        //JSON.stringify 객체를 json으로 바꿈 <-> parge
    },

    //할 일 삭제하기
    delList:(event)=>{
        //현재 삭제할 index 구하기
        const index = parseInt(event.target.parentElement.attributes["data-index"].value);

        //Element 제거
        const element =event.target.parentElement;
        element.remove();

        //LocalStorage에서 제거
        //LocalStorage에서 todoList 가져오기
        let storageList = localStorage.getItem("todoList");
        storageList.split(index, 1 );

        // 변경된 localStorage 저장
        localStorage.setItem("todoList", JSON.stringify(storageList));
    },

    //리스트 초기화
    allDelList:()=>{
        const todoListContainer = document.getElementById("todoListContainer");
        todoListContainer.innerHTML="";

        //localStorage 초기화
        localStorage.setItem("todoList", "[]");
    }

}

export default todoList;