import React, { useState } from "react";

import "./styles.css";

function App() {
  const [text, setText] = useState("");

  const [selectedBubble, setSelectedBubble] = useState(null);

  const handleSubmit = () => {
    if (text.trim()) {
      createTextBubble(text);

      setText("");
    }
  };

  const createTextBubble = (text) => {
    const bubble = document.createElement("div");

    bubble.classList.add("bubble");

    bubble.textContent = text;

    // Set the bubble as draggable

    bubble.setAttribute("draggable", true);

    // Attach drag events

    bubble.addEventListener("dragstart", handleDragStart);

    bubble.addEventListener("dragend", handleDragEnd);

    // Add click handler to select the bubble

    bubble.addEventListener("click", () => {
      toggleSelection(bubble);
    });

    // Target the desired container (in this case, container 2)

    const container = document.querySelector(".bubble-container-2");

    container.appendChild(bubble);

    // Start the animation

    setTimeout(() => {
      bubble.classList.add("float");
    }, 10);
  };

  const toggleSelection = (bubble) => {
    // Unselect all previously selected bubbles

    const selectedBubbles = document.querySelectorAll(".selected");

    selectedBubbles.forEach((selectedBubble) => {
      selectedBubble.classList.remove("selected");
    });

    // Select the clicked bubble

    bubble.classList.add("selected");

    setSelectedBubble(bubble);
  };

  const moveBubble = (direction) => {
    if (!selectedBubble) return;

    const currentContainer = selectedBubble.parentNode;

    let targetContainer;

    if (direction === "up") {
      if (currentContainer.previousElementSibling) {
        targetContainer = currentContainer.previousElementSibling;
      }
    } else if (direction === "down") {
      if (currentContainer.nextElementSibling) {
        targetContainer = currentContainer.nextElementSibling;
      }
    }

    if (targetContainer) {
      targetContainer.appendChild(selectedBubble);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger the handleSubmit function when Enter is pressed
    }
  };

  // Drag and Drop Handlers

  const handleDragStart = (e) => {
    // Store the dragged element

    e.dataTransfer.setData("text", e.target.textContent);

    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  const handleDragOver = (e) => {
    // Prevent default behavior to allow drop

    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedText = e.dataTransfer.getData("text");

    // Find all bubbles, and find the one that matches the dragged text

    const allBubbles = document.querySelectorAll(".bubble");

    let draggedBubble = null;

    allBubbles.forEach((bubble) => {
      if (bubble.textContent === draggedText) {
        draggedBubble = bubble;
      }
    });

    if (draggedBubble) {
      // Append the dragged bubble to the current container

      e.target.appendChild(draggedBubble);
    }
  };

  return (
    <div className="app-container">
      {/* Bubble Containers */}
      <div
        className="bubble-container bubble-container-1"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></div>{" "}
      {/* Blue */}
      <div
        className="bubble-container bubble-container-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></div>{" "}
      {/* Green */}
      <div
        className="bubble-container bubble-container-3"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></div>{" "}
      {/* Orange */}
      <div
        className="bubble-container bubble-container-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></div>{" "}
      {/* Red */}
      {/* Text input and button below the bubble containers */}
      <div className="input-container">
        <input
          type="text"
          id="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
          placeholder="Name..."
        />

        <button id="submitButton" onClick={handleSubmit}>
          ↵
        </button>
      </div>
      {/* Arrow buttons to move selected bubble */}
      <div className="arrow-buttons">
        <button className="arrow-button" onClick={() => moveBubble("up")}>
          ↑
        </button>

        <button className="arrow-button" onClick={() => moveBubble("down")}>
          ↓
        </button>
      </div>
    </div>
  );
}

export default App;
