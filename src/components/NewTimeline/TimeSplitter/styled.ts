import styled from "styled-components";

export const TimelineSplitterStyled = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  position: absolute;
  height: 40px;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: 28px;
  overflow: hidden;
`;

export const SplitterItemStyled = styled.div`
  height: 8px;
  width: 1px;
  background-color: var(--lies);
  position: absolute;

  .text {
    transform: translate(-50%, -18px);
    font-size: 12px;
    width: 30px;
    color: #fff;
    text-align: center;
  }
`;
