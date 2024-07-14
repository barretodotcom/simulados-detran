import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Simulados Detran</title>
        <meta name="description" content="Simulados Detran Primeiros Socorros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles["home"]} ${inter.className}`}>
        <div className={`${styles["selection-container"]}`}>
          <div className={`${styles["title-container"]}`}>
            <h1>Simulados 
              <br/>
              <a>Detran</a> 2024</h1>
            <ul>
              <li>Questões retiradas diretamente de auto escolas</li>
              <li>Simulados gerais e separados por tema</li>
              <li>Você não precisa de mais nada além disso</li>
            </ul>
          </div>
          <div className={`${styles["options"]}`}>
            <h1>Lista de Simulados</h1>
            <Link href={"/simulados-gerais"}>
              <div>
                <h2>Simulados Gerais</h2>
              </div>
            </Link>
            
            {/* <div>
              <h2>Mecânica</h2>
            </div>
            <div>
              <h2>Direção Defensiva</h2>
            </div>
            <div>
              <h2>Veículos</h2>
            </div>
            <div>
              <h2>Normas de Circulação e Conduta</h2>
            </div>
            <div>
              <h2>Órgãos de Trânsito</h2>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
