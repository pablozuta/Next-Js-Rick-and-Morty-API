import Head from 'next/head'
import styles from './Home.module.css'
import Link from 'next/link';



const defaultEndpoint = 'https://rickandmortyapi.com/api/character/';

export async function getServerSideProps( { query }){
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}/${id}`);
  const data = await res.json();
  return{
    props:{
      data
    }
  }
}

//aca empieza el componente de la pagina personajes
export default function Character({data}) {
  const {name, image, gender, location, origin, species, status} = data;
    return (
    <div className={styles.container}>
      <Head>
        <title>{ name }</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



  <main className={styles.main}>
    <div className={styles.profile}>
      
      <div className={styles.profile-image}>
        <img src={image} alt={name} /></div>

         <div className="profile-details">
          <h2>Character Details</h2>
          <ul>
          <li><strong>Name:</strong> {name}</li>
          <li>
            <strong>Gender:</strong> {gender}
          </li>
          <li>
            <strong>Location:</strong> {location?.name}
          </li>
          <li>
            <strong>Origin:</strong> {origin?.name}
          </li>
          <li>
            <strong>Species:</strong> {species}
          </li>
          <li>
            <strong>Status:</strong> {status}
          </li>


        </ul>
        </div>
        <Link href={'/'} className={styles.link}>Back Home</Link>
       </div>

       
      
      
          
     
     
      </main>
     
      
    </div>
  )
}
