import styles from '@/styles/QuestionCard.module.css'
import { Inter } from "next/font/google";
import { Dispatch, SetStateAction, useState } from 'react';


const inter = Inter({ subsets: ["latin"] });

export interface Question {
    head: string;
    options: string[];
    correct: number;
    rightQuestion: number;
    selected: number | null;
    setSelected:  Dispatch<SetStateAction<number | null>>;
    answer: number | null;
    setAnswer: Dispatch<SetStateAction<number | null>>;
}

export default function QuestionCard({correct, head, options, selected, setSelected, answer, setAnswer, rightQuestion }: Question){

    function select(i : number ) {
        if (!answerExists()) {
            setSelected(i)
        }
    }

    function answerExists(): boolean {
        return answer != null || answer != undefined
    }

    return (
        <>
            <div className={`${styles["card"]} ${inter.className}`}>
                <div className={`${styles["head"]}`}>
                    <p>{head}</p>
                </div>
                <div className={`${styles["options"]}`}>
                    {options.map((option,i) => {
                        return <p 
                        style={{color: selected == i ? "white" : "var(--main-text-color)"}} 
                        className={`
                            ${styles.option} 
                            ${selected == i && !answerExists() ? styles.selected : ""} 
                            ${selected == i && (answerExists() && selected != answer) ? styles.wrong : ""}
                            ${selected == i && (answerExists() && selected == answer) ? styles.selected : ""}    
                            ${answer == i ? styles.selected : ""}    
                        `} 
                        onClick={() => select(i)} key={i}>{option}</p>
                    })}
                </div>
            </div>
        </>
    )
}