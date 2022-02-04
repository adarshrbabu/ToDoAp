import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function ToDo() {
    const [tasks, SetTasks] = useState([]);
    const [taskComplte, SetTaskComplete] = useState([]);
    const [newtask, setNewtask] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(SetTaskComplete.length + SetTasks.length);
    }, []);

    const deleteTask = (id) => {
        let deleted = tasks.filter((task) => task.id !== id);
        SetTasks(deleted);
    };
    const deleteTaskComplete = (id) => {
        let deleted = taskComplte.filter((task) => task.id !== id);
        SetTaskComplete(deleted);
    };
    const downtask = (id) => {
        let previoustask = tasks.find((task) => task.id === id);
        SetTaskComplete([...taskComplte, previoustask]);
        let deleted = tasks.filter((task) => task.id !== id);
        SetTasks(deleted);
    };
    const revert = (id) => {
        let previoustask = taskComplte.find((task) => task.id === id);
        SetTasks([...tasks, previoustask]);
        let deleted = taskComplte.filter((task) => task.id !== id);
        SetTaskComplete(deleted);
    };
    const addnewtask = (event) => {
        event.preventDefault();
        let new_tasks = {
            id: count - 1 ,
            tittle: newtask,
        };
        SetTasks([...tasks, new_tasks]);
        setNewtask("");
        setCount(count +1);
    };
    const render = () => {
        return tasks.map((task) => (
            <ListItem>
                <LeftContainer onClick={() => downtask(task.id)}>
                    <CheckConatiner></CheckConatiner>
                    <ItemContent>
                        {task.id},{task.tittle}
                    </ItemContent>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={() => deleteTask(task.id)}>
                        <ButtonImage
                            src={require("../assets/delete.svg").default}
                            alt="Delete"
                        />
                    </ActionButton>
                </RightContainer>
            </ListItem>
        ));
    };
    const RenderCompleted = () => {
        return taskComplte.map((task) => (
            <ListItem>
                <LeftContainer>
                    <CheckConatinerCompleted>
                        <TickImage
                            src={require("../assets/tick-green.svg").default}
                            alt="Tick"
                        />
                    </CheckConatinerCompleted>
                    <ItemContentCompleted>
                        {task.id},{task.tittle}
                    </ItemContentCompleted>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={() => revert(task.id)}>
                        <ButtonImage
                            src={require("../assets/revert.svg").default}
                            alt="Delete"
                        />
                    </ActionButton>
                    <ActionButton onClick={() => deleteTaskComplete(task.id)}>
                        <ButtonImage
                            src={require("../assets/delete.svg").default}
                            alt="Delete"
                        />
                    </ActionButton>
                </RightContainer>
            </ListItem>
        ));
    };

    return (
        <Container>
            <Headding>ToDo List</Headding>

            <TodoContainer>
                <Subheadding>Things To Be done</Subheadding>
                <ToDoList>{render()}</ToDoList>
            </TodoContainer>

            <NewTodoForm>
                <FormInput
                    value={newtask}
                    onChange={(e) => setNewtask(e.target.value)}
                    placeholder="Type new task..."
                />
                <FormSubmitButton onClick={(e) => addnewtask(e)}>
                    Add New
                </FormSubmitButton>
            </NewTodoForm>

            <TodoContainer>
                <Subheadding>Completed</Subheadding>
                <ToDoList>{RenderCompleted()}</ToDoList>
            </TodoContainer>
        </Container>
    );
}
const Container = styled.div`
    width: 40%;
    text-align: center;
    max-width: 1000px;
    padding: 50px 5%;
    border-left: 2px solid #f5f5f5;
    border-right: 2px solid #f5f5f5;
    margin: 0 auto;
    min-height: 100vh;
`;
const Headding = styled.h1`
    text-align: center;
    font-size: 33px;
    font-weight: 500;
`;
const TodoContainer = styled.div`
    width: 100%;
`;
const Subheadding = styled.h3`
    font-size: 36px;
    font-size: 22px;
    text-align: left;
    font-weight: 400;
    color: #051041;
`;
const ToDoList = styled.ul`
    display: flex;
    align-items: centre;
    justify-content: space-between;
    margin-bottom: 20px;
    display: block;
`;
const ListItem = styled.li`
    display: flex;
    align-items: centre;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;
const CheckConatiner = styled.span`
    border: 2px solid black;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    display: inline-block;
    cursor: pointer;
`;
const ItemContent = styled.span`
    font-size: 21px;
`;
const RightContainer = styled.div``;
const ActionButton = styled.button`
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
`;
const ButtonImage = styled.img``;
const NewTodoForm = styled.form`
    display: flex;
    height: 43px;
    &::before {
        content: "";
        background-image: url(${require("../assets/plus.svg").default});
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        bottom: 100px;
        left: 484px;
    }
`;
const FormInput = styled.input`
    display: block;
    outline: none;
    width: 85%;
    padding: 0px 30px;
    font-size: 15px;
    border: 1px solid #050241;
`;
const FormSubmitButton = styled.button`
    white-space: nowrap;
    border: none;
    background-color: #050241;
    color: #fff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    width: 24%;
`;

const CheckConatinerCompleted = styled(CheckConatiner)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #06c692;
`;
const ItemContentCompleted = styled(ItemContent)`
    color: #06c692;
`;
const TickImage = styled.img`
    width: 80%;
`;
