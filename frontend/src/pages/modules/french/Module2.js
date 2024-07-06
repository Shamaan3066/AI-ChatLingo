import React from "react";
import '../modules-display.css';

const Module2 = () => {
    return(
        <div className="modules-page">
            <div className="modules-container">
            <h1>French Module 2: Writing and Spelling</h1>
            <h2>Objective</h2>
            <p>Practice writing each letter of the French alphabet with correct spelling and accents.</p>
            <h2>Writing the French Alphabet</h2>
            <p>French letters can include accents such as é, è, ê, ç, among others, which change pronunciation and meaning.</p>
            <h3>Accents and Spelling</h3>
            <ul>
                <li>Accent aigu (é) - pronounced [ay]</li>
                <li>Accent grave (è, à, ù) - pronounced [eh], [ah], [oo]</li>
                <li>Accent circonflexe (ê, î, ô, û) - modifies the sound of the vowel</li>
                <li>Cédille (ç) - modifies the pronunciation of the letter 'c' to [s]</li>
            </ul>
            <h2>Exercises</h2>
            <ul>
                <li>Write each letter of the French alphabet, including accents, in both uppercase and lowercase.</li>
                <li>Practice spelling common words that include accents (e.g., café, hôtel, élève).</li>
                <li>Use online resources to hear and practice the correct pronunciation of words with accents.</li>
            </ul>
            <h2>Grammar Tip</h2>
            <p>Accents in French are not optional; they change the meaning and pronunciation of words.</p>
            <h2>Cultural Context</h2>
            <p>French spelling and accents reflect the rich cultural and linguistic heritage of France and Francophone countries.</p>
        </div>
        </div>
    )
}

export default Module2;
