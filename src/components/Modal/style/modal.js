import styled from "styled-components/macro";

export const ModalWrapper = styled.div`
    padding: 30px;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
`

export const ModalContainer = styled.div`
height: auto;
max-height: 100%;
overflow-y: auto;
position: relative;
max-width: 600px;
width: 100%;
overflow: auto;
padding: 30px 30px;
box-sizing: border-box;
background-color: #fff;
border-radius: 10px;
h2{
    margin-bottom:1rem;
}
`
