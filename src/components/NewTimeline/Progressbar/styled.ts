import styled from "styled-components";

export const ProgressbarStyled = styled.div`
  position: absolute;
  left: -10px;
  right: -10px;
  height: 20px;
  top: 40px;
  margin-bottom: 8px;
  border-radius: 2px;
  border: 1px solid var(--lies);
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 9px;
    background-color: var(--active);
    border-right: 1px solid var(--lies);
  }

  &::after {
    left: auto;
    right: 0px;
    border-right: none;
    border-left: 1px solid var(--lies);
  }
`;
