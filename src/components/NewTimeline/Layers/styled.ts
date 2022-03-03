import styled from "styled-components";

export const LayersStyled = styled.div`
  position: absolute;
  top: 68px;
  left: -10px;
  right: -10px;
`;

export const LayerStyled = styled.div`
  background-color: var(--lies);
  height: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 1px;
  }
`;
