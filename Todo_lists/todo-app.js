(function () {
  let listArray = [],
    listName = 'list';

  //создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.textContent = title;
    return appTitle;
  }
  //создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    button.disabled = true;

    input.addEventListener('input', function () {
      if (input.value.trim() !== '') {
        button.disabled = false;
      }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }
  //создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  //создаем и возвращаем элемент списка дел
  function createTodoItem(obj) {
    let item = document.createElement('li');
    //кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    //устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );
    item.textContent = obj.name;

    if (obj.done == true) {
      item.classList.add('list-group-item-success');
    }

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    //добавляем обработчики на кнопки
    doneButton.addEventListener('click', function () {
      obj.done = !obj.done;

      item.classList.toggle('list-group-item-success');

      saveList(listArray, listName);

      console.log(listArray);
    });
    deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        for (let i = 0; i < listArray.length; i++) {
          if (listArray[i].id == obj.id) {
            listArray.splice(i, 1);
            break;
          }
        }
        item.remove();
        saveList(listArray, listName);
      }
    });

    //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    //приложению нужен доступ к самому элементу и кнопкам, чтобы отрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function getNewId(arr) {
    let max = 0;

    for (const item of arr) {
      if (item.id > max) {
        max = item.id;
      }
    }
    return max + 1;
  }

  function createTodoApp(
    container,
    title = 'Список дел',
    mylistName,
    defArr = []
  ) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    listName = mylistName;

    let listData = localStorage.getItem(listName);

    if (listData !== '' && listData !== null) {
      listArray = JSON.parse(listData);
    } else {
      listArray = defArr;
      saveList(listArray, listName);
    }

    for (const element of listArray) {
      let todoItem = createTodoItem(element);
      todoList.append(todoItem.item);
    }

    //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function (e) {
      //эта строка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let newObj = {
        id: getNewId(listArray),
        name: todoItemForm.input.value,
        done: false,
      };

      let todoItem = createTodoItem(newObj);

      listArray.push(newObj);

      todoList.append(todoItem.item);

      //обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;

      saveList(listArray, listName);

      console.log(listArray);
    });
  }

  function saveList(arr, key) {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  window.createTodoApp = createTodoApp;
})();
