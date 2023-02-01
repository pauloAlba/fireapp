import { useEffect, useState } from "react";
import { db, auth } from "./firebaseConnection";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import {createUserWithEmailAndPassword} from "firebase/auth"

import "./app.css";
import { async } from "@firebase/util";
function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), () => {
        let listaPost = [];
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(listaPost);
      });
    }
    buscarPosts();
  }, []);

  async function handleAdd() {
    //await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log("DADOS REGISTRADOS NO BANCO!")
    // })
    // .catch((error) => {
    //   console.log("GEROU ERRO" + error)
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Dados registrados ao banco");
        setAutor("");
        setTitulo("");
        buscarPosts();
      })
      .catch((error) => {
        console.log("Erro" + error);
      });
  }

  async function buscarPost() {
    const postRef = doc(db, "posts", "12345");
    await getDoc(postRef)
      .then((snapshot) => {
        setAutor(snapshot.data().autor);
        setTitulo(snapshot.data().titulo);
      })
      .catch(() => console.log("Erro ao buscar"));
  }

  async function buscarPosts() {
    //const postRef = doc(db, "posts", "12345");
    //await getDoc(postRef)
    //  .then((snapshot) => {
    //    setAutor(snapshot.data().autor);
    //    setTitulo(snapshot.data().titulo);
    //  })
    //  .catch(() => console.log("Erro ao buscar"));

    const postsRef = collection(db, "posts");
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(lista);
      })

      .catch(() => console.log("Houve algum erro ao buscar"));
  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Okay");
        setIdPost("");
        setAutor("");
        setTitulo("");
        buscarPosts();
      })
      .catch((error) => console.log(error));
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef)
      .then(() => {
        console.log("Item deletado");
        buscarPosts();
      })
      .catch((error) => console.log(error));
  }
  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((value)=>{
      console.log("CADASTRADO COM SUCESSO!")
      console.log(value)
      setEmail("")
      setSenha("")
    })
    .catch((error)=> console.log(error))
  }

  return (
    <div className="App">
      <h1>ReactsJS + Firebase</h1>

      <div className="container">
        <h2>Usuários</h2>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite um email"
        />{" "}
        <br />
        <label>Senha</label>
        <input
          type="text"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Inform sua senha"
        /> <br />
        <button onClick={novoUsuario}>Cadastrar</button>
      </div>
      <br />
      <br />
      <hr />

      <div className="container">
        <h2>POSTS</h2>
        <label htmlFor="">ID do Post:</label>
        <input
          type="text"
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />
        <br />
        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
          }}
        />

        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => {
            setAutor(e.target.value);
          }}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <br />

        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <br />
                <span>Titulo: {post.titulo}</span>
                <br />
                <span>Autor: {post.autor}</span>
                <br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
