import { useState , useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/';

export async function getServerSideProps(){
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return{
    props:{
      data
    }
  }
}

export default function Home({data}) {
  const {info, results: defaultResults = []} = data;
  const [results, updateResults] = useState(defaultResults);
  const [page , updatePage] = useState({
    ...info,
    current:defaultEndpoint
  });
  const {current} = page;

  useEffect(() =>{
    if (current===defaultEndpoint)return;

    async function request(){
      const res = await fetch(current)
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info
      });
 if ( !nextData.info ?.prev){
updateResults(nextData.results);
}

updateResults (prev => {
  return [...prev,
  ...nextData.results]
});

    }
    request();

  }, [current]);

  function handleLoadMore(){
    updatePage(prev => {
      return {
        ...prev,
        current:page?.next
      }
    });
  }

  function handleOnSubmitSearch(e){
    e.preventDefault();

    const {currentTarget ={}} = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name ==='query');

    const value =fieldQuery.value || '';
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current:endpoint
    });
  }
   return (
    <div className={styles.container}>
      <Head>
        <title>Rick And Morty WIKI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Rick and Morty <span>WIKI </span> </h1>
      
        <form  className={styles.search} onSubmit={handleOnSubmitSearch}>
          <input className={styles.search} name="query" type="search" />
         <center><button className={styles.boton}>Search</button></center> 
        </form>

      

        <ul className={styles.grid}>
          {results.map(result => {
            const {id, name, image , species} = result;

            return(
          <li key={id} className={styles.card}>
          
            <img src={image} alt={`${name} thumb`} className={styles.image}/>
            <h3>Name: {name}</h3>
            <h4>Specie: {species}</h4>
          
          </li>
            )
          })}
          
        </ul>
        <center><button onClick={handleLoadMore}>Load More</button></center>
      
      
     

      </main>

      
    </div>
  )
}
