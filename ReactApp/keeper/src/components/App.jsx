import React from "react";
import notes from "../notes";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Input from "./Input";

function App() {
    return(
        <div>
            <Header />
            <Input />
            {/* {notes.map(note => 
            (
                <Note 
                    key={note.key}
                    title={note.title}
                    content={note.content}
                />
            ))} */}
            <Footer />
        </div>
    )
}

export default App;