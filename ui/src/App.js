import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const inputInfo = useRef(null);
  const inputTitle = useRef(null);
  const inputId = useRef(null);
  const inputEditTitle = useRef(null);
  const inputEditInfo = useRef(null);
  
  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes',
      {
        withCredentials: false
      }
    ).then(response => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, [isUpdate]);

  const addNote = () => {
    axios.post(
      'http://localhost:9090/api/note/add', 
      {
        title: inputTitle.current.value,
        info: inputInfo.current.value
      }, 
      {
        withCredentials: false
      }).then(() => {
        setIsUpdate(!isUpdate);
      });
  }

  const delNote = (id) => {
    axios.delete(
      'http://localhost:9090/api/note/'+ id, 
      ).then(() => {
        setIsUpdate(!isUpdate);
      });
  }

  const editNote = () => {
    axios.put(
      'http://localhost:9090/api/note/edit',
      {
        title: inputEditTitle.current.value,
        info: inputEditInfo.current.value,
      },
      {
        withCredentials: false
      }
    ).then(() => {
      setIsUpdate(!isUpdate)
    })
  }

  return (
    <div className="App">

      <label>Заголовок</label>
      <input ref={inputTitle} type="text"/>
      <label>Описание</label>
      <input ref={inputInfo} type="text"/>
      <button 
        onClick={() => addNote()}>
          Добавить
      </button>
      <label>Ввести ид</label>
      <input ref={inputId} type="text"/>
      
      {!!notes && notes.map((note, index) => (
        <div className="card">
          <div className="card_id">
            <div key={index}>{note.id}</div>
            <div>
              <button 
                onClick={() => delNote(note.id)}>
                  Удалить
              </button>
            </div>
          </div>
          <div className="card_text">
            <div className="title" key={index}>{note.title}</div>
            <div className="info" key={index}>{note.info}</div>
          </div>
          <div className="card_edit">
            <label>Новый заголовок</label>
            <input ref={inputEditTitle} type="text"/>
            <label>Новое описание</label>
            <input ref={inputEditInfo} type="text"/>
            <button 
              onClick={() => editNote(note.id)}>
                Обновить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
