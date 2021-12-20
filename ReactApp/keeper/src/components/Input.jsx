import React from "react";

function Input(){
    return (
        <div>
            <form className="inputForm">
                <input className="inputTitle" type="text" placeholder="Title" />
                <textarea className="inputText" rows="3" placeholder="Take a note..." />
            </form>
        </div>
    )
}

export default Input;
