import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ExerciseItem from "./ExerciseItem";

function ExerciseList({ exercises, onDuplicate, onDelete, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="exerciseList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="exercise-list"
          >
            {exercises.map((exercise, index) => (
              <Draggable
                key={exercise.id}
                draggableId={exercise.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ExerciseItem
                      exercise={exercise}
                      onDuplicate={() => onDuplicate(exercise.id)}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ExerciseList;
