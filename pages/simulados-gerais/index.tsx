import styles from "@/styles/Simulados.Kit.module.css";
import Head from 'next/head';
import Link from 'next/link';
import { Inter } from "next/font/google";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });

export default function SimuladosKit() {
    const router = useRouter();

    function startSimulado(simuladoPath: string) {
      localStorage.setItem("path-questoes", simuladoPath)
      router.push("simulado")
    }

    return (
        <>
            <Head>
                <title>Simulados Detran - Primeiros Socorros</title>
                <meta name="description" content="Simulados Detran" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles["main"]} ${inter.className}`}>
              <div className={`${styles["selection-container"]}`}>
                <div className={`${styles["options"]}`}>
                  <h1>Lista de Simulados</h1>
                  <div onClick={() => startSimulado("/data/SIMULADO 01.json")}>
                    <h2>Simulado 01</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 02.json")}>
                    <h2>Simulado 02</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 03.json")}>
                    <h2>Simulado 03</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 04.json")}>
                    <h2>Simulado 04</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 05.json")}>
                    <h2>Simulado 05</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 06.json")}>
                    <h2>Simulado 06</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 07.json")}>
                    <h2>Simulado 07</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 08.json")}>
                    <h2>Simulado 08</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 09.json")}>
                    <h2>Simulado 09</h2>
                  </div>
                  <div onClick={() => startSimulado("/data/SIMULADO 10.json")}>
                    <h2>Simulado 10</h2>
                  </div>
                </div>
              </div>
            </main>
        </>
    )
}