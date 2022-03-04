import styled from "styled-components";

export const LayerLabelsStyled = styled.div`
  position: relative;
`;

type LabelStyledProps = {
  open: boolean;
  disabled: boolean;
};

export const LabelStyled = styled.div<LabelStyledProps>`
  height: 20px;
  display: flex;
  align-items: center;
  padding-right: 16px;
  position: absolute;
  left: 0px;
  right: 0px;
  z-index: ${(p) => (p.open ? 101 : 1)};
  filter: ${(p) => (p.disabled ? "brightness(0.5)" : "")};
  background-color: ${(p) => (p.disabled ? "var(--lies)" : "transparent")};

  .toggle {
    width: 36px;
    z-index: 2;
    overflow: hidden;
    background-color: ${(p) => (p.disabled ? "var(--lies)" : "var(--main)")};
    padding-left: 16px;

    button {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      position: relative;

      &.closed {
        &::after {
          content: "";
          background-color: #fff;
          width: 20px;
          height: 1px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }

  .title {
    flex: 1;
    padding-left: 16px;
    font-size: 12px;
    color: #fff;
    max-width: 420px;
    z-index: 200;
    line-height: 20px;
    background-color: ${(p) => (p.disabled ? "var(--lies)" : "var(--main)")};

    h3 {
      font-weight: 300;
    }
  }

  .controls {
    position: absolute;
    display: flex;
    right: 16px;
    z-index: 1;

    .control-unit {
      width: 160px;

      &:not(:first-child) {
        margin-left: 16px;
      }

      .form-unit {
        background-color: var(--lies);
        border: 1px solid var(--lies);
        color: #fff;
        font-size: 12px;
        width: 100%;
        height: 18px;
        outline: none;
      }

      select {
        cursor: pointer;
      }

      input {
        padding: 0px 4px;
      }
    }
  }
`;
