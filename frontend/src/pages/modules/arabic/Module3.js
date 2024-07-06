import React from "react";
import '../modules-display.css';
import fatha from './fatha.png';
import damma from './damma.png';
import kasra from './kasra.png';

const Module3 = () => {
    return(
        <div className="modules-page">
            <div className="modules-container">
                <h1>Arabic Module 3: Vowel Sounds & Pronunciation</h1>
                <h2>Objective</h2>
                <p>Explore the 3 short vowels (fatha, damma, kasra) and 3 long vowels (alif, waw, ya). Practice basic pronunciation with vowels combined with consonants.</p>
                <h2>Short Vowels</h2>
                <p>Arabic has three short vowels:</p>
                <ul>
                    <li>Fatha <img src={fatha} alt="fatha"></img> - pronounced as a short "a"</li>
                    <li>Damma <img src={damma} alt="damma"></img> - pronounced as a short "u"</li>
                    <li>Kasra <img src={kasra} alt="kasra"></img> - pronounced as a short "i"</li>
                </ul>
                <h2>Long Vowels</h2>
                <p>Arabic also has three long vowels:</p>
                <ul>
                    <li>Alif ( ا ) - pronounced as a long "a"</li>
                    <li>Waw ( و ) - pronounced as a long "u"</li>
                    <li>Ya ( ي ) - pronounced as a long "i"</li>
                </ul>
                <h2>Examples</h2>
                <ul>
                    <li>بَ (ba)</li>
                    <li>بُ (bu)</li>
                    <li>بِ (bi)</li>
                    <li>با (baa)</li>
                    <li>بُو (buu)</li>
                    <li>بِي (bii)</li>
                </ul>
                <h2>Exercises</h2>
                <ul>
                    <li>Combine consonants with each short and long vowel to form syllables.</li>
                    <li>Practice writing and pronouncing each combination.</li>
                    <li>Use flashcards to reinforce recognition of vowel sounds.</li>
                </ul>
                <h2>Pronunciation Tips</h2>
                <p>Listen to native speakers pronounce words and repeat after them. Use language learning apps that provide audio examples.</p>
                <h2>Cultural Notes</h2>
                <p>Vowels are not typically written in Arabic script except in the Quran, children's books, and educational materials. Understanding vowels is crucial for correct pronunciation and meaning.</p>
            </div>
        </div>
    )
}

export default Module3;
