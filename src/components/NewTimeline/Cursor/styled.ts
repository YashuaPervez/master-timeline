import styled from "styled-components";

export const CursorStyled = styled.div`
  position: absolute;
  top: 32px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: transparent;
  overflow: hidden;
  /* z-index: 1; */

  .line {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 1px;
    background-color: var(--active);
    z-index: 1;

    &::before {
      content: "";
      background-color: var(--active);
      height: 8px;
      width: 9px;
      clip-path: polygon(100% 0, 0 0, 50% 100%);
      position: absolute;
      top: 0px;
      left: -4px;
    }
  }
`;
